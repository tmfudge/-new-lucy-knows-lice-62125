# Setting Up OpenAI Integration

## Step 1: Get Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-`)

## Step 2: Create an OpenAI Assistant

1. Go to https://platform.openai.com/assistants
2. Click "Create Assistant"
3. Configure it with:
   - **Name**: Lucy's Lice Assistant
   - **Instructions**: You are Lucy's AI assistant, specially trained to help parents with head lice treatment questions. You provide calm, evidence-based guidance on lice identification, treatment methods, and family management. Always reassure parents that lice are common and treatable.
   - **Model**: gpt-4-turbo-preview
4. Copy the Assistant ID (starts with `asst_`)

## Step 3: Add Environment Variables to Netlify

### Option A: Via Netlify Dashboard
1. Go to your Netlify site dashboard
2. Go to Site settings > Environment variables
3. Add these variables:
   - `OPENAI_API_KEY` = your OpenAI API key
   - `OPENAI_ASSISTANT_ID` = your Assistant ID

### Option B: Via Netlify CLI
```bash
# Install CLI if needed
npm install -g netlify-cli

# Login and link your site
netlify login
netlify link

# Set the variables
netlify env:set OPENAI_API_KEY "sk-your-actual-key-here"
netlify env:set OPENAI_ASSISTANT_ID "asst_your-actual-id-here"

# Verify
netlify env:list

# Deploy
netlify deploy --prod
```

## Step 4: Test the Integration

Visit: https://your-site.netlify.app/env-test.html

This will test if the environment variables are properly configured.

## Troubleshooting

If the environment variables aren't working:

1. Make sure you're setting them in the correct Netlify site
2. Try redeploying after setting the variables
3. Check that the variable names are exactly: `OPENAI_API_KEY` and `OPENAI_ASSISTANT_ID`
4. Make sure there are no extra spaces in the values

The chat function will work with helpful fallback responses even without OpenAI configured, so users can still get value from the portal.