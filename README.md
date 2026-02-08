# AI Interview Clone - Complete Setup Guide

## Project Overview
This project creates an AI-powered interview bot that recruiters can interact with on your website. The AI will answer questions about your background, skills, and experience as if they're talking directly to you.

## Technology Stack
- **Frontend**: HTML, CSS, JavaScript (vanilla - no frameworks needed)
- **Backend**: Node.js with Express
- **AI Engine**: Anthropic Claude API
- **Hosting**: Vercel (frontend) + Render (backend)

## Project Structure
```
ai-interview-clone/
├── frontend/
│   ├── index.html          # Main chat interface
│   ├── styles.css          # Styling
│   └── chat.js             # Chat functionality
├── backend/
│   ├── server.js           # Express server
│   ├── claude-handler.js   # AI logic
│   ├── knowledge-base.json # Your information
│   ├── package.json        # Dependencies
│   └── .env.example        # Environment variables template
└── docs/
    └── setup-guide.md      # Detailed setup instructions
```

## Prerequisites
Before starting, you need:
1. Node.js installed (v16 or higher) - Download from https://nodejs.org/
2. A code editor (VS Code recommended)
3. Git installed (optional but recommended)
4. Anthropic API key (we'll get this in Step 3)

## Quick Start (Summary)
1. Clone/download this project
2. Fill out your information in `backend/knowledge-base.json`
3. Get an Anthropic API key
4. Install dependencies and run locally
5. Deploy to Vercel + Render

---

## DETAILED STEP-BY-STEP INSTRUCTIONS

### STEP 1: Download and Setup Project (5 minutes)

**1.1** Download this entire folder to your computer

**1.2** Open Terminal (Mac/Linux) or Command Prompt (Windows)

**1.3** Navigate to the project folder:
```bash
cd path/to/ai-interview-clone
```

**1.4** Verify the folder structure:
```bash
# Mac/Linux
ls -la

# Windows
dir
```

You should see `frontend`, `backend`, and `docs` folders.

---

### STEP 2: Fill Out Your Information (30-60 minutes)

**2.1** Open `backend/knowledge-base.json` in your code editor

**2.2** Replace ALL placeholder text with your actual information:
- Personal details (name, title, location)
- Work experience (be specific about achievements)
- Technical skills (list everything you know)
- Education and certifications
- Career goals and preferences
- Answers to common interview questions

**2.3** Save the file

**IMPORTANT**: This is the most critical step. The quality of your AI clone depends on how detailed and accurate this information is.

---

### STEP 3: Get Your Anthropic API Key (10 minutes)

**3.1** Go to https://console.anthropic.com/

**3.2** Sign up for an account (you'll need to verify your email)

**3.3** Add a payment method (you get $5 free credit, then pay-as-you-go)
- Cost is very low: ~$0.003 per conversation
- 100 conversations = ~$0.30

**3.4** Go to API Keys section: https://console.anthropic.com/settings/keys

**3.5** Click "Create Key"

**3.6** Copy the API key (starts with `sk-ant-...`)

**3.7** IMPORTANT: Save this key somewhere safe! You won't be able to see it again.

---

### STEP 4: Setup Backend (15 minutes)

**4.1** Navigate to the backend folder:
```bash
cd backend
```

**4.2** Install dependencies:
```bash
npm install
```

This will install Express, Anthropic SDK, CORS, and dotenv.

**4.3** Create your environment file:
```bash
# Mac/Linux
cp .env.example .env

# Windows
copy .env.example .env
```

**4.4** Open the `.env` file and add your API key:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-api-key-here
PORT=3001
```

**4.5** Test the backend locally:
```bash
npm start
```

You should see: "Server running on port 3001"

**4.6** Test the API endpoint:
Open a new terminal and run:
```bash
curl http://localhost:3001/health
```

You should see: `{"status":"healthy"}`

**4.7** Keep this terminal running. Open a new terminal for the next steps.

---

### STEP 5: Setup Frontend (5 minutes)

**5.1** In a NEW terminal, navigate to the frontend folder:
```bash
cd path/to/ai-interview-clone/frontend
```

**5.2** Open `chat.js` in your editor

**5.3** Find line 2 and update the API URL if needed:
```javascript
const API_URL = 'http://localhost:3001'; // For local testing
// Change to your deployed backend URL later
```

**5.4** Open `index.html` and customize:
- Line 8: Update the page title
- Line 15: Add your name
- Line 16: Update your title/role

**5.5** Test the frontend:

If you have Python installed:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Or install a simple server:
```bash
npm install -g http-server
http-server -p 8000
```

**5.6** Open your browser and go to: `http://localhost:8000`

You should see your chat interface!

---

### STEP 6: Test Everything Locally (15 minutes)

**6.1** Make sure both backend (port 3001) and frontend (port 8000) are running

**6.2** Open the chat interface in your browser

**6.3** Test with these questions:
- "Tell me about yourself"
- "What are your technical skills?"
- "What's your biggest achievement?"
- "What type of role are you looking for?"

**6.4** Verify the responses:
- Do they sound like you?
- Is the information accurate?
- Is the tone professional?

**6.5** If responses are off, edit `backend/knowledge-base.json` and restart the backend server (Ctrl+C then `npm start`)

---

### STEP 7: Deploy Backend to Render (20 minutes)

**7.1** Create a Render account at https://render.com/ (free tier available)

**7.2** Click "New +" → "Web Service"

**7.3** Connect your GitHub/GitLab (or choose "Public Git repository")

**7.4** If you don't have the code on GitHub yet:
- Go to GitHub.com
- Create a new repository
- Push your code:
```bash
cd path/to/ai-interview-clone
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ai-interview-clone.git
git push -u origin main
```

**7.5** Back in Render, select your repository

**7.6** Configure the service:
- Name: `ai-interview-clone-backend`
- Region: Choose closest to you
- Branch: `main`
- Root Directory: `backend`
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Instance Type: `Free`

**7.7** Add environment variables:
- Click "Advanced"
- Add: `ANTHROPIC_API_KEY` = your API key
- Add: `PORT` = `3001`

**7.8** Click "Create Web Service"

**7.9** Wait 5-10 minutes for deployment (you'll see logs)

**7.10** Once deployed, copy your backend URL (looks like: `https://ai-interview-clone-backend.onrender.com`)

**7.11** Test your deployed backend:
```bash
curl https://your-backend-url.onrender.com/health
```

---

### STEP 8: Deploy Frontend to Vercel (15 minutes)

**8.1** Create a Vercel account at https://vercel.com/ (free tier available)

**8.2** Install Vercel CLI:
```bash
npm install -g vercel
```

**8.3** Navigate to frontend folder:
```bash
cd path/to/ai-interview-clone/frontend
```

**8.4** Update `chat.js` with your deployed backend URL:
```javascript
const API_URL = 'https://your-backend-url.onrender.com';
```

**8.5** Create a `vercel.json` file in the frontend folder:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "*.html",
      "use": "@vercel/static"
    }
  ]
}
```

**8.6** Deploy:
```bash
vercel
```

Follow the prompts:
- Set up and deploy? `Y`
- Which scope? Choose your account
- Link to existing project? `N`
- Project name? `ai-interview-clone`
- In which directory is your code? `./`
- Want to override settings? `N`

**8.7** Your site is now live! Vercel will give you a URL like:
`https://ai-interview-clone.vercel.app`

