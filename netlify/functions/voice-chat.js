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
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          transcription: "Voice transcription requires OpenAI API setup. For now, please use text chat for the best experience with Lucy's AI assistant.",
        }),
      };
    }

    // Get the audio file from the form data
    const contentType = event.headers['content-type'] || '';
    
    if (!contentType.includes('multipart/form-data')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Audio file required' }),
      };
    }

    // For now, return a helpful message since processing multipart form data
    // in Netlify functions requires additional setup
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        transcription: "Voice chat is being set up with OpenAI Whisper. For now, please use text chat for the best experience with Lucy's AI assistant. I can help with all your lice treatment questions!",
      }),
    };

  } catch (error) {
    console.error('Voice chat function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to process voice message',
        details: error.message 
      }),
    };
  }
};