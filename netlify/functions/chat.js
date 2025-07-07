const OpenAI = require('openai');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Your custom assistant ID
const ASSISTANT_ID = 'asst_iZFLhw33e3RWkihX9Zw23uX0';

exports.handler = async (event, context) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { message, threadId } = JSON.parse(event.body || '{}');

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    console.log('Received message:', message);
    console.log('Thread ID:', threadId);
    console.log('OpenAI API Key available:', !!process.env.OPENAI_API_KEY);

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI API key not found, using fallback response');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          response: generateFallbackResponse(message),
          threadId: threadId || `fallback_${Date.now()}`,
          note: "Using fallback response - OpenAI API key not configured"
        }),
      };
    }

    // Initialize OpenAI client only when API key is available
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    let thread;
    
    // Create or retrieve thread
    if (threadId && threadId.startsWith('thread_')) {
      try {
        // Try to retrieve existing thread
        thread = await openai.beta.threads.retrieve(threadId);
        console.log('Retrieved existing thread:', threadId);
      } catch (error) {
        console.log('Thread not found, creating new one');
        thread = await openai.beta.threads.create();
      }
    } else {
      // Create new thread
      thread = await openai.beta.threads.create();
      console.log('Created new thread:', thread.id);
    }

    // Add message to thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID,
    });

    // Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    
    // Poll for completion (with timeout)
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds timeout
    
    while (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
      if (attempts >= maxAttempts) {
        throw new Error('Assistant response timeout');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      attempts++;
    }

    if (runStatus.status === 'completed') {
      // Get the assistant's response
      const messages = await openai.beta.threads.messages.list(thread.id);
      const assistantMessage = messages.data.find(msg => msg.role === 'assistant' && msg.run_id === run.id);
      
      if (assistantMessage && assistantMessage.content[0]?.type === 'text') {
        const response = assistantMessage.content[0].text.value;
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            response: response,
            threadId: thread.id,
          }),
        };
      } else {
        throw new Error('No valid response from assistant');
      }
    } else if (runStatus.status === 'failed') {
      console.error('Assistant run failed:', runStatus.last_error);
      throw new Error(`Assistant run failed: ${runStatus.last_error?.message || 'Unknown error'}`);
    } else {
      throw new Error(`Unexpected run status: ${runStatus.status}`);
    }

  } catch (error) {
    console.error('Chat function error:', error);
    
    // If OpenAI fails, fall back to static responses
    const { message } = JSON.parse(event.body || '{}');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: generateFallbackResponse(message || ''),
        threadId: `fallback_${Date.now()}`,
        note: "Using fallback response due to API issue",
        error: error.message
      }),
    };
  }
};

function generateFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  console.log('Generating fallback response for:', lowerMessage);
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm Lucy's AI assistant, here to help you with lice treatment questions. Whether you're dealing with your first case or need guidance on treatment effectiveness, I'm here to help. What's your main concern right now?";
  }
  
  // Treatment effectiveness questions
  if (lowerMessage.includes('working') || lowerMessage.includes('effective') || lowerMessage.includes('work')) {
    return "Great question about treatment effectiveness! The enzyme-based method typically shows results within 24-48 hours. Here's what to look for:\n\n✅ **Good signs:** Dead lice, loosened nits, less scratching\n❌ **Concerning:** Live, moving lice after 48 hours\n\nIf you're still seeing live lice after 48 hours, you may need to repeat the treatment. The key is systematic combing - make sure you're going through every section of hair methodically, especially behind the ears and nape of the neck.";
  }
  
  // Retreatment questions
  if (lowerMessage.includes('retreat') || lowerMessage.includes('again') || lowerMessage.includes('repeat') || lowerMessage.includes('second')) {
    return "If you find live lice during your Day 3 check, yes - repeat the full Day 1 protocol. This happens in about 15% of cases and usually means some lice were missed in hard-to-reach areas.\n\n🎯 **Focus extra attention on:**\n• Behind the ears\n• Nape of the neck\n• Crown of the head\n• Hairline areas\n\nThe good news is that a second treatment almost always completes the job!";
  }
  
  // Completion/success questions
  if (lowerMessage.includes('gone') || lowerMessage.includes('done') || lowerMessage.includes('finished') || lowerMessage.includes('clear')) {
    return "You'll know they're gone when you complete a full head inspection and find **no live, moving lice**. Here's your success checklist:\n\n✅ **Normal to see:** Dead lice, empty nit shells (can last weeks)\n❌ **Red flag:** Live, moving lice\n\n🗓️ **Critical recheck days:**\n• Day 3: Most important!\n• Day 7: Weekly check\n• Day 14: Two-week milestone\n\nIf you pass all three with no live lice, you're in the clear! Keep following the 21-day recheck calendar to catch any missed eggs.";
  }
  
  // Scratching concerns
  if (lowerMessage.includes('scratch') || lowerMessage.includes('itch') || lowerMessage.includes('itchy')) {
    return "Scratching is completely normal and can continue for 1-2 weeks after successful treatment! Here's why:\n\n🧠 **Psychological itching** - your brain is on high alert\n🔥 **Scalp irritation** - from the treatment process\n⚡ **Healing process** - skin recovering from bites\n\n**What to do:**\n• Keep nails trimmed short\n• Use cool compresses for comfort\n• Focus on finding live lice, not just scratching\n• If you see pus, fever, or severe irritation, consult your healthcare provider";
  }
  
  // Family screening questions
  if (lowerMessage.includes('family') || lowerMessage.includes('check') || lowerMessage.includes('others') || lowerMessage.includes('siblings')) {
    return "Absolutely check all family members within 24 hours! Here's your family screening plan:\n\n🔍 **What to look for:**\n• Live lice (moving bugs)\n• Nits close to the scalp\n• Focus on behind ears and nape of neck\n\n📋 **Screening protocol:**\n• Use good lighting (natural daylight is best)\n• Take your time - 10-15 minutes per person\n• Only treat those who actually have lice\n• Recheck clear family members weekly\n\n**Remember:** Don't treat 'just in case' - only treat confirmed cases!";
  }
  
  // Product/shopping questions
  if (lowerMessage.includes('buy') || lowerMessage.includes('product') || lowerMessage.includes('where') || lowerMessage.includes('need')) {
    return "Here's your essential shopping list for effective lice treatment:\n\n🛒 **Must-have items:**\n• **Enzyme-based treatment** (LiceLogic, Nix Ultra, or similar) - $15-20\n• **Metal lice comb** (NitFree or LiceMeister) - $10-15\n• **Bright LED flashlight** or desk lamp - $8-12\n• **Hair sectioning clips** - $3-5\n\n🏪 **Where to buy:**\n• Most pharmacies (CVS, Walgreens, Rite Aid)\n• Amazon for quick delivery\n• Target, Walmart\n\n⚠️ **Avoid:** Pyrethrin-based treatments (high resistance rates)\n\n**Total cost:** Around $25-35 for everything you need!";
  }
  
  // Cleaning questions
  if (lowerMessage.includes('clean') || lowerMessage.includes('wash') || lowerMessage.includes('house') || lowerMessage.includes('laundry')) {
    return "Smart cleaning strategy - focus your energy where it matters most!\n\n🔥 **High priority (do first):**\n• Wash bedding in hot water (130°F+)\n• Dry on high heat for 40+ minutes\n• Wash recently worn clothes\n• Bag items that can't be washed for 2 weeks\n\n🧹 **Medium priority (day 2-3):**\n• Vacuum upholstered furniture\n• Vacuum car seats and headrests\n• Quick vacuum of carpets\n\n❌ **Don't waste time on:**\n• Deep cleaning entire house\n• Washing everything you own\n• Special sprays or treatments\n\n**Remember:** Lice can only survive 24-48 hours off the human head!";
  }
  
  // Panic/emotional support
  if (lowerMessage.includes('panic') || lowerMessage.includes('stress') || lowerMessage.includes('help') || lowerMessage.includes('scared') || lowerMessage.includes('worried')) {
    return "Take a deep breath - you've got this! 🫂\n\n**Remember these facts:**\n• 1 in 4 kids get lice (you're not alone!)\n• Lice don't spread disease\n• This has NOTHING to do with cleanliness\n• You're not a bad parent\n• This is temporary and fixable\n\n**You're already doing the right things:**\n✅ Seeking good information\n✅ Taking action instead of ignoring it\n✅ Following a proven protocol\n\n**Focus on today:** What's the next single step you need to take? Break it down into small, manageable tasks. You're handling this exactly right!";
  }
  
  // School/return questions
  if (lowerMessage.includes('school') || lowerMessage.includes('return') || lowerMessage.includes('when') || lowerMessage.includes('back')) {
    return "Good news about returning to school! 🏫\n\n**Most schools follow the 'no live lice' policy:**\n• Can return after treatment starts\n• Don't need to be 'nit-free'\n• Dead nits are okay\n\n**Steps to take:**\n1. Check your school's specific policy\n2. Communicate with the school nurse\n3. Get clearance after first treatment\n4. Bring documentation if needed\n\n**Pro tip:** School nurses deal with this regularly and are usually very understanding. They want kids back in school as soon as it's safe!\n\n**After first treatment, your child is typically no longer contagious.**";
  }
  
  // Time/urgency questions
  if (lowerMessage.includes('how long') || lowerMessage.includes('time') || lowerMessage.includes('quick') || lowerMessage.includes('fast')) {
    return "Here's your realistic timeline for lice elimination:\n\n⏰ **Day 1:** Initial treatment (1-2 hours)\n⏰ **Day 2:** Quick check and spot treatment if needed (30 minutes)\n⏰ **Day 3:** Critical recheck (30 minutes)\n\n🎯 **Most families see success within 24-48 hours**\n\n**The 21-day follow-up period is crucial:**\n• Weekly checks to catch any missed eggs\n• Most reinfestations happen because people skip this\n• Better to be thorough than start over!\n\n**Remember:** Rushing leads to mistakes. Take your time with the systematic combing - it's the most important part!";
  }
  
  // Cost questions
  if (lowerMessage.includes('cost') || lowerMessage.includes('expensive') || lowerMessage.includes('money') || lowerMessage.includes('price')) {
    return "Let's talk about the real costs of lice treatment:\n\n💰 **DIY with this method:** $25-35 total\n• Enzyme treatment: $15-20\n• Metal comb: $10-15\n• One-time purchase!\n\n💸 **Professional clinic:** $350-600\n• Same methods you can learn\n• No follow-up support\n• Multiple visits often needed\n\n📊 **Failed drugstore attempts:** $100-200+\n• Multiple products that don't work\n• Repeated purchases\n• Wasted time and frustration\n\n**Bottom line:** Learning the right method saves you hundreds and gives you confidence for any future cases!";
  }
  
  // Default helpful response with more personality
  return "Hi there! I'm Lucy's AI assistant, and I'm here to help you navigate this lice situation with confidence! 🦟\n\nI can help you with:\n• **Treatment effectiveness** - Is it working?\n• **When to retreat** - Do I need to do it again?\n• **Family screening** - Who else needs checking?\n• **Cleaning protocols** - What actually needs cleaning?\n• **Timeline questions** - How long does this take?\n• **Product recommendations** - What should I buy?\n• **Emotional support** - Managing the stress!\n\nWhat's your biggest concern right now? I'm here to give you clear, practical guidance based on what actually works! 💪";
}