# Testing Guide

## Quick Test Commands

### Test Backend Health
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{"status":"healthy","timestamp":"2024-02-07T..."}
```

### Test Welcome Endpoint
```bash
curl http://localhost:3001/api/welcome
```

Expected response:
```json
{
  "success": true,
  "welcome": "Hi! I'm [Your Name]...",
  "suggestedQuestions": [...]
}
```

### Test Chat Endpoint
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about yourself"}'
```

Expected response:
```json
{
  "success": true,
  "message": "I am a [Your Title]...",
  "timestamp": "2024-02-07T..."
}
```

## Manual Testing Checklist

### Basic Functionality
- [ ] Page loads without errors
- [ ] Welcome message displays correctly
- [ ] Suggested questions appear and are clickable
- [ ] Can type in message input
- [ ] Character counter updates as you type
- [ ] Send button is enabled when there's text
- [ ] Messages send when clicking send button
- [ ] Messages send when pressing Enter
- [ ] Shift+Enter creates new line
- [ ] AI response appears after a few seconds
- [ ] Typing indicator shows while waiting
- [ ] Can send multiple messages in sequence
- [ ] Conversation flows naturally

### UI/UX Testing
- [ ] Interface is visually appealing
- [ ] Text is readable
- [ ] Buttons are clickable
- [ ] Hover states work
- [ ] Animations are smooth
- [ ] No layout shifts
- [ ] Scrolling works properly
- [ ] Auto-scrolls to new messages

### Content Quality
Test these questions and verify responses:

**Introduction:**
- [ ] "Tell me about yourself"
- [ ] "What's your background?"

**Technical Skills:**
- [ ] "What are your technical skills?"
- [ ] "What programming languages do you know?"
- [ ] "What's your experience with [specific technology]?"

**Experience:**
- [ ] "Tell me about your work experience"
- [ ] "What was your role at [Company]?"
- [ ] "What's your biggest achievement?"

**Projects:**
- [ ] "Tell me about a challenging project"
- [ ] "What projects are you most proud of?"

**Career Goals:**
- [ ] "What are you looking for in your next role?"
- [ ] "What type of company interests you?"
- [ ] "What are your career goals?"

**Practical:**
- [ ] "What's your salary expectation?"
- [ ] "When can you start?"
- [ ] "Are you open to remote work?"

**Follow-up Questions:**
- [ ] Test follow-up questions based on previous answers
- [ ] Verify context is maintained

### Edge Cases

**Input Validation:**
- [ ] Try to send empty message (should be blocked)
- [ ] Send very long message (2000 characters)
- [ ] Send special characters: <>&"'
- [ ] Send code snippets
- [ ] Send URLs
- [ ] Send emojis 😀

**Error Handling:**
- [ ] Stop backend and try to send message
- [ ] Send message with invalid API key
- [ ] Spam send button quickly
- [ ] Refresh page mid-conversation

**Performance:**
- [ ] Send 10 messages rapidly
- [ ] Load page with slow network (throttle in DevTools)
- [ ] Leave page idle for 5 minutes, then send message

### Cross-Browser Testing
Test on:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (Mac)
- [ ] Edge
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

### Mobile Testing

**Responsive Design:**
- [ ] Open on phone
- [ ] Layout adjusts properly
- [ ] Text is readable
- [ ] Buttons are tap-able
- [ ] No horizontal scrolling
- [ ] Input field visible when keyboard opens

**Touch Interactions:**
- [ ] Can tap suggested questions
- [ ] Can tap send button
- [ ] Can scroll conversation
- [ ] Keyboard appears when tapping input
- [ ] Keyboard doesn't cover input

### Accessibility Testing

**Keyboard Navigation:**
- [ ] Can tab to input field
- [ ] Can tab to send button
- [ ] Can use Enter to send
- [ ] Can use Shift+Enter for new line

**Screen Reader:**
- [ ] Page structure makes sense
- [ ] Messages are announced
- [ ] Buttons have proper labels

**Visual:**
- [ ] Text has sufficient contrast
- [ ] Font size is readable
- [ ] Colors are not the only indicator

### Security Testing
- [ ] API key is not exposed in frontend code
- [ ] .env file is in .gitignore
- [ ] No sensitive data in knowledge base is exposed
- [ ] Rate limiting works
- [ ] CORS is properly configured

## Automated Testing (Optional)

If you want to add automated tests, here's a basic structure:

### Backend Tests (using Jest)

```javascript
// backend/tests/server.test.js
const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  test('GET /health returns 200', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('POST /api/chat returns response', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ message: 'Hello' });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

### Frontend Tests (using Playwright)

```javascript
// frontend/tests/chat.test.js
const { test, expect } = require('@playwright/test');

test('chat interface loads', async ({ page }) => {
  await page.goto('http://localhost:8000');
  await expect(page.locator('h1')).toContainText('Interview');
});

test('can send message', async ({ page }) => {
  await page.goto('http://localhost:8000');
  await page.fill('#messageInput', 'Hello');
  await page.click('#sendButton');
  await expect(page.locator('.message.user')).toContainText('Hello');
});
```

## Performance Testing

### Load Testing
Use tools like Apache Bench or Artillery:

```bash
# Test 100 requests with 10 concurrent
ab -n 100 -c 10 http://localhost:3001/health
```

### API Response Time
Monitor response times:
- Health endpoint: < 10ms
- Welcome endpoint: < 50ms
- Chat endpoint: 1-3 seconds (depends on Claude API)

## Bug Reporting Template

When you find a bug, document it:

```
**Bug Title:** [Brief description]

**Steps to Reproduce:**
1. [First step]
2. [Second step]
3. [...]

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots:**
[If applicable]

**Environment:**
- Browser: [Chrome 121, Firefox 122, etc.]
- OS: [Windows 10, macOS 14, etc.]
- Device: [Desktop, iPhone 15, etc.]

**Console Errors:**
[Any error messages]

**Additional Context:**
[Any other relevant information]
```

## Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] Knowledge base is complete and accurate
- [ ] API key is set in production environment
- [ ] Frontend API_URL points to production backend
- [ ] No console errors in browser
- [ ] Mobile testing complete
- [ ] Error handling works
- [ ] Rate limiting is appropriate
- [ ] CORS is configured for production domain
- [ ] Contact links in footer are correct
- [ ] Documentation is up to date

## Post-Deployment Testing

After deploying:

- [ ] Production URL loads
- [ ] Backend health check passes
- [ ] Can send and receive messages
- [ ] Test from different locations/networks
- [ ] Test on different devices
- [ ] Monitor logs for errors
- [ ] Check API usage in Anthropic console
- [ ] Verify rate limiting works in production

## Continuous Testing

Set up monitoring:
- Check uptime daily
- Review logs weekly
- Test chat monthly
- Update knowledge base as needed
- Monitor API costs
- Gather user feedback
