const { Configuration, OpenAIApi } = require('openai');
const formidable = require('formidable');
const fs = require('fs');

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

  try {
    // For now, return a simple response since voice processing is complex in serverless
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        transcription: "Voice chat is currently being set up. Please use text chat for now.",
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