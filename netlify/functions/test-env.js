exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Get all environment variables
  const allEnvVars = Object.keys(process.env).sort();
  
  // Filter for OpenAI related vars
  const openaiVars = allEnvVars.filter(key => 
    key.toLowerCase().includes('openai') || 
    key.toLowerCase().includes('assistant')
  );

  // Check specific keys we expect
  const expectedKeys = [
    'OPENAI_API_KEY',
    'OPENAI_ASSISTANT_ID'
  ];

  const keyStatus = expectedKeys.map(key => ({
    key,
    exists: !!process.env[key],
    hasValue: !!(process.env[key] && process.env[key].trim()),
    length: process.env[key] ? process.env[key].length : 0,
    preview: process.env[key] ? process.env[key].substring(0, 10) + '...' : 'MISSING'
  }));

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: 'Environment Variable Test',
      netlifyContext: {
        context: process.env.CONTEXT,
        netlify: process.env.NETLIFY,
        url: process.env.URL,
        deployUrl: process.env.DEPLOY_PRIME_URL
      },
      expectedKeys: keyStatus,
      openaiRelatedVars: openaiVars,
      totalEnvVars: allEnvVars.length,
      sampleEnvVars: allEnvVars.slice(0, 10) // First 10 for debugging
    }, null, 2)
  };
};