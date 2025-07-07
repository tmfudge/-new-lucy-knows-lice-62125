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
  
  // Treatment effectiveness questions
  if (lowerMessage.includes('working') || lowerMessage.includes('effective')) {
    return "Great question! The enzyme-based treatment method typically shows results within 24-48 hours. You should see dead lice and loosened nits after the first treatment. If you're still seeing live, moving lice after 48 hours, you may need to repeat the treatment. The key is systematic combing - make sure you're going through every section of hair methodically.";
  }
  
  // Retreatment questions
  if (lowerMessage.includes('retreat') || lowerMessage.includes('again') || lowerMessage.includes('repeat')) {
    return "If you find live lice during your Day 3 check, yes - repeat the full Day 1 protocol. This happens in about 15% of cases and usually means some lice were missed in hard-to-reach areas. Focus extra attention on behind the ears and the nape of the neck. The good news is that a second treatment almost always completes the job.";
  }
  
  // Completion/success questions
  if (lowerMessage.includes('gone') || lowerMessage.includes('done') || lowerMessage.includes('finished')) {
    return "You'll know they're gone when you complete a full head inspection and find no live, moving lice. Dead lice and empty nit shells are normal to see for weeks after successful treatment. The critical recheck days are Day 3, Day 7, and Day 14. If you pass all three with no live lice, you're in the clear! Remember to follow the 21-day recheck calendar to catch any missed eggs.";
  }
  
  // Scratching concerns
  if (lowerMessage.includes('scratch') || lowerMessage.includes('itch')) {
    return "Scratching is completely normal and can continue for 1-2 weeks after successful treatment. It's often psychological or due to scalp irritation from the treatment process. The key is to look for live, moving lice - not just scratching. Keep your child's nails trimmed and consider a cool compress for comfort. If scratching is severe or you see signs of infection (pus, fever), consult your healthcare provider.";
  }
  
  // Family screening questions
  if (lowerMessage.includes('family') || lowerMessage.includes('check') || lowerMessage.includes('others')) {
    return "Absolutely check all family members! Screen everyone within 24 hours of finding the first case. Look for live lice and nits close to the scalp, especially behind ears and at the nape of the neck. Only treat those who actually have lice - don't treat 'just in case.' Use good lighting and take your time. Family members who are clear should be rechecked weekly until the infected person completes their 21-day protocol.";
  }
  
  // Product/shopping questions
  if (lowerMessage.includes('buy') || lowerMessage.includes('product') || lowerMessage.includes('where')) {
    return "You'll need an enzyme-based lice treatment (like LiceLogic or similar brands) and a quality metal lice comb (NitFree or LiceMeister work well). Most pharmacies carry these, or you can order online. Avoid pyrethrin-based treatments as resistance rates are very high. The total cost should be around $25-35 for supplies. Don't forget good lighting - a bright LED flashlight or desk lamp makes a huge difference!";
  }
  
  // Cleaning questions
  if (lowerMessage.includes('clean') || lowerMessage.includes('wash') || lowerMessage.includes('house')) {
    return "Focus your cleaning efforts! Wash bedding and recently worn clothes in hot water (130°F+) and dry on high heat for 40+ minutes. Bag items that can't be washed for 2 weeks. Vacuum upholstered furniture and car seats. That's it! Don't waste time over-cleaning - lice can only survive 24-48 hours off the human head. Your energy is better spent on thorough treatment and follow-up checks.";
  }
  
  // Panic/emotional support
  if (lowerMessage.includes('panic') || lowerMessage.includes('stress') || lowerMessage.includes('help')) {
    return "Take a deep breath - you've got this! Lice are incredibly common (1 in 4 kids get them) and they don't spread disease. This is a nuisance, not a health crisis. You're already taking the right steps by seeking good information. Follow the protocol step by step, and you'll be through this in a few days. Remember: this has nothing to do with cleanliness or your parenting. You're handling this exactly right.";
  }
  
  // School/return questions
  if (lowerMessage.includes('school') || lowerMessage.includes('return') || lowerMessage.includes('when')) {
    return "Most schools allow return after treatment has started, even if nits are still present. Check your school's specific policy, but many follow the 'no live lice' rule rather than 'nit-free.' After your first treatment, your child is typically no longer contagious. Communicate with the school nurse - they deal with this regularly and can guide you on their specific requirements.";
  }
  
  // Default helpful response
  return "I'm Lucy's AI assistant, specially trained to help with lice treatment questions! I can provide guidance on treatment effectiveness, when to retreat, family screening, cleaning protocols, and managing the stress of dealing with lice. What specific aspect of lice treatment would you like to know more about? Remember, if you have medical concerns or see signs of infection, always consult with your healthcare provider.";
}