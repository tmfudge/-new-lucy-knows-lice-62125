const { OpenAI } = require('openai');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Your custom assistant ID
const ASSISTANT_ID = 'asst_iZFLhw33e3RWkihX9Zw23uX0';

exports.handler = async (event, context) => {
  console.log('=== CHAT FUNCTION CALLED ===');
  console.log('Method:', event.httpMethod);
  console.log('Environment check:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- NETLIFY_DEV:', process.env.NETLIFY_DEV);
  console.log('- Available env vars:', Object.keys(process.env).filter(key => key.includes('OPENAI')));
  console.log('- Has OpenAI Key:', !!process.env.OPENAI_API_KEY);
  console.log('- Key length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);
  console.log('- Key starts with:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 7) : 'N/A');

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

  // Check if OpenAI API key is available
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    console.error('OPENAI_API_KEY not found or empty');
    console.error('All environment variables:', Object.keys(process.env));
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'OpenAI API key not configured. Please check environment variables.',
        debug: {
          hasKey: !!apiKey,
          keyLength: apiKey ? apiKey.length : 0,
          envVars: Object.keys(process.env).filter(key => key.includes('OPENAI')),
          context: process.env.CONTEXT || 'unknown'
        }
      }),
    };
  }

  try {
    const { message, threadId } = JSON.parse(event.body || '{}');
    console.log('Parsed request:', { 
      message: message?.substring(0, 50), 
      threadId, 
      threadIdType: typeof threadId 
    });

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    console.log('Initializing OpenAI client...');
    
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey.trim(),
    });

    // Fix thread ID handling
    let currentThreadId = threadId;
    if (!currentThreadId || currentThreadId === 'undefined' || currentThreadId === 'null' || currentThreadId === '') {
      currentThreadId = null;
    }

    console.log('Processed threadId:', currentThreadId);

    // Create a new thread if we don't have one
    if (!currentThreadId) {
      console.log('Creating new thread...');
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
      console.log('Created thread:', currentThreadId);
    } else {
      console.log('Using existing thread:', currentThreadId);
    }

    // Add the user's message to the thread
    console.log('Adding message to thread:', currentThreadId);
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: message,
    });

    // Run the assistant
    console.log('Running assistant:', ASSISTANT_ID);
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: ASSISTANT_ID,
    });

    // Wait for the run to complete
    console.log('Waiting for completion...');
    let runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
    
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds max wait
    
    while ((runStatus.status === 'queued' || runStatus.status === 'in_progress') && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
      console.log('Run status:', runStatus.status, 'Attempt:', attempts + 1);
      attempts++;
    }

    console.log('Final run status:', runStatus.status);

    if (runStatus.status === 'completed') {
      // Get the assistant's response
      console.log('Getting messages...');
      const messages = await openai.beta.threads.messages.list(currentThreadId);
      const assistantMessage = messages.data.find(msg => msg.role === 'assistant');
      
      if (assistantMessage && assistantMessage.content[0] && assistantMessage.content[0].type === 'text') {
        const response = assistantMessage.content[0].text.value;
        console.log('Assistant response received, length:', response.length);
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            response: response,
            threadId: currentThreadId,
          }),
        };
      } else {
        console.error('No valid response from assistant');
        throw new Error('No valid response from assistant');
      }
    } else if (runStatus.status === 'failed') {
      console.error('Run failed:', runStatus.last_error);
      throw new Error(`Assistant run failed: ${runStatus.last_error?.message || 'Unknown error'}`);
    } else if (runStatus.status === 'expired') {
      console.error('Run expired');
      throw new Error('Assistant run expired - took too long to complete');
    } else {
      console.error('Unexpected run status:', runStatus.status);
      throw new Error(`Assistant run ended with status: ${runStatus.status}`);
    }

  } catch (error) {
    console.error('=== CHAT FUNCTION ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Check if it's an API key issue
    if (error.message.includes('401') || error.message.includes('authentication')) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'OpenAI API authentication failed. Please check your API key.',
          details: error.message,
          debug: 'API key may be invalid or expired'
        }),
      };
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to get response from OpenAI assistant',
        details: error.message,
        assistant_id: ASSISTANT_ID,
        debug: 'Check Netlify function logs for details'
      }),
    };
  }
};