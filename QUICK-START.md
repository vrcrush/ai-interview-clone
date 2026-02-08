# 🚀 QUICK START CARD - AI Interview Clone

## ⚡ 5-Minute Overview

**What you're building:** An AI chatbot that answers recruiter questions as YOU

**Tech stack:** Node.js + Express + Claude API + HTML/CSS/JS

**Monthly cost:** $1-5 (API usage)

**Time to build:** 6-8 hours total

---

## 📋 Prerequisites Checklist

- [ ] Node.js installed (v16+) - https://nodejs.org/
- [ ] Code editor (VS Code recommended)
- [ ] Anthropic account - https://console.anthropic.com/
- [ ] GitHub account - https://github.com/
- [ ] 2-3 hours of focused time

---

## 🎯 Step-by-Step Quickstart

### 1️⃣ Get API Key (5 min)
```
1. Go to https://console.anthropic.com/settings/keys
2. Click "Create Key"
3. Copy key (starts with sk-ant-...)
4. Save it somewhere safe!
```

### 2️⃣ Setup Backend (15 min)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env - add your API key
nano .env  # or open in editor
```

### 3️⃣ Fill Your Info (60 min)
```bash
# Edit backend/knowledge-base.json
# Fill ALL sections with YOUR information
# This is the MOST IMPORTANT step!
```

### 4️⃣ Test Locally (10 min)
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
python3 -m http.server 8000

# Browser
# Open: http://localhost:8000
```

### 5️⃣ Deploy (30 min)
```bash
# Backend to Render
1. Push to GitHub
2. Connect to Render
3. Add environment variables
4. Deploy

# Frontend to Vercel
cd frontend
vercel
# Follow prompts
```

---

## 🔑 Key Files to Edit

### MUST EDIT:
1. **backend/knowledge-base.json** - Your information (CRITICAL!)
2. **backend/.env** - Your API key
3. **frontend/index.html** - Your name and contact info
4. **frontend/chat.js** - API_URL (line 2, for deployment)

### Optional to customize:
5. **frontend/styles.css** - Colors and styling
6. **backend/claude-handler.js** - AI personality

---

## 💻 Essential Commands

### Backend:
```bash
cd backend
npm install          # Install dependencies
npm start           # Start server
```

### Frontend:
```bash
cd frontend
python3 -m http.server 8000    # Python
# OR
npx http-server -p 8000        # Node.js
```

### Testing:
```bash
curl http://localhost:3001/health
curl http://localhost:3001/api/welcome
```

### Git:
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

---

## 🌐 URLs You'll Need

### Development:
- Backend: http://localhost:3001
- Frontend: http://localhost:8000
- Backend health: http://localhost:3001/health

### Services:
- Anthropic Console: https://console.anthropic.com/
- GitHub: https://github.com/
- Render: https://render.com/
- Vercel: https://vercel.com/

### Docs:
- Claude API: https://docs.anthropic.com/
- Express: https://expressjs.com/
- Deployment Guide: See docs/setup-guide.md

---

## 🐛 Quick Troubleshooting

**Backend won't start:**
```bash
# Check Node.js
node --version

# Check API key
cat backend/.env

# Reinstall dependencies
cd backend
rm -rf node_modules
npm install
```

**Frontend can't connect:**
```bash
# Check API_URL in frontend/chat.js
# Should be: http://localhost:3001

# Check backend is running
curl http://localhost:3001/health
```

**API errors:**
```bash
# Verify API key
# Go to: https://console.anthropic.com/settings/keys
# Generate new key if needed
```

---

## 📁 Project Structure

```
ai-interview-clone/
├── README.md                    # Start here!
├── setup.sh                     # Automated setup script
├── backend/
│   ├── package.json            # Dependencies
│   ├── server.js               # API server
│   ├── claude-handler.js       # AI logic
│   ├── knowledge-base.json     # YOUR INFO (edit this!)
│   ├── .env                    # API key (create this!)
│   └── .env.example            # Template
├── frontend/
│   ├── index.html              # Main page (edit this!)
│   ├── chat.js                 # Chat logic
│   ├── styles.css              # Styling
│   └── vercel.json             # Vercel config
└── docs/
    ├── setup-guide.md          # Detailed instructions
    ├── testing-guide.md        # Testing procedures
    ├── customization-guide.md  # Personalization
    └── FAQ.md                  # Common questions
```

---

## ✅ Testing Checklist

Before deploying:
- [ ] Backend starts without errors
- [ ] Can access http://localhost:3001/health
- [ ] Frontend loads in browser
- [ ] Can send and receive messages
- [ ] Responses are accurate to your profile
- [ ] Tested on mobile browser
- [ ] All personal info is correct
- [ ] No API key in frontend code

---

## 🚀 Deployment Checklist

### Render (Backend):
- [ ] Code pushed to GitHub
- [ ] Connected repository to Render
- [ ] Set environment variables:
  - ANTHROPIC_API_KEY
  - PORT=3001
  - NODE_ENV=production
- [ ] Deployment successful
- [ ] Health check passes

### Vercel (Frontend):
- [ ] Updated API_URL in chat.js
- [ ] Committed changes to git
- [ ] Ran `vercel` command
- [ ] Deployment successful
- [ ] Can send messages on live site

---

## 💡 Pro Tips

1. **Knowledge Base is King:** Spend time on this. More detail = Better responses.

2. **Test Thoroughly:** Have friends test before sharing with recruiters.

3. **Start Simple:** Get basic version working, then customize.

4. **Monitor Usage:** Check Anthropic console for API usage.

5. **Iterate:** Update based on feedback and questions you get.

6. **Promote It:** Add to resume, LinkedIn, email signature.

7. **Keep Updated:** Update knowledge base after job changes.

8. **Be Transparent:** Always make clear it's an AI clone.

---

## 📊 Expected Costs

**First Month:**
- Anthropic API: $5 free credit
- Render: Free
- Vercel: Free
- **Total: $0**

**Ongoing (100-200 conversations/month):**
- Anthropic API: $0.30-$1.50
- Render: Free (or $7/month for always-on)
- Vercel: Free
- **Total: $1-5/month**

---

## 🆘 Need Help?

1. **Read the docs:**
   - README.md for overview
   - docs/setup-guide.md for details
   - docs/FAQ.md for common issues

2. **Check errors:**
   - Browser console (F12)
   - Backend logs
   - Error messages

3. **Search online:**
   - GitHub issues
   - Stack Overflow
   - Google the error message

4. **Ask community:**
   - Create GitHub issue
   - Post on Stack Overflow
   - Developer forums

---

## 🎓 What You'll Learn

By completing this project:
- ✅ API integration (Anthropic Claude)
- ✅ Backend development (Node.js/Express)
- ✅ Frontend development (HTML/CSS/JS)
- ✅ Deployment (Vercel/Render)
- ✅ Environment variables
- ✅ Git/GitHub
- ✅ REST APIs
- ✅ Async JavaScript
- ✅ JSON data structures
- ✅ CORS and security

---

## 📈 Next Steps After Basic Setup

1. Test with recruiters
2. Gather feedback
3. Refine responses
4. Add customizations
5. Share on LinkedIn
6. Add to portfolio
7. Blog about it
8. Help others build theirs!

---

## 🎉 You're Ready!

**Priority Order:**
1. Get API key
2. Setup backend
3. Fill knowledge base (most important!)
4. Test locally
5. Deploy
6. Share with world

**Remember:** 
- Take breaks
- Test frequently
- Ask for help if stuck
- Have fun building!

**Good luck! You got this! 🚀**

---

Print this page and keep it handy while building!
