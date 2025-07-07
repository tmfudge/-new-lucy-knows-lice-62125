const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

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
    const { message, threadId } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    let currentThreadId = threadId;

    // Create a new thread if none exists
    if (!currentThreadId) {
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
    }

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: message,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: ASSISTANT_ID,
    });

    // Wait for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
    
    while (runStatus.status === 'in_progress' || runStatus.status === 'queued') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
    }

    if (runStatus.status === 'completed') {
      // Get the assistant's response
      const messages = await openai.beta.threads.messages.list(currentThreadId);
      const assistantMessage = messages.data.find(
        msg => msg.role === 'assistant' && msg.run_id === run.id
      );

      if (assistantMessage && assistantMessage.content[0]?.type === 'text') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            response: assistantMessage.content[0].text.value,
            threadId: currentThreadId,
          }),
        };
      }
    }

    // Handle failed runs
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Assistant run failed',
        status: runStatus.status 
      }),
    };

  } catch (error) {
    console.error('Chat function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
    };
  }
};