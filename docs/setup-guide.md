# Complete Setup Guide - AI Interview Clone

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Local Testing](#local-testing)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

**Node.js (v16 or higher)**
- Download: https://nodejs.org/
- Check installation: `node --version`

**Code Editor**
- VS Code (recommended): https://code.visualstudio.com/
- Or any text editor you prefer

**Terminal/Command Prompt**
- Mac/Linux: Built-in Terminal
- Windows: Command Prompt or PowerShell

### Required Accounts

**Anthropic Account**
- Sign up: https://console.anthropic.com/
- You'll need this for the API key

**GitHub Account (Optional but recommended)**
- Sign up: https://github.com/
- Needed for deployment to Vercel and Render

**Vercel Account (for frontend hosting)**
- Sign up: https://vercel.com/
- Can sign up with GitHub

**Render Account (for backend hosting)**
- Sign up: https://render.com/
- Can sign up with GitHub

---

## Backend Setup

### Step 1: Navigate to Backend Folder

Open your terminal and navigate to the backend folder:

```bash
cd path/to/ai-interview-clone/backend
```

### Step 2: Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This will install:
- `express`: Web server framework
- `@anthropic-ai/sdk`: Anthropic API client
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variable management

You should see output showing the installation progress. This may take 1-2 minutes.

### Step 3: Get Your Anthropic API Key

1. Go to https://console.anthropic.com/settings/keys
2. Click "Create Key"
3. Give it a name (e.g., "AI Interview Clone")
4. Copy the key (starts with `sk-ant-...`)
5. **IMPORTANT**: Save this key somewhere safe! You won't be able to see it again.

### Step 4: Create Environment File

Create a new file called `.env` in the backend folder:

```bash
# Mac/Linux
touch .env

# Windows
type nul > .env
```

Open `.env` in your editor and add:

```
ANTHROPIC_API_KEY=sk-ant-your-actual-api-key-here
PORT=3001
NODE_ENV=development
RATE_LIMIT=100
```

Replace `sk-ant-your-actual-api-key-here` with your actual API key.

### Step 5: Customize Your Knowledge Base

Open `backend/knowledge-base.json` in your editor.

**This is the most important step!** Fill out all sections with your actual information:

- **personal_info**: Your name, title, location, links
- **professional_summary**: Brief overview of your career
- **work_experience**: Detailed work history with achievements
- **technical_skills**: All technologies you know
- **education**: Your degrees and certifications
- **career_goals**: What you're looking for
- **interview_qa**: Your answers to common interview questions
- **practical_info**: Availability, salary expectations
- **personality_and_style**: How you communicate

**Tips for filling this out:**
- Be specific with numbers and metrics in achievements
- Use the STAR method (Situation, Task, Action, Result) for examples
- Write in first person as if you're answering directly
- Include both technical and soft skills
- Be honest about what you're looking for

### Step 6: Test the Backend

Start the backend server:

```bash
npm start
```

You should see:
```
🚀 Server running on port 3001
📡 Health check: http://localhost:3001/health
💬 Chat endpoint: http://localhost:3001/api/chat
✅ Anthropic API key detected
✅ Knowledge base loaded successfully
```

If you see any warnings or errors:
- `⚠️ ANTHROPIC_API_KEY not set`: Check your .env file
- `⚠️ Knowledge base not loaded`: Check knowledge-base.json for JSON syntax errors

### Step 7: Test API Endpoints

Open a new terminal window and test the health endpoint:

```bash
curl http://localhost:3001/health
```

You should see:
```json
{"status":"healthy","timestamp":"2024-..."}
```

Test the welcome endpoint:

```bash
curl http://localhost:3001/api/welcome
```

You should see your welcome message and suggested questions.

**Keep the backend running!** Leave this terminal window open and running.

---

## Frontend Setup

### Step 8: Navigate to Frontend Folder

Open a NEW terminal window (keep the backend running in the other one).

```bash
cd path/to/ai-interview-clone/frontend
```

### Step 9: Customize the HTML

Open `index.html` in your editor and update:

**Line 6** - Page title:
```html
<title>Interview My AI Clone - [Your Name]</title>
```

**Line 7** - Meta description:
```html
<meta name="description" content="Chat with [Your Name]'s AI clone to learn about their background and experience.">
```

**Line 14** - Header:
```html
<h1>Interview My AI Clone</h1>
```

**Line 15** - Subtitle:
```html
<p class="subtitle">Ask me anything about my background, experience, and skills</p>
```

**Lines 68-70** - Contact information:
```html
<a href="mailto:your.actual.email@example.com" class="contact-link">Send me an email</a>
or 
<a href="https://linkedin.com/in/your-actual-profile" class="contact-link" target="_blank">connect on LinkedIn</a>
```

### Step 10: Test the Frontend Locally

You need to serve the frontend files. Choose one method:

**Option A: Using Python (if you have it installed)**

Python 3:
```bash
python3 -m http.server 8000
```

Python 2:
```bash
python -m SimpleHTTPServer 8000
```

**Option B: Using Node.js http-server**

First install it:
```bash
npm install -g http-server
```

Then run:
```bash
http-server -p 8000
```

**Option C: Using VS Code Live Server extension**

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Step 11: Test the Complete Application

1. Make sure backend is still running on port 3001
2. Frontend should be running on port 8000 (or 5500 if using VS Code)
3. Open your browser and go to: `http://localhost:8000`

**Test the interface:**
- You should see the welcome message
- Try clicking a suggested question
- Type your own question
- Verify the AI responds appropriately
- Check that the responses match your knowledge base

**If something doesn't work:**
- Check browser console for errors (F12 key)
- Verify backend is running
- Check that `chat.js` has the correct API_URL

---

## Local Testing Checklist

Before deploying, test these scenarios:

### Basic Functionality
- [ ] Welcome message appears
- [ ] Suggested questions are clickable
- [ ] Can type and send custom messages
- [ ] AI responds to questions
- [ ] Character counter works
- [ ] Can't send empty messages
- [ ] Loading indicator appears while waiting

### Content Quality
- [ ] Responses are accurate to your profile
- [ ] Tone matches your communication style
- [ ] Handles follow-up questions well
- [ ] Stays on topic
- [ ] Politely handles off-topic questions

### Edge Cases
- [ ] Very long messages (test at 2000 character limit)
- [ ] Rapid-fire questions
- [ ] Nonsensical input
- [ ] Special characters in messages
- [ ] Multiple tabs open (tests rate limiting)

### Mobile Testing
- [ ] Open on mobile browser
- [ ] Interface is responsive
- [ ] Can scroll through conversation
- [ ] Keyboard doesn't cover input
- [ ] Touch interactions work

---

## Deployment

### Deploy Backend to Render

#### Step 1: Prepare Your Code

Make sure your code is pushed to GitHub:

```bash
cd path/to/ai-interview-clone
git init
git add .
git commit -m "Initial commit - AI Interview Clone"
```

Create a GitHub repository:
1. Go to https://github.com/new
2. Name it: `ai-interview-clone`
3. Don't initialize with README (you already have one)
4. Click "Create repository"

Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-interview-clone.git
git branch -M main
git push -u origin main
```

#### Step 2: Create Render Web Service

1. Go to https://render.com/
2. Click "New +" → "Web Service"
3. Click "Connect account" and authorize GitHub
4. Select your `ai-interview-clone` repository
5. Configure the service:

**Name**: `ai-interview-clone-backend` (or any name you want)
**Region**: Choose closest to your target audience
**Branch**: `main`
**Root Directory**: `backend`
**Environment**: `Node`
**Build Command**: `npm install`
**Start Command**: `npm start`
**Instance Type**: `Free`

6. Click "Advanced" to add environment variables:
   - Key: `ANTHROPIC_API_KEY`, Value: `sk-ant-your-key...`
   - Key: `PORT`, Value: `3001`
   - Key: `NODE_ENV`, Value: `production`

7. Click "Create Web Service"

#### Step 3: Wait for Deployment

Render will start deploying. This takes 5-10 minutes.

Watch the logs. You should see:
- `Installing dependencies...`
- `Running npm install...`
- `Starting service...`
- `🚀 Server running on port 3001`

#### Step 4: Get Your Backend URL

Once deployed, Render gives you a URL like:
```
https://ai-interview-clone-backend.onrender.com
```

Copy this URL!

#### Step 5: Test Your Deployed Backend

```bash
curl https://your-backend-url.onrender.com/health
```

Should return:
```json
{"status":"healthy","timestamp":"..."}
```

### Deploy Frontend to Vercel

#### Step 1: Update API URL

Open `frontend/chat.js` and update line 2:

```javascript
const API_URL = 'https://your-actual-backend-url.onrender.com';
```

Replace with your actual Render backend URL (without trailing slash).

Commit this change:
```bash
git add frontend/chat.js
git commit -m "Update API URL for production"
git push
```

#### Step 2: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 3: Deploy to Vercel

Navigate to frontend folder:
```bash
cd path/to/ai-interview-clone/frontend
```

Run Vercel deploy:
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** Y
- **Which scope?** Choose your account
- **Link to existing project?** N
- **What's your project's name?** ai-interview-clone (or any name)
- **In which directory is your code located?** ./ (current directory)
- **Want to override the settings?** N

Wait for deployment (takes 1-2 minutes).

Vercel will give you a URL like:
```
https://ai-interview-clone.vercel.app
```

#### Step 4: Test Your Live Site

1. Open the Vercel URL in your browser
2. Test all functionality
3. Share with friends for feedback

#### Step 5: Deploy Production Version

Once you're happy with the preview, deploy to production:

```bash
vercel --prod
```

---

## Post-Deployment

### Update Your Main Website

Add a link to your AI clone:

**Option 1: Direct Link**
```html
<a href="https://your-ai-clone.vercel.app" target="_blank">
  Interview My AI Clone
</a>
```

**Option 2: Embed as iframe**
```html
<iframe 
  src="https://your-ai-clone.vercel.app" 
  width="100%" 
  height="700px"
  frameborder="0"
  title="AI Interview Clone">
</iframe>
```

**Option 3: Popup Modal**
Add a button that opens the chat in a modal overlay.

### Share Your AI Clone

- Add to your resume/CV
- Share on LinkedIn
- Add to job applications
- Include in your email signature
- Share with your network

### Monitor Usage

**Check API Usage:**
1. Go to https://console.anthropic.com/
2. View usage statistics
3. Set up billing alerts

**Check Backend Logs:**
1. Go to Render dashboard
2. Click on your service
3. View logs to see activity

---

## Troubleshooting

### Backend Issues

**"ANTHROPIC_API_KEY not set"**
- Check that .env file exists
- Verify the key starts with `sk-ant-`
- Make sure there are no spaces around the key
- In Render, check environment variables are set correctly

**"Knowledge base not loaded"**
- Check knowledge-base.json for syntax errors
- Use a JSON validator: https://jsonlint.com/
- Make sure all quotes are properly closed
- Verify commas between array/object items

**"Port already in use"**
- Another process is using port 3001
- Kill the process: `lsof -i :3001` then `kill -9 PID`
- Or change PORT in .env to 3002

**API returns 401 Unauthorized**
- API key is invalid or expired
- Generate a new key at https://console.anthropic.com/settings/keys
- Update .env file with new key
- Restart the server

**API returns 429 Rate Limit**
- You've exceeded your rate limit
- Check usage at https://console.anthropic.com/
- Wait a few minutes and try again
- Consider upgrading your plan

### Frontend Issues

**Chat doesn't load**
- Check browser console (F12) for errors
- Verify API_URL in chat.js is correct
- Make sure backend is running
- Check for CORS errors

**Messages not sending**
- Check network tab in browser console
- Verify backend endpoint is accessible
- Check for JavaScript errors
- Try refreshing the page

**Styling looks broken**
- Clear browser cache
- Verify styles.css is loaded
- Check browser console for CSS errors
- Try a different browser

### Deployment Issues

**Render deployment fails**
- Check build logs for errors
- Verify package.json is correct
- Make sure all dependencies are listed
- Check that files are committed to git

**Vercel deployment fails**
- Check deployment logs
- Verify vercel.json is correct
- Make sure all files are committed
- Try deploying again

**CORS errors in production**
- Backend needs to allow frontend domain
- Add to backend/server.js:
```javascript
app.use(cors({
  origin: 'https://your-frontend.vercel.app'
}));
```

### Response Quality Issues

**Responses are generic or off-topic**
- Add more detail to knowledge-base.json
- Include specific examples and metrics
- Update personality_and_style section
- Redeploy backend after changes

**Responses are too long/short**
- Adjust system prompt in claude-handler.js
- Add examples of desired response length
- Specify "2-3 paragraphs" in instructions

**Clone doesn't sound like you**
- Add more examples of your communication style
- Include common phrases you use
- Add personality traits to knowledge base
- Test and iterate on the tone

---

## Maintenance

### Regular Updates

**Monthly:**
- Review conversation logs
- Update knowledge base with new skills/experience
- Check API usage and costs
- Test the chat interface

**After Major Life Events:**
- New job: Update work experience
- New skills: Update technical skills
- Career change: Update goals and preferences
- Update interview Q&A responses

### Cost Management

**Monitor Spending:**
- Check Anthropic console weekly
- Set up billing alerts at $5, $10, $20
- Average cost: $1-5/month for normal usage

**Reduce Costs:**
- Use Claude Haiku instead of Sonnet (cheaper, less capable)
- Limit conversation history length
- Increase rate limiting

### Security

**Protect Your API Key:**
- Never commit .env to GitHub
- Rotate keys quarterly
- Use separate keys for dev/prod
- Delete keys if compromised

**Monitor for Abuse:**
- Check logs for suspicious activity
- Adjust rate limiting if needed
- Consider adding authentication
- Block IP addresses if necessary

---

## Next Steps

Once your basic AI clone is working, consider adding:

### Enhancements

1. **Email Notifications**
   - Get notified when someone chats
   - Track popular questions

2. **Analytics**
   - Google Analytics integration
   - Track user engagement
   - Identify FAQ patterns

3. **Resume Download**
   - Add button to download PDF resume
   - Auto-generate from knowledge base

4. **Calendar Booking**
   - Integrate Calendly
   - Let recruiters book time with you

5. **Multi-language Support**
   - Detect user language
   - Respond in their language

6. **Voice Mode**
   - Add speech-to-text
   - Add text-to-speech
   - Voice clone integration

7. **Chat History**
   - Save conversations to database
   - Let users resume conversations
   - Export chat transcripts

8. **Admin Dashboard**
   - View all conversations
   - Analyze question patterns
   - Track engagement metrics

### Learning Resources

**Claude API Documentation:**
https://docs.anthropic.com/

**Prompt Engineering Guide:**
https://docs.anthropic.com/claude/docs/prompt-engineering

**Express.js Documentation:**
https://expressjs.com/

**Vercel Documentation:**
https://vercel.com/docs

**Render Documentation:**
https://render.com/docs

---

## Support & Community

**Need Help?**
- Check this guide thoroughly
- Search GitHub issues
- Ask on Stack Overflow with tags: [anthropic-api] [express] [claude]
- Join Anthropic Discord: https://discord.gg/anthropic

**Found a Bug?**
- Check browser console for errors
- Check backend logs
- Create an issue on GitHub with details
- Include error messages and steps to reproduce

**Want to Contribute?**
- Fork the repository
- Make your changes
- Submit a pull request
- Share your improvements!

---

## Conclusion

Congratulations! You now have a working AI interview clone that can:
- Answer questions about your background
- Demonstrate your communication style
- Available 24/7 for recruiters
- Save you time in the hiring process

Remember to:
- Keep your knowledge base updated
- Monitor for issues and feedback
- Iterate on response quality
- Share with your network

Good luck with your job search! 🚀

---

**Last Updated:** February 2026
**Version:** 1.0
**License:** MIT
