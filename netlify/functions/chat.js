const { OpenAI } = require('openai');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event, context) => {
  console.log('=== CHAT FUNCTION CALLED ===');
  console.log('Method:', event.httpMethod);
  
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

  // More robust environment variable checking
  const apiKey = process.env.OPENAI_API_KEY || process.env.REACT_APP_OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
  const assistantId = process.env.OPENAI_ASSISTANT_ID || process.env.REACT_APP_OPENAI_ASSISTANT_ID || process.env.VITE_OPENAI_ASSISTANT_ID;
  
  console.log('Environment check:');
  console.log('- API Key exists:', !!apiKey);
  console.log('- API Key length:', apiKey ? apiKey.length : 0);
  console.log('- Assistant ID exists:', !!assistantId);
  console.log('- Assistant ID length:', assistantId ? assistantId.length : 0);
  
  if (!apiKey || apiKey.trim() === '') {
    console.error('OPENAI_API_KEY not found');
    
    // Debug: show what env vars we do have
    const envKeys = Object.keys(process.env).filter(key => 
      key.includes('OPENAI') || key.includes('API') || key.includes('KEY')
    );
    console.error('Available env keys:', envKeys);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'OpenAI API key not configured. Please check environment variables.',
        debug: {
          hasKey: !!apiKey,
          keyLength: apiKey ? apiKey.length : 0,
          availableKeys: envKeys,
          context: process.env.CONTEXT || 'unknown'
        }
      }),
    };
  }

  if (!assistantId || assistantId.trim() === '') {
    console.error('OPENAI_ASSISTANT_ID not found');
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'OpenAI Assistant ID not configured. Please set OPENAI_ASSISTANT_ID environment variable.',
        debug: {
          hasAssistantId: !!assistantId,
          context: process.env.CONTEXT || 'unknown'
        }
       }),
    };
  }

  try {
    const { message, threadId } = JSON.parse(event.body || '{}');
    console.log('Parsed request:', { 
      message: message?.substring(0, 50), 
      threadId: threadId || 'null',
      hasMessage: !!message
    });

    if (!message || message.trim() === '') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // Validate thread ID if provided
    const isValidThreadId = threadId && 
                           typeof threadId === 'string' && 
                           threadId !== 'undefined' && 
                           threadId !== 'null' && 
                           threadId.trim() !== '' &&
                           threadId.startsWith('thread_');

    console.log('Thread ID validation:', { threadId, isValid: isValidThreadId });

    // Initialize OpenAI client
    console.log('Initializing OpenAI client...');
    const openai = new OpenAI({
      apiKey: apiKey.trim(),
    });

    let currentThreadId = isValidThreadId ? threadId : null;

    // Create a new thread if we don't have a valid one
    if (!currentThreadId) {
      console.log('Creating new thread...');
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
      console.log('Created thread:', currentThreadId);
    } else {
      console.log('Using existing thread:', currentThreadId);
    }

    // Add the user's message to the thread
    console.log('Adding message to thread...');
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: message.trim(),
    });

    // Run the assistant
    console.log('Running assistant:', assistantId.substring(0, 10) + '...');
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: assistantId.trim(),
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
    if (error.message.includes('401') || error.message.includes('authentication') || error.message.includes('Incorrect API key')) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'OpenAI API authentication failed. Please check your API key.',
          details: error.message,
        }),
      };
    }
    
    // Check if it's an assistant ID issue
    if (error.message.includes('assistant') && error.message.includes('not found')) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'OpenAI Assistant not found. Please check your Assistant ID.',
          details: error.message,
        }),
      };
    }
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to get response from OpenAI assistant',
        details: error.message,
      }),
    };
  }
};