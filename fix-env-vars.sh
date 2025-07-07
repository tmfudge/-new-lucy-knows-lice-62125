#!/bin/bash

echo "Setting up environment variables via Netlify CLI..."

# Make sure you're logged in
netlify login

# Link to your site (if not already linked)
netlify link --name lucyknowslice

# Set the environment variables
echo "Setting OPENAI_API_KEY..."
netlify env:set OPENAI_API_KEY "YOUR_ACTUAL_OPENAI_API_KEY_HERE"

echo "Setting OPENAI_ASSISTANT_ID..."
netlify env:set OPENAI_ASSISTANT_ID "YOUR_ACTUAL_ASSISTANT_ID_HERE"

# List all environment variables to verify
echo "Verifying environment variables..."
netlify env:list

# Trigger a new deployment
echo "Triggering new deployment..."
netlify deploy --prod

echo "Done! Check your site in a few minutes."