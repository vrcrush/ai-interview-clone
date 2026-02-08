#!/bin/bash

# AI Interview Clone - Quick Setup Script
# This script helps you set up the project quickly

echo "=================================="
echo "AI Interview Clone - Quick Setup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js installed: $NODE_VERSION${NC}"

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}❌ Please run this script from the ai-interview-clone root directory${NC}"
    exit 1
fi

echo ""
echo "=================================="
echo "Step 1: Backend Setup"
echo "=================================="
echo ""

cd backend

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo ""
    echo -e "${YELLOW}⚠️  .env file not found. Creating from template...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  IMPORTANT: Please edit backend/.env and add your Anthropic API key${NC}"
    echo ""
    echo "Get your API key from: https://console.anthropic.com/settings/keys"
    echo ""
    read -p "Press Enter after you've added your API key to backend/.env..."
fi

# Validate knowledge base
echo ""
echo "Validating knowledge base..."
if command -v python3 &> /dev/null; then
    python3 << 'EOF'
import json
try:
    with open('knowledge-base.json', 'r') as f:
        json.load(f)
    print('\033[92m✅ Knowledge base JSON is valid\033[0m')
except json.JSONDecodeError as e:
    print(f'\033[91m❌ Knowledge base JSON is invalid: {e}\033[0m')
    exit(1)
EOF
else
    echo -e "${YELLOW}⚠️  Python not found, skipping JSON validation${NC}"
fi

echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: Please edit backend/knowledge-base.json with your information${NC}"
echo ""
read -p "Press Enter after you've filled out your knowledge base..."

cd ..

echo ""
echo "=================================="
echo "Step 2: Testing"
echo "=================================="
echo ""

# Start backend in background
echo "Starting backend server..."
cd backend
npm start > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 5

# Test backend health
echo "Testing backend..."
HEALTH_CHECK=$(curl -s http://localhost:3001/health)
if [[ $HEALTH_CHECK == *"healthy"* ]]; then
    echo -e "${GREEN}✅ Backend is running successfully${NC}"
else
    echo -e "${RED}❌ Backend health check failed${NC}"
    echo "Check backend.log for errors"
    kill $BACKEND_PID
    exit 1
fi

echo ""
echo "=================================="
echo "Setup Complete!"
echo "=================================="
echo ""
echo -e "${GREEN}✅ Backend is running on http://localhost:3001${NC}"
echo ""
echo "Next steps:"
echo "1. Open a new terminal window"
echo "2. Navigate to the frontend folder: cd frontend"
echo "3. Start a local server:"
echo "   - Python 3: python3 -m http.server 8000"
echo "   - Node.js: npx http-server -p 8000"
echo "4. Open http://localhost:8000 in your browser"
echo ""
echo "To stop the backend: kill $BACKEND_PID"
echo ""
echo "For deployment instructions, see: docs/setup-guide.md"
echo ""
