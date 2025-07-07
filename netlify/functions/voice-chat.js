const OpenAI = require('openai');
const formidable = require('formidable');
const fs = require('fs');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
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
    // Parse the multipart form data
    const form = formidable({
      maxFileSize: 25 * 1024 * 1024, // 25MB limit
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(event.body);
    
    if (!files.audio || !files.audio[0]) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Audio file is required' }),
      };
    }

    const audioFile = files.audio[0];
    
    // Read the audio file
    const audioBuffer = fs.readFileSync(audioFile.filepath);
    
    // Create a File-like object for OpenAI
    const audioFileForOpenAI = new File([audioBuffer], audioFile.originalFilename || 'audio.webm', {
      type: audioFile.mimetype || 'audio/webm',
    });

    // Transcribe the audio using Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFileForOpenAI,
      model: 'whisper-1',
      language: 'en', // Specify English for better accuracy
    });

    // Clean up the temporary file
    fs.unlinkSync(audioFile.filepath);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        transcription: transcription.text,
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