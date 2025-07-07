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
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'OpenAI API key not configured' }),
      };
    }

    console.log('Using OpenAI with assistant:', ASSISTANT_ID);
    console.log('Message:', message);
    console.log('Thread ID:', threadId);

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    let currentThreadId = threadId;

    // Create a new thread if we don't have one
    if (!currentThreadId) {
      console.log('Creating new thread...');
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
      console.log('Created thread:', currentThreadId);
    }

    // Add the user's message to the thread
    console.log('Adding message to thread...');
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: message,
    });

    // Run the assistant
    console.log('Running assistant...');
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: ASSISTANT_ID,
    });

    // Wait for the run to complete
    console.log('Waiting for completion...');
    let runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
    
    while (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
      console.log('Run status:', runStatus.status);
    }

    if (runStatus.status === 'completed') {
      // Get the assistant's response
      console.log('Getting messages...');
      const messages = await openai.beta.threads.messages.list(currentThreadId);
      const assistantMessage = messages.data.find(msg => msg.role === 'assistant');
      
      if (assistantMessage && assistantMessage.content[0] && assistantMessage.content[0].type === 'text') {
        const response = assistantMessage.content[0].text.value;
        console.log('Assistant response:', response);
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            response: response,
            threadId: currentThreadId,
          }),
        };
      } else {
        throw new Error('No valid response from assistant');
      }
    } else {
      console.error('Run failed with status:', runStatus.status);
      throw new Error(`Assistant run failed with status: ${runStatus.status}`);
    }

  } catch (error) {
    console.error('Chat function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to get response from assistant',
        details: error.message
      }),
    };
  }
};