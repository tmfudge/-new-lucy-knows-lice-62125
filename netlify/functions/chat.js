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

  try {
    const { message } = JSON.parse(event.body || '{}');

    // For now, return a helpful response while we get the OpenAI integration working
    const responses = [
      "I'm Lucy's AI assistant! I'm here to help with lice treatment questions. The AI system is currently being set up with OpenAI. For now, I can tell you that the most important thing is to stay calm - lice are annoying but not dangerous.",
      "Great question! While I'm getting my full AI capabilities set up, I can share that the key to successful lice treatment is using the right method consistently. The survival kit has all the step-by-step instructions you need.",
      "I understand you're looking for help with lice treatment. The AI chat is being configured, but don't worry - the survival kit contains everything you need to handle this situation effectively.",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: randomResponse,
        threadId: 'temp-thread-' + Date.now(),
      }),
    };

  } catch (error) {
    console.error('Chat function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Chat system temporarily unavailable. Please try the other portal features!',
        details: 'The AI assistant is being set up.'
      }),
    };
  }
};