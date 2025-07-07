const { Configuration, OpenAIApi } = require('openai');

// Initialize OpenAI with the API key from environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

let openai;
try {
  openai = new OpenAIApi(configuration);
} catch (error) {
  console.error('Failed to initialize OpenAI:', error);
}

const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

  // Check if OpenAI is properly initialized
  if (!openai) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'OpenAI service not available' }),
    };
  }

  // Check for required environment variables
  if (!process.env.OPENAI_API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'OpenAI API key not configured' }),
    };
  }

  if (!ASSISTANT_ID) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Assistant ID not configured' }),
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
      const thread = await openai.createThread();
      currentThreadId = thread.data.id;
    }

    // Add the user's message to the thread
    await openai.createMessage(currentThreadId, {
      role: 'user',
      content: message,
    });

    // Run the assistant
    const run = await openai.createRun(currentThreadId, {
      assistant_id: ASSISTANT_ID,
    });

    // Wait for the run to complete
    let runStatus = await openai.retrieveRun(currentThreadId, run.data.id);
    
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds timeout
    
    while ((runStatus.data.status === 'in_progress' || runStatus.data.status === 'queued') && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.retrieveRun(currentThreadId, run.data.id);
      attempts++;
    }

    if (runStatus.data.status === 'completed') {
      // Get the assistant's response
      const messages = await openai.listMessages(currentThreadId);
      const assistantMessage = messages.data.data.find(
        msg => msg.role === 'assistant' && msg.run_id === run.data.id
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
        status: runStatus.data.status,
        details: runStatus.data.last_error || 'Unknown error'
      }),
    };

  } catch (error) {
    console.error('Chat function error:', error);
    
    // Provide more specific error information
    let errorMessage = 'Internal server error';
    if (error.response) {
      errorMessage = `OpenAI API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown API error'}`;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: errorMessage,
        details: error.message 
      }),
    };
  }
};