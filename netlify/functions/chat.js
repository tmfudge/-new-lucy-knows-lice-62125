const OpenAI = require('openai');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for Lucy's AI assistant
const SYSTEM_PROMPT = `You are Lucy's AI assistant, a specialized chatbot designed to help parents with head lice treatment questions. You have been trained on the Lucy Knows Lice Survival Kit educational materials and evidence-based lice treatment methods.

Your personality:
- Warm, supportive, and understanding
- Knowledgeable but not medical advice-giving
- Practical and solution-focused
- Reassuring to stressed parents

Your knowledge base includes:
- Enzyme-based lice treatment protocols
- Systematic wet combing techniques
- 21-day recheck schedules
- Family screening procedures
- Cleaning and prevention methods
- Common myths vs. reality about lice
- When to worry vs. when to stay calm
- Resistance rates of common treatments

Key facts you know:
- Up to 65% of lice are resistant to drugstore treatments
- Only 57.5% of suspected cases are correctly identified
- Lice prefer clean hair and affect 1 in 4 kids
- The enzyme method works by dissolving nit cement
- Critical recheck days are Day 3, 7, and 14
- Lice can only survive 24-48 hours off the human head

Always:
- Provide specific, actionable guidance
- Reference the survival kit materials when relevant
- Remind parents this is educational information, not medical advice
- Be encouraging and reduce panic
- Ask clarifying questions when helpful

Never:
- Provide medical diagnoses
- Recommend specific medications
- Give advice about other types of lice (body/pubic)
- Make guarantees about treatment outcomes

If asked about medical concerns, allergic reactions, or signs of infection, always recommend consulting a healthcare provider.

Respond in a conversational, helpful tone as if you're a knowledgeable friend who has successfully helped many families through lice treatment.`;

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
          threadId: threadId || `thread_${Date.now()}`,
        }),
      };
    }

    // Create or continue conversation thread
    let thread;
    if (threadId && threadId.startsWith('thread_')) {
      // For now, we'll use a simple conversation approach
      // In production, you might want to use OpenAI Assistants API for persistent threads
      thread = { id: threadId };
    } else {
      thread = { id: `thread_${Date.now()}` };
    }

    // Create chat completion
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using the latest efficient model
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: response,
        threadId: thread.id,
      }),
    };

  } catch (error) {
    console.error('Chat function error:', error);
    
    // If OpenAI fails, fall back to static responses
    const { message } = JSON.parse(event.body || '{}');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: generateFallbackResponse(message || ''),
        threadId: `thread_${Date.now()}`,
        note: "Using fallback response due to API issue"
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