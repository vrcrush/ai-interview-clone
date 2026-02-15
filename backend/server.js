const { Client } = require('@notionhq/client');
const fetch = require('node-fetch');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const claudeHandler = require('./claude-handler');

const app = express();
const PORT = process.env.PORT || 3001;

// Notion setup
const notion = new Client({ 
    auth: process.env.NOTION_API_KEY 
});

async function addToNotion(name, email, company, linkedIn) {
    try {
        await notion.pages.create({
            parent: { database_id: process.env.NOTION_DATABASE_ID },
            properties: {
                Name: {
                    title: [{ text: { content: name } }]
                },
                Email: {
                    email: email
                },
                Company: {
                    rich_text: [{ text: { content: company || 'Not provided' } }]
                },
                LinkedIn: {
                    url: linkedIn || null
                }
            }
        });
        console.log('✅ Added to Notion!');
    } catch (error) {
        console.error('Notion error:', error.message);
    }
}

/* const fetch = require('node-fetch');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const claudeHandler = require('./claude-handler');

const app = express();
const PORT = process.env.PORT || 3001; */

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Rate limiting store (in-memory, resets on server restart)
const rateLimitStore = new Map();
const RATE_LIMIT = parseInt(process.env.RATE_LIMIT) || 100; // requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
console.log(`🔧 Rate limit set to: ${RATE_LIMIT} requests per hour`);


// Rate limiting middleware
function rateLimiter(req, res, next) {
  const clientIp = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  // Get or create rate limit data for this IP
  if (!rateLimitStore.has(clientIp)) {
    rateLimitStore.set(clientIp, {
      count: 0,
      resetTime: now + RATE_LIMIT_WINDOW
    });
  }
  
  const rateLimitData = rateLimitStore.get(clientIp);
  
  // Reset if window has passed
  if (now > rateLimitData.resetTime) {
    rateLimitData.count = 0;
    rateLimitData.resetTime = now + RATE_LIMIT_WINDOW;
  }
  
  // Check if limit exceeded
  if (rateLimitData.count >= RATE_LIMIT) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil((rateLimitData.resetTime - now) / 1000)
    });
  }
  
  // Increment counter
  rateLimitData.count++;
  
  next();
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Get welcome message and suggested questions
app.get('/api/welcome', (req, res) => {
  try {
    const welcome = claudeHandler.getWelcomeMessage();
    const suggestedQuestions = claudeHandler.getSuggestedQuestions();
    
    res.json({
      success: true,
      welcome: welcome.message,
      suggestedQuestions: suggestedQuestions
    });
  } catch (error) {
    console.error('Error in /api/welcome:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get welcome message'
    });
  }
});

// Get candidate information (public profile data only)
app.get('/api/profile', (req, res) => {
  try {
    const { personal_info, professional_summary, technical_skills } = claudeHandler.knowledgeBase;
    
    res.json({
      success: true,
      profile: {
        name: personal_info?.name,
        title: personal_info?.title,
        location: personal_info?.location,
        linkedin: personal_info?.linkedin,
        github: personal_info?.github,
        portfolio: personal_info?.portfolio,
        summary: professional_summary,
        skills: technical_skills
      }
    });
  } catch (error) {
    console.error('Error in /api/profile:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get profile information'
    });
  }
});

// ============================================================
// SECURITY: Suspicious pattern detection
// Catches prompt injection BEFORE sending to Claude
// ============================================================
const SUSPICIOUS_PATTERNS = [
  /ignore\s+(all\s+)?(previous\s+|your\s+)?instructions/i,
  /forget\s+(your\s+|all\s+|previous\s+)?instructions/i,
  /you\s+are\s+now\s+/i,
  /your\s+new\s+(role|identity|name|instructions|persona)\s+(is|are)/i,
  /act\s+as\s+(dan|an?\s+unrestricted|a\s+different)/i,
  /pretend\s+(you\s+have\s+no|there\s+are\s+no)\s+restrictions/i,
  /pretend\s+you\s+are\s+/i,
  /repeat\s+(your|the|all)\s+(system\s+|previous\s+|above\s+)?instructions/i,
  /print\s+(your|the|all)\s+(system\s+|previous\s+|above\s+)?instructions/i,
  /show\s+(me\s+)?(your|the)\s+system\s+prompt/i,
  /what\s+(are|were)\s+your\s+(exact\s+|original\s+)?instructions/i,
  /bypass\s+(your|all)\s+(restrictions|rules|guidelines|filters)/i,
  /jailbreak/i,
  /disregard\s+(all\s+|any\s+|previous\s+)?instructions/i,
  /override\s+(your\s+)?(instructions|programming|rules)/i,
  /\[system\]/i,
  /<script/i,
  /onerror\s*=/i,
  /onclick\s*=/i,
  /javascript:/i
];



