# Frequently Asked Questions (FAQ)

## General Questions

### What is an AI Interview Clone?
It's an AI-powered chatbot that can answer questions about your professional background as if recruiters are talking directly to you. Think of it as a 24/7 available version of yourself that can handle initial screening conversations.

### Why would I want this?
- **Save time:** Let AI handle repetitive questions from recruiters
- **Always available:** Works 24/7 across all timezones
- **Consistent:** Always gives accurate information about you
- **Professional:** Creates a tech-forward impression
- **Scalable:** Can talk to unlimited recruiters simultaneously

### How much does it cost?
- **Development:** Free (DIY) or $10k-50k if hiring developers
- **Monthly costs:** $1-5/month for typical usage
  - Anthropic API: ~$0.003 per conversation
  - Hosting: Free tiers available
  
### Is this cheating or misleading?
No! It's clearly labeled as an AI clone, and it's transparent. It's similar to:
- Having an FAQ page
- Using an email auto-responder
- Having a chatbot on your website

The goal is to make information more accessible, not to deceive anyone.

---

## Technical Questions

### Do I need to know how to code?
Basic knowledge is helpful, but the setup guide is detailed enough for beginners. You need to:
- Run commands in terminal
- Edit text files
- Follow step-by-step instructions

If you can use a computer, you can set this up!

### What programming languages are used?
- **Backend:** JavaScript (Node.js)
- **Frontend:** HTML, CSS, JavaScript (vanilla, no frameworks)
- **AI:** Anthropic Claude API

### Can I use a different AI model?
Yes! The code is structured to work with:
- Anthropic Claude (default)
- OpenAI GPT models (requires code changes)
- Google PaLM (requires code changes)
- Open-source models (requires more setup)

### What if I don't have a Mac/Linux?
The project works on:
- ✅ Mac
- ✅ Linux
- ✅ Windows (with some command adjustments)

Windows users should use PowerShell or Git Bash instead of Command Prompt.

### Can I deploy this without using Vercel/Render?
Yes! You can deploy to:
- AWS (EC2, Lambda, S3)
- Google Cloud Platform
- Azure
- Heroku
- DigitalOcean
- Any hosting service that supports Node.js and static files

---

## Setup Questions

### How long does setup take?
- **Basic setup:** 2-3 hours
- **Filling knowledge base:** 1-2 hours
- **Deployment:** 1-2 hours
- **Testing and refinement:** 2-4 hours
- **Total:** About 1 day

### I'm stuck on a step. What do I do?
1. Read the error message carefully
2. Check the Troubleshooting section in README.md
3. Google the specific error
4. Check GitHub issues
5. Ask on Stack Overflow with tags: [anthropic-api] [express] [node.js]