**8.8** Test your live site!

---

### STEP 9: Add to Your Main Website (10 minutes)

**Option A: Embed as an iframe**

Add this to your main website:
```html
<iframe 
  src="https://your-ai-clone.vercel.app" 
  width="100%" 
  height="600px" 
  frameborder="0">
</iframe>
```

**Option B: Add as a popup/modal**

Copy the code from `frontend/index.html` and integrate it into your existing website. Update the CSS to match your site's design.

**Option C: Direct link**

Add a button on your site:
```html
<a href="https://your-ai-clone.vercel.app" target="_blank">
  Interview My AI Clone
</a>
```

---

### STEP 10: Monitor and Improve (Ongoing)

**10.1** Monitor API usage:
- Go to https://console.anthropic.com/
- Check usage and costs
- Set up billing alerts

**10.2** Collect feedback:
- Ask friends to test it
- Note questions that aren't answered well
- Update `knowledge-base.json` accordingly

**10.3** Redeploy after updates:

Backend (Render):
- Push changes to GitHub
- Render auto-deploys

Frontend (Vercel):
- Push changes to GitHub or run `vercel --prod`

---

## Troubleshooting

### Backend won't start
- Check if Node.js is installed: `node --version`
- Check if dependencies are installed: `npm install`
- Check if port 3001 is in use: `lsof -i :3001` (Mac/Linux)

### API errors
- Verify your API key is correct in `.env`
- Check API usage/limits at https://console.anthropic.com/
- Ensure you have billing set up

### Frontend can't connect to backend
- Check if backend is running: `curl http://localhost:3001/health`
- Verify API_URL in `chat.js` matches your backend
- Check browser console for CORS errors

### Deployment issues
- Check Render logs for backend errors
- Verify environment variables are set correctly
- Ensure `package.json` has all dependencies

### AI responses are poor quality
- Add more detail to `knowledge-base.json`
- Update the system prompt in `claude-handler.js`
- Test different phrasings of your information

---

## Costs

**Development**: Free
**Monthly Running Costs**:
- Anthropic API: ~$1-5/month (for 300-1500 conversations)
- Render: Free tier (backend sleeps after inactivity, wakes on request)
- Vercel: Free tier (plenty for personal use)

**Total**: ~$1-5/month

---

## Next Steps & Enhancements

After you have the basic version working, consider:

1. **Add conversation memory** - Store past conversations
2. **Email notifications** - Get notified when someone chats
3. **Analytics** - Track popular questions
4. **Resume download** - Let recruiters download your resume
5. **Calendar integration** - Let them book time with you
6. **Voice mode** - Add text-to-speech
7. **Multiple languages** - Support international recruiters

---

## Support

If you get stuck:
1. Check the troubleshooting section above
2. Read the error messages carefully
3. Google the error message
4. Check Anthropic documentation: https://docs.anthropic.com/
5. Ask on Stack Overflow with tag [anthropic-api]

---

## Security Notes

**NEVER commit your `.env` file to GitHub!**

The `.gitignore` file is set up to prevent this, but double-check:
```bash
cat .gitignore
```

Should include: `.env`

If you accidentally commit your API key:
1. Go to https://console.anthropic.com/settings/keys
2. Delete the compromised key
3. Generate a new one
4. Update your deployment

---

Good luck with your AI interview clone! 🚀
