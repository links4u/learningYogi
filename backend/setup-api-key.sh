#!/bin/bash

# Quick setup script for OpenAI API key
# Run this script to configure your API key

echo "🔑 OpenAI API Key Setup"
echo "======================="
echo ""
echo "Please enter your OpenAI API key:"
read -r api_key

if [ -z "$api_key" ]; then
    echo "❌ No API key provided. Exiting."
    exit 1
fi

# Update .env file
if [ -f .env ]; then
    # Replace existing key
    sed -i.bak "s/OPENAI_API_KEY=.*/OPENAI_API_KEY=$api_key/" .env
    echo "✅ Updated .env file with your API key"
else
    # Create .env from example
    cp .env.example .env
    sed -i.bak "s/OPENAI_API_KEY=.*/OPENAI_API_KEY=$api_key/" .env
    echo "✅ Created .env file with your API key"
fi

echo ""
echo "🎉 Setup complete!"
echo "You can now restart the backend server to use the new API key."
echo ""
echo "To restart: Press Ctrl+C in the backend terminal, then run 'npm run dev' again"