### Do I need a credit card?
Yes, for:
- Anthropic API (after free $5 credit)
- Render (free tier available, but card required for verification)
- Vercel (free tier doesn't require card)

### How do I get an Anthropic API key?
1. Go to https://console.anthropic.com/
2. Sign up for an account
3. Add payment method
4. Go to Settings → API Keys
5. Click "Create Key"
6. Copy and save the key

---

## Knowledge Base Questions

### How detailed should my knowledge base be?
**More detail = Better responses.** Include:
- Specific projects with metrics
- Technologies you've used and for how long
- Concrete examples of achievements
- Your actual communication style
- Real answers to common questions

Aim for at least 5,000 words total.

### Should I include sensitive information?
**No!** Don't include:
- Social Security Number
- Personal address
- Private phone number
- Salary history (if you're uncomfortable)
- Anything you wouldn't put on LinkedIn

### Can I update my knowledge base after deployment?
Yes! Just:
1. Edit `backend/knowledge-base.json`
2. Commit changes to git
3. Push to GitHub
4. Render auto-deploys (or you can manually deploy)

Changes take effect within 1-2 minutes.

### What if I don't know how to answer a question in the knowledge base?
Write it naturally as you would speak. For example:
- ❌ "Worked with team to build thing"
- ✅ "I led a team of 4 engineers to build a real-time analytics dashboard that processed 10M events/day, reducing decision-making time by 40%"

Be specific, use metrics, tell a story.

---

## Usage Questions

### How do recruiters find my AI clone?
You need to promote it:
- Add link to resume/CV
- Share on LinkedIn
- Include in email signature
- Add to portfolio website
- Mention in job applications
- Include in cover letters

### Will recruiters be put off by an AI?
Most will be impressed! It shows:
- Technical sophistication
- Innovation
- Efficiency
- Time management
- Forward-thinking

### Can the AI schedule interviews?
Not in the basic version, but you can:
- Link to Calendly in the footer
- Add a "Schedule Interview" button
- Integrate calendar API (advanced)

### What if the AI gives wrong information?
This is why testing is crucial. If you notice:
1. Update the knowledge base
2. Test again
3. Refine the system prompt
4. Monitor conversations

### Can multiple people chat at the same time?
Yes! The backend handles multiple concurrent conversations. Each user has their own session.

### Is conversation history saved?
In the basic version, no. Each session is independent. You can add:
- Database storage (see Advanced section)
- Session persistence
- Chat export feature

---

## Privacy & Security Questions

### Is my data safe?
Your data security depends on:
- ✅ API key kept secret in .env file
- ✅ .env file in .gitignore (never committed)
- ✅ HTTPS on deployed sites
- ✅ Rate limiting enabled
- ⚠️ Knowledge base is visible to anyone with backend access

### Who can see my API key?
Only you, if you:
- Don't commit .env to GitHub
- Don't share your Render dashboard access
- Keep your GitHub/Anthropic accounts secure

### Can someone abuse my AI clone?
Protections in place:
- Rate limiting (100 requests/hour per IP)
- Message length limits (2000 characters)
- Input validation
- Error handling

You can also:
- Add authentication
- Block specific IPs
- Monitor logs for abuse

### What does Anthropic do with the conversations?
According to Anthropic's policy:
- API conversations are not used to train models
- Data is retained for 30 days for trust & safety
- Then deleted unless required by law
- See: https://www.anthropic.com/legal/privacy

### Should I include my salary expectations?
That's up to you. Options:
1. Include a range in knowledge base
2. Say "open to discussion based on role"
3. Say "prefer to discuss after understanding the role"

Choose what you're comfortable with.

---

## Cost Questions

### What's the monthly cost breakdown?
Typical usage (100-200 conversations/month):
- Anthropic API: $0.30-$1.50
- Render hosting: $0 (free tier)
- Vercel hosting: $0 (free tier)
- Domain (optional): $1/month
- **Total: $1-5/month**

### How much does each conversation cost?
Using Claude Sonnet:
- Input: ~$3 per million tokens
- Output: ~$15 per million tokens
- Average conversation: ~5,000 tokens total
- **Cost per conversation: ~$0.003**

### What if I exceed the free tier?
Render free tier:
- 750 hours/month (plenty for this project)
- Backend "sleeps" after 15min inactivity
- Wakes up on first request (takes ~30 seconds)
- If you exceed, upgrade to $7/month plan

### Can I reduce costs?
Yes:
- Use Claude Haiku instead of Sonnet (75% cheaper)
- Limit conversation history length
- Increase rate limiting
- Optimize prompt length

---

## Customization Questions

### Can I change the appearance?
Yes! Everything is customizable:
- Colors and theme
- Fonts
- Layout
- Avatars
- Animations

See `docs/customization-guide.md` for details.

### Can I add my photo?
Yes! Add an image in the header. See Customization Guide.

### Can I make it say things differently?
Yes! Edit:
- System prompt in `claude-handler.js`
- Personality section in `knowledge-base.json`
- Welcome message and suggested questions

### Can I add more features?
Yes! Some ideas:
- Resume download button
- Calendar integration
- Email notifications
- Voice mode
- Multi-language support
- Analytics
- Chat history storage

See Advanced Customization section in docs.

---

## Deployment Questions

### Do I need my own domain?
No! Vercel and Render provide free domains:
- Frontend: `your-clone.vercel.app`
- Backend: `your-clone.onrender.com`

You can add custom domain later if desired.

### How long does deployment take?
- Backend (Render): 5-10 minutes
- Frontend (Vercel): 1-2 minutes
- Total: ~15 minutes

### Can I preview before making it live?
Yes! Vercel creates preview deployments:
- Every git push creates a preview
- Test before promoting to production
- Each branch gets its own URL

### What if deployment fails?
Check:
1. Build logs for error messages
2. Environment variables are set
3. Dependencies in package.json
4. Node.js version compatibility
5. Troubleshooting section in docs

### How do I update after deployment?
1. Make changes locally
2. Test locally
3. Commit to git: `git commit -m "Description"`
4. Push to GitHub: `git push`
5. Auto-deploys in 1-2 minutes

---

## Maintenance Questions

### How often should I update?
- **Knowledge base:** After any career changes
- **Code:** Only when adding features or fixing bugs
- **Dependencies:** Every 3-6 months for security

### What if Claude API changes?
The Anthropic SDK is maintained and backward-compatible. If breaking changes occur:
1. Check Anthropic's changelog
2. Update the SDK: `npm update @anthropic-ai/sdk`
3. Test thoroughly
4. Update code if needed

### What if I get a new job?
Update your knowledge base:
1. Edit `backend/knowledge-base.json`
2. Add new job to work_experience
3. Update career goals if changed
4. Update availability
5. Commit and push changes

### How do I track usage?
Options:
1. Check Anthropic console for API usage
2. Check Render logs for traffic
3. Add Google Analytics (see Customization)
4. Store conversations in database

### What if I want to take it offline?
1. Remove link from your website/resume
2. Or shut down services:
   - Render: Suspend service
   - Vercel: Delete project
3. Or make it password-protected

---

## Troubleshooting Questions

### "Command not found" error
You might not have Node.js or npm installed:
```bash
# Check installation
node --version
npm --version

# If not installed, download from https://nodejs.org/
```

### "Port already in use"
Another process is using the port:
```bash
# Find process
lsof -i :3001

# Kill process
kill -9 [PID]

# Or use different port in .env
PORT=3002
```

### "Cannot find module"
Dependencies not installed:
```bash
cd backend
npm install
```

### Backend works but frontend can't connect
Check `frontend/chat.js` API_URL matches your backend URL.

### Responses are poor quality
1. Add more detail to knowledge base
2. Include specific examples
3. Update system prompt
4. Test with different questions
5. Iterate based on feedback

### CORS errors in production
Update backend/server.js:
```javascript
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app'
}));
```

---

## Best Practices Questions

### Should I test before sharing?
**YES!** Testing checklist:
- Test on desktop
- Test on mobile
- Have friends test it
- Try edge cases
- Verify information accuracy
- Check it sounds like you

### How do I gather feedback?
- Ask friends/colleagues to test
- Share with trusted recruiters
- Monitor common questions
- Track which questions get poor responses
- Update based on patterns

### Should I monitor conversations?
If you add conversation logging:
- Review weekly for common questions
- Look for information gaps
- Identify confusing responses
- Update knowledge base accordingly

### How do I know if it's working?
Success metrics:
- Recruiters use it
- Questions get good responses
- Leads to interviews
- Saves you time
- Professional impression

---

## Advanced Questions

### Can I train it on my resume?
The knowledge base essentially does this. You can also:
- Upload your resume as PDF
- Parse it programmatically
- Auto-populate knowledge base

### Can I integrate with my CRM?
Yes, with custom development:
- Capture lead information
- Send to CRM via API
- Track recruiter interactions
- Qualify leads automatically

### Can I make it more conversational?
Yes! Edit the system prompt to:
- Ask follow-up questions
- Show more personality
- Use conversational markers
- Adapt to user's style

### Can I add multiple AI personas?
Yes, but complex:
- Create multiple knowledge bases
- Router to select persona
- Different system prompts
- Separate deployments or dynamic loading

### Can I make money with this?
You could:
- Offer as a service to others
- Create a SaaS version
- Sell templates
- Offer setup/customization services

---

## Legal & Ethical Questions

### Is this legal?
Yes! It's your information about yourself. Just:
- Don't impersonate someone else
- Don't make false claims
- Don't violate API terms of service
- Be transparent it's an AI

### Do I need to disclose it's an AI?
Yes! The interface clearly states it's an AI clone. Always be transparent.

### What about data protection laws?
- Don't collect personal data from users
- Don't store sensitive information
- Follow GDPR/CCPA if applicable
- Have a privacy policy if needed

### Can recruiters sue if they feel misled?
Very unlikely if:
- It's clearly labeled as AI
- Information is accurate
- You're transparent
- No false claims

### What about copyright on my responses?
You own your information and responses. The AI-generated text is licensed based on:
- Your knowledge base (your ownership)
- Anthropic's API terms (check their terms)
- Your implementation (your ownership)

---

## Success Stories & Tips

### How do I promote my AI clone?
- LinkedIn post announcing it
- Add to resume (Skills or Projects section)
- Email signature: "Chat with my AI: [link]"
- Include in cover letters
- Share in developer communities
- Blog post about building it

### Should I mention it in interviews?
Absolutely! It shows:
- Technical skills
- Problem-solving
- Innovation
- Initiative
- Time management

Great conversation starter!

### What's the best way to use this?
- Initial screening tool
- Pre-interview preparation for recruiters
- FAQ resource
- Portfolio piece
- Time-saver for common questions
- Professional differentiator

### Can this replace traditional applications?
No, it complements them:
- Still apply normally
- Use this as a supplement
- Helps recruiters learn more
- Makes you more memorable
- Saves time on repetitive questions

---

## Questions About This Guide

### Is this guide complete?
It covers everything to get started, but technology evolves. Check:
- Anthropic documentation for API updates
- GitHub repository for latest code
- Community discussions for tips

### Can I contribute to this project?
Yes! This is open source:
- Report bugs
- Suggest features
- Submit pull requests
- Share improvements
- Help others in issues

### Where can I get help?
Resources:
1. This documentation
2. GitHub issues
3. Stack Overflow
4. Anthropic Discord
5. Reddit r/learnprogramming
6. Dev.to community

### Can I share this with others?
Yes! Share freely:
- Forward the repository
- Write blog posts about it
- Make video tutorials
- Help others set it up
- Improve the documentation

---

## Still Have Questions?

**Read the docs:**
- README.md - Overview and quick start
- docs/setup-guide.md - Detailed setup
- docs/testing-guide.md - Testing procedures
- docs/customization-guide.md - Personalization

**Search online:**
- GitHub issues in this repository
- Stack Overflow: [anthropic-api] [express] [node.js]
- Anthropic documentation

**Ask the community:**
- Open a GitHub issue
- Post on Stack Overflow
- Ask in relevant subreddits
- Join developer Discord servers

**Professional help:**
- Hire a developer on Upwork/Fiverr
- Consulting services
- Developer agencies

Good luck with your AI Interview Clone! 🚀
