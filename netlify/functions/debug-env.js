exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Get environment info
  const envInfo = {
    // Netlify context
    netlifyContext: process.env.CONTEXT || 'unknown',
    netlifyDev: process.env.NETLIFY_DEV || 'false',
    url: process.env.URL || 'unknown',
    deployUrl: process.env.DEPLOY_PRIME_URL || 'unknown',
    
    // Check for our specific variables
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    hasAssistantId: !!process.env.OPENAI_ASSISTANT_ID,
    
    // If they exist, show partial values for verification
    openAIKeyPreview: process.env.OPENAI_API_KEY ? 
      `${process.env.OPENAI_API_KEY.substring(0, 7)}...` : 'MISSING',
    assistantIdPreview: process.env.OPENAI_ASSISTANT_ID ? 
      `${process.env.OPENAI_ASSISTANT_ID.substring(0, 7)}...` : 'MISSING',
    
    // Count total env vars
    totalEnvVars: Object.keys(process.env).length,
    
    // Show some sample env vars (non-sensitive)
    sampleEnvVars: Object.keys(process.env)
      .filter(key => !key.includes('SECRET') && !key.includes('KEY') && !key.includes('TOKEN'))
      .slice(0, 10),
    
    // Check for any OpenAI-related vars
    openAIRelatedVars: Object.keys(process.env)
      .filter(key => key.toLowerCase().includes('openai') || key.toLowerCase().includes('assistant'))
  };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(envInfo, null, 2)
  };
};