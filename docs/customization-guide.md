# Customization Guide

This guide shows you how to customize your AI Interview Clone to match your personal brand and preferences.

## Table of Contents
1. [Visual Customization](#visual-customization)
2. [Content Customization](#content-customization)
3. [Behavior Customization](#behavior-customization)
4. [Advanced Customization](#advanced-customization)

---

## Visual Customization

### Colors and Theme

Edit `frontend/styles.css` to change the color scheme:

```css
:root {
    /* Primary color (buttons, links) */
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    
    /* Background colors */
    --background-color: #f8fafc;
    --surface-color: #ffffff;
    
    /* Text colors */
    --text-primary: #0f172a;
    --text-secondary: #475569;
    
    /* Message bubbles */
    --user-message-bg: #2563eb;
    --assistant-message-bg: #f1f5f9;
}
```

**Example: Professional Blue Theme (Default)**
Already configured!

**Example: Tech Green Theme**
```css
:root {
    --primary-color: #10b981;
    --primary-hover: #059669;
    --user-message-bg: #10b981;
}
```

**Example: Creative Purple Theme**
```css
:root {
    --primary-color: #8b5cf6;
    --primary-hover: #7c3aed;
    --user-message-bg: #8b5cf6;
}
```

**Example: Corporate Gray Theme**
```css
:root {
    --primary-color: #64748b;
    --primary-hover: #475569;
    --user-message-bg: #64748b;
}
```

### Fonts

Change the font family in `frontend/styles.css`:

```css
body {
    /* Default system fonts */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    
    /* Or use Google Fonts */
    /* font-family: 'Inter', sans-serif; */
    /* font-family: 'Roboto', sans-serif; */
    /* font-family: 'Poppins', sans-serif; */
}
```

To use Google Fonts, add to `frontend/index.html` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Logo or Avatar

Add your photo in the header:

```html
<!-- In frontend/index.html, after line 14 -->
<header class="header">
    <div class="header-content">
        <img src="your-photo.jpg" alt="Your Name" class="profile-photo">
        <h1>Interview My AI Clone</h1>
        <p class="subtitle">Ask me anything about my background, experience, and skills</p>
    </div>
</header>
```

Add CSS styling:

```css
/* In frontend/styles.css */
.profile-photo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 16px;
    border: 3px solid var(--primary-color);
}
```

### Custom Message Avatars

Replace text avatars with images or icons:

**Option 1: Use initials**
Edit `frontend/chat.js`, function `addMessage()`:

```javascript
// Change this line:
avatar.textContent = role === 'user' ? 'You' : 'AI';

// To use initials:
avatar.textContent = role === 'user' ? 'JD' : 'AI'; // Your initials
```

**Option 2: Use emoji**
```javascript
avatar.textContent = role === 'user' ? '👤' : '🤖';
```

**Option 3: Use images**
```javascript
const img = document.createElement('img');
img.src = role === 'user' ? 'user-avatar.png' : 'ai-avatar.png';
img.alt = role === 'user' ? 'User' : 'AI';
img.style.width = '100%';
img.style.height = '100%';
img.style.borderRadius = '50%';
avatar.appendChild(img);
```

### Layout

**Make it wider:**
```css
/* In frontend/styles.css */
.container {
    max-width: 1200px; /* Default is 900px */
}
```

**Make it full-width:**
```css
.container {
    max-width: 100%;
    padding: 20px 40px;
}
```

**Adjust chat height:**
```css
.messages-container {
    min-height: 500px; /* Default is 400px */
    max-height: 800px; /* Default is 600px */
}
```

---

## Content Customization

### Welcome Message

**Option 1: Edit in knowledge base**
Change `backend/knowledge-base.json`:

```json
{
  "personal_info": {
    "name": "Your Name",
    "title": "Your Title"
  }
}
```

The welcome message auto-generates from this.

**Option 2: Custom welcome message**
Edit `backend/claude-handler.js`, function `getWelcomeMessage()`:

```javascript
function getWelcomeMessage() {
  return {
    success: true,
    message: `Hey there! 👋 I'm [Your Name]'s AI clone. I'm here to answer any questions you have about [Your Name]'s background, skills, and experience. What would you like to know?`
  };
}
```

### Suggested Questions

Edit `backend/claude-handler.js`, function `getSuggestedQuestions()`:

```javascript
function getSuggestedQuestions() {
  return [
    "What's your background?",
    "Tell me about your technical expertise",
    "What are you passionate about?",
    "What's your biggest achievement?",
    "What kind of role are you seeking?",
    "What's your work style?",
    "What are your salary expectations?",
    "How soon can you start?"
  ];
}
```

### Communication Style

Make your AI clone sound more like you by editing the system prompt in `backend/claude-handler.js`:

```javascript
function createSystemPrompt() {
  return `You are ${name}, ${title}, in an interview conversation.

PERSONALITY:
- Be enthusiastic and energetic
- Use casual but professional language
- Include occasional humor
- Show passion for technology
- Be direct and honest

COMMUNICATION STYLE:
- Keep responses conversational and engaging
- Use examples and anecdotes
- Break down complex topics simply
- End responses with a follow-up prompt
- Use "I" statements, not "the candidate"

[Rest of the prompt...]`;
}
```

**Examples of different styles:**

**Formal & Professional:**
```javascript
COMMUNICATION STYLE:
- Maintain professional tone throughout
- Use complete sentences and proper grammar
- Provide detailed, thorough responses
- Cite specific metrics and achievements
- Remain objective and factual
```

**Casual & Friendly:**
```javascript
COMMUNICATION STYLE:
- Keep it conversational and relaxed
- Use contractions (I'm, you're, we'll)
- Share stories and personal experiences
- Be warm and approachable
- It's okay to show personality
```

**Technical & Precise:**
```javascript
COMMUNICATION STYLE:
- Focus on technical accuracy
- Use industry-specific terminology
- Provide concrete examples with code/architecture
- Be concise and to-the-point
- Emphasize problem-solving approach
```

### Response Length

Control how long responses are:

```javascript
IMPORTANT INSTRUCTIONS:
1. Keep responses concise (2-3 paragraphs for most questions)
2. For technical questions, provide more detail (3-4 paragraphs)
3. For simple yes/no questions, keep it brief (1 paragraph)
4. If user asks for more detail, expand significantly
```

---

## Behavior Customization

### Rate Limiting

Change how many requests per hour are allowed:

In `backend/.env`:
```
RATE_LIMIT=200  # Default is 100
```

Or in `backend/server.js`:
```javascript
const RATE_LIMIT = 200; // requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
```

### Character Limit

Change maximum message length:

In `frontend/chat.js`:
```javascript
const MAX_MESSAGE_LENGTH = 1000; // Default is 2000
```

In `backend/server.js`:
```javascript
if (message.length > 1000) { // Default is 2000
  return res.status(400).json({
    success: false,
    error: 'Message too long. Keep it under 1000 characters.'
  });
}
```

### Conversation History

Change how many previous messages are included:

In `backend/server.js`:
```javascript
const limitedHistory = conversationHistory 
  ? conversationHistory.slice(-20) // Keep last 20 messages (default is 10)
  : [];
```

### Auto-Scroll Behavior

Change when chat auto-scrolls to bottom:

In `frontend/chat.js`:
```javascript
const AUTO_SCROLL_THRESHOLD = 200; // Default is 100 pixels
```

---

## Advanced Customization

### Add Analytics

Track usage with Google Analytics:

Add to `frontend/index.html` `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Track events in `frontend/chat.js`:

```javascript
// When message is sent
gtag('event', 'message_sent', {
  'event_category': 'Chat',
  'event_label': 'User Message'
});

// When response received
gtag('event', 'response_received', {
  'event_category': 'Chat',
  'event_label': 'AI Response'
});
```

### Add Resume Download

Add a download button in `frontend/index.html`:

```html
<!-- In the header or footer -->
<a href="your-resume.pdf" download class="download-button">
  📄 Download My Resume
</a>
```

Style it in `frontend/styles.css`:

```css
.download-button {
    display: inline-block;
    padding: 12px 24px;
    background-color: var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.2s ease;
}

.download-button:hover {
    background-color: var(--primary-hover);
    transform: translateY(-2px);
}
```

### Add Email Notifications

Get notified when someone chats with you:

Install nodemailer:
```bash
cd backend
npm install nodemailer
```

Add to `backend/server.js`:

```javascript
const nodemailer = require('nodemailer');

// Configure email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// In the /api/chat endpoint, after successful response:
if (process.env.NOTIFY_EMAIL) {
  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFY_EMAIL,
    subject: 'New Chat on AI Interview Clone',
    text: `Question: ${message}\n\nResponse: ${response.message}`
  });
}
```

Add to `backend/.env`:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NOTIFY_EMAIL=your-email@gmail.com
```

### Save Conversations

Store conversations in a database:

Install SQLite:
```bash
cd backend
npm install sqlite3
```

Create database handler:

```javascript
// backend/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./conversations.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_message TEXT,
    ai_response TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

function saveConversation(userMessage, aiResponse) {
  db.run('INSERT INTO conversations (user_message, ai_response) VALUES (?, ?)',
    [userMessage, aiResponse]);
}

module.exports = { saveConversation };
```

Use it in `backend/server.js`:

```javascript
const { saveConversation } = require('./database');

// In /api/chat endpoint:
saveConversation(message, response.message);
```

### Add Multi-Language Support

Detect user language and respond accordingly:

Install language detector:
```bash
cd backend
npm install franc
```

Update system prompt to include:

```javascript
If the user writes in a language other than English, respond in their language while maintaining accuracy about your background.
```

### Add Voice Mode

Let users speak their questions:

Add to `frontend/index.html`:

```html
<button id="voiceButton" class="voice-button" aria-label="Voice input">
    🎤
</button>
```

Add JavaScript:

```javascript
// frontend/chat.js
const voiceButton = document.getElementById('voiceButton');

if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    messageInput.value = transcript;
  };

  voiceButton.addEventListener('click', () => {
    recognition.start();
  });
}
```

### Use Different AI Models

Switch to Claude Haiku (cheaper, faster) or Opus (more capable):

In `backend/claude-handler.js`:

```javascript
// Claude Haiku (cheapest)
model: 'claude-haiku-4-20250514'

// Claude Sonnet (balanced) - DEFAULT
model: 'claude-sonnet-4-20250514'

// Claude Opus (most capable)
model: 'claude-opus-4-5-20251101'
```

### Custom Error Messages

Make error messages match your personality:

In `backend/server.js` and `frontend/chat.js`, replace generic errors with:

```javascript
// Instead of "An error occurred"
"Oops! Something went wrong. Give me a moment and try again!"

// Instead of "Rate limit exceeded"
"Whoa there! You're asking questions faster than I can answer. Let's take a quick breather!"

// Instead of "Message too long"
"That's quite an essay! Could you break that into smaller questions?"
```

---

## Testing Your Customizations

After making changes:

1. **Restart the backend:** `Ctrl+C` then `npm start`
2. **Refresh the frontend:** `F5` in browser (hard refresh: `Ctrl+Shift+R`)
3. **Clear cache if needed:** Browser settings → Clear cache
4. **Test thoroughly:** Send test messages, check styling, test on mobile

---

## Common Customization Recipes

### Professional Corporate Look

```css
:root {
    --primary-color: #1e3a8a;
    --background-color: #f9fafb;
    --surface-color: #ffffff;
}

body {
    font-family: 'Georgia', serif;
}
```

### Modern Startup Vibe

```css
:root {
    --primary-color: #8b5cf6;
    --background-color: #faf5ff;
    --user-message-bg: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
}

body {
    font-family: 'Inter', sans-serif;
}
```

### Minimal Designer Style

```css
:root {
    --primary-color: #000000;
    --background-color: #ffffff;
    --surface-color: #ffffff;
    --text-primary: #000000;
    --text-secondary: #666666;
}

body {
    font-family: 'Helvetica Neue', sans-serif;
}

.chat-container {
    border: 1px solid #e5e5e5;
    border-radius: 0;
}
```

---

## Best Practices

1. **Keep it simple:** Don't over-customize. Less is more.
2. **Test on mobile:** Always check how changes look on phone.
3. **Maintain readability:** Ensure text has good contrast.
4. **Stay on-brand:** Match your personal website/portfolio style.
5. **Performance:** Don't add too many heavy images or animations.
6. **Accessibility:** Ensure colors meet WCAG standards.
7. **Version control:** Commit changes to git before major customizations.
8. **Document changes:** Keep notes on what you changed and why.

---

## Need Help?

If you're stuck on a customization:
1. Check browser console for errors (F12)
2. Validate your JSON at https://jsonlint.com/
3. Test CSS changes in browser DevTools first
4. Make one change at a time
5. Keep backups before major changes
6. Ask in GitHub discussions or Stack Overflow
