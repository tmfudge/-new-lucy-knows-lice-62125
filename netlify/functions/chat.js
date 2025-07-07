const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

  // Check for required environment variables
  if (!process.env.OPENAI_API_KEY) {
    console.error('Missing OPENAI_API_KEY environment variable');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'OpenAI API key not configured' }),
    };
  }

  if (!ASSISTANT_ID) {
    console.error('Missing OPENAI_ASSISTANT_ID environment variable');
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
      console.log('Creating new thread...');
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
      console.log('Created thread:', currentThreadId);
    }

    // Add the user's message to the thread
    console.log('Adding message to thread:', currentThreadId);
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: message,
    });

    // Run the assistant
    console.log('Starting assistant run...');
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: ASSISTANT_ID,
    });

    // Wait for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
    
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds timeout
    
    console.log('Waiting for run to complete...');
    while ((runStatus.status === 'in_progress' || runStatus.status === 'queued') && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
      attempts++;
      console.log(`Run status: ${runStatus.status}, attempt: ${attempts}`);
    }

    if (runStatus.status === 'completed') {
      console.log('Run completed, fetching messages...');
      // Get the assistant's response
      const messages = await openai.beta.threads.messages.list(currentThreadId);
      const assistantMessage = messages.data.find(
        msg => msg.role === 'assistant' && msg.run_id === run.id
      );

      if (assistantMessage && assistantMessage.content[0]?.type === 'text') {
        console.log('Returning assistant response');
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            response: assistantMessage.content[0].text.value,
            threadId: currentThreadId,
          }),
        };
      } else {
        console.error('No valid assistant message found');
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'No valid response from assistant' }),
        };
      }
    }

    // Handle failed runs
    console.error('Run failed with status:', runStatus.status);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Assistant run failed',
        status: runStatus.status,
        details: runStatus.last_error || 'Unknown error'
      }),
    };

  } catch (error) {
    console.error('Chat function error:', error);
    
    // Provide more specific error information
    let errorMessage = 'Internal server error';
    let errorDetails = error.message;
    
    if (error.status) {
      errorMessage = `OpenAI API error: ${error.status}`;
      errorDetails = error.message || 'Unknown API error';
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: errorMessage,
        details: errorDetails
      }),
    };
  }
};