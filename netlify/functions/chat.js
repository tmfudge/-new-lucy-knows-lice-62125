const OpenAI = require('openai');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

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

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI API key not found. Available env vars:', Object.keys(process.env).filter(k => k.includes('OPENAI')));
      
      // Return helpful fallback response
      const fallbackResponses = [
        "I'm Lucy's AI assistant! While I'm getting my full capabilities set up, I can tell you that the most important thing when dealing with lice is to stay calm. Lice are annoying but not dangerous, and they can be eliminated with the right approach.",
        
        "Great question! The key to successful lice treatment is using enzyme-based treatments that dissolve the cement holding nits to hair shafts, combined with systematic wet combing. This is much more effective than traditional pesticide treatments.",
        
        "I understand you're looking for help with lice treatment. Remember: lice prefer clean hair (it has nothing to do with hygiene), they affect 1 in 4 kids, and with the right method, most families are lice-free within 24-48 hours.",
        
        "The survival kit contains everything you need! The most important steps are: 1) Stay calm, 2) Use the enzyme treatment exactly as directed, 3) Follow the systematic combing protocol, and 4) stick to the 21-day recheck calendar.",
        
        "If you're seeing live lice after treatment, don't panic! This often means the treatment wasn't applied correctly or you missed some areas. The key is thorough application and systematic combing in small sections."
      ];

      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          response: randomResponse + "\n\n(Note: Full AI capabilities are being configured. The survival kit has all the detailed information you need!)",
          threadId: 'fallback-thread-' + Date.now(),
        }),
      };
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    let thread;
    
    // Create or use existing thread
    if (threadId && threadId.startsWith('thread_')) {
      thread = { id: threadId };
    } else {
      thread = await openai.beta.threads.create();
    }

    // Add message to thread
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID,
    });

    // Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    
    while (runStatus.status === 'in_progress' || runStatus.status === 'queued') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    if (runStatus.status === 'completed') {
      // Get the assistant's response
      const messages = await openai.beta.threads.messages.list(thread.id);
      const assistantMessage = messages.data.find(msg => msg.role === 'assistant');
      
      if (assistantMessage && assistantMessage.content[0]?.type === 'text') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            response: assistantMessage.content[0].text.value,
            threadId: thread.id,
          }),
        };
      }
    }

    // If we get here, something went wrong with the assistant
    throw new Error(`Assistant run failed with status: ${runStatus.status}`);

  } catch (error) {
    console.error('Chat function error:', error);
    
    // Return helpful error response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: "I'm having a technical issue right now, but don't worry! The survival kit has all the step-by-step instructions you need. Check the Treatment Protocol section for the complete method, or use the Emergency Guide if you need immediate help.",
        threadId: 'error-thread-' + Date.now(),
      }),
    };
  }
};