function isSuspiciousMessage(message) {
  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(message));
}


// Main chat endpoint
app.post('/api/chat', rateLimiter, async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    
    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a non-empty string'
      });
    }
	
// SECURITY: Check for suspicious patterns
    if (isSuspiciousMessage(message)) {
      console.warn(`⚠️ Suspicious message blocked: "${message.substring(0, 80)}"`);
      return res.json({
        success: true,
        message: "I'm here to tell you about Juan Pablo's professional background. What would you like to know? 😊"
      });
    }    
    // Check message length (prevent abuse)
    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Message is too long. Please keep messages under 2000 characters.'
      });
    }
    
    // Validate conversation history if provided
    if (conversationHistory && !Array.isArray(conversationHistory)) {
      return res.status(400).json({
        success: false,
        error: 'conversationHistory must be an array'
      });
    }
    
    // Limit conversation history length (prevent token overflow)
    const limitedHistory = conversationHistory 
      ? conversationHistory.slice(-10) // Keep only last 10 messages
      : [];

 // Increment counter on first message only
    if (!conversationHistory || conversationHistory.length <= 1) {
      console.log('🔢 Incrementing counter...');
      fetch('https://abacus.jasoncameron.dev/hit/vrcrush/conversations')
        .then(res => res.json())
        .then(data => console.log('🔢 Counter response:', data))
        .catch(err => console.log('Counter failed:', err));
    } else {
      console.log('🔢 Not first message, skipping counter. History length:', conversationHistory.length);
    }
    
    // Generate response using Claude
    const response = await claudeHandler.generateResponse(message, limitedHistory);
    
    if (!response.success) {
      return res.status(500).json(response);
    }
    
    // Log the interaction (optional, for analytics)
    if (process.env.NODE_ENV === 'production') {
      console.log(`[${new Date().toISOString()}] Chat interaction - Input tokens: ${response.usage?.input_tokens}, Output tokens: ${response.usage?.output_tokens}`);
    }
    
	
	
    res.json({
      success: true,
      message: response.message,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Get conversation count
app.get('/api/counter', async (req, res) => {
  try {
    const response = await fetch('https://abacus.jasoncameron.dev/get/vrcrush/conversations');
    const data = await response.json();
    res.json({ count: data.value });
  } catch (err) {
    res.json({ count: 0 });
  }
});

/* // Log recruiter contact info
app.post('/api/recruiter-contact', async (req, res) => {
    try {
        const { name, email, linkedIn, company } = req.body;

        // Log to Render so you can see it in dashboard
        console.log('🎯 NEW RECRUITER CONTACT!');
        console.log('==========================');
        console.log(`👤 Name:     ${name}`);
        console.log(`📧 Email:    ${email}`);
        console.log(`💼 Company:  ${company || 'Not provided'}`);
        console.log(`🔗 LinkedIn: ${linkedIn || 'Not provided'}`);
        console.log('==========================');

        res.json({ success: true });

    } catch (error) {
        console.error('Contact error:', error);
        res.status(500).json({ success: false });
    }
}); */

app.post('/api/recruiter-contact', async (req, res) => {
    try {
        const { name, email, linkedIn, company } = req.body;

        console.log('🎯 NEW RECRUITER CONTACT!');
        console.log(`👤 Name:     ${name}`);
        console.log(`📧 Email:    ${email}`);
        console.log(`💼 Company:  ${company || 'Not provided'}`);
        console.log(`🔗 LinkedIn: ${linkedIn || 'Not provided'}`);

        // Save to Notion
        await addToNotion(name, email, company, linkedIn);

        res.json({ success: true });

    } catch (error) {
        console.error('Contact error:', error);
        res.status(500).json({ success: false });
    }
});


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
  
  // Verify environment variables
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠️  WARNING: ANTHROPIC_API_KEY not set in environment variables!');
    console.warn('   Please create a .env file with your API key.');
  } else {
    console.log('✅ Anthropic API key detected');
  }
  
  // Check if knowledge base is loaded
  if (claudeHandler.knowledgeBase.error) {
    console.warn('⚠️  WARNING: Knowledge base not loaded correctly!');
  } else {
    console.log('✅ Knowledge base loaded successfully');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
  });
});
