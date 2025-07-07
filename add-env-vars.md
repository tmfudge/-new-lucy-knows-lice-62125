# Adding Environment Variables via Netlify CLI

If the dashboard method isn't working, you can add environment variables using the Netlify CLI:

## Install Netlify CLI (if not already installed)
```bash
npm install -g netlify-cli
```

## Login to Netlify
```bash
netlify login
```

## Navigate to your project and link it
```bash
netlify link
```

## Add the environment variables
```bash
netlify env:set OPENAI_API_KEY "your-actual-openai-api-key-here"
netlify env:set OPENAI_ASSISTANT_ID "your-actual-assistant-id-here"
```

## Verify they were added
```bash
netlify env:list
```

## Trigger a new deployment
```bash
netlify deploy --prod
```

## Alternative: Check if variables are in the right context
You can also check what context your site is deploying to:
```bash
netlify status
```

Make sure the environment variables are set for the correct context (production, deploy-preview, etc.)