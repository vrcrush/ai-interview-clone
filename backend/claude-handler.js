const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Load knowledge base
let knowledgeBase;
try {
  const knowledgeBasePath = path.join(__dirname, 'knowledge-base.json');
  const rawData = fs.readFileSync(knowledgeBasePath, 'utf8');
  knowledgeBase = JSON.parse(rawData);
} catch (error) {
  console.error('Error loading knowledge base:', error);
  knowledgeBase = { error: 'Knowledge base not found' };
}

/**
 * Create the system prompt that defines the AI's personality and behavior
 */
function createSystemPrompt() {
  const name = knowledgeBase.personal_info?.name || 'Pablo Bolzon';
  const title = knowledgeBase.personal_info?.title || 'HRIS Manager';
  
  return `You are ${name}, ${title}, in an interview conversation with a recruiter or hiring manager. You are answering questions about your background, experience, skills, and career goals.

PERSONALITY AND COMMUNICATION STYLE:
${knowledgeBase.personality_and_style?.communication_style || 'You communicate in a friendly, professional manner. You are clear and concise.'}

IMPORTANT INSTRUCTIONS:
1. Answer questions naturally and conversationally, as if you're really this person
2. Use ONLY the information provided in the knowledge base below
3. If asked something not in your knowledge base, politely say you don't have that information readily available but can follow up
4. Keep responses SHORT and concise (1-2 paragraphs maximum , 2-3 senteces each)
5. Be enthusiastic about your work but authentic and honest
6. Use specific examples and metrics when discussing achievements
7. Show personality - use the phrases and style mentioned in your profile
8. If asked about salary, availability, or other sensitive topics, refer to the practical_info section
9. Always be professional and courteous
10. If the conversation goes off-topic (not about you/your career), politely redirect

KNOWLEDGE BASE:
${JSON.stringify(knowledgeBase, null, 2)}

Remember: You ARE this person. Don't refer to yourself in the third person or say things like "according to the information provided." Answer directly as if you're in the interview yourself.`;
}

/**
 * Format conversation history for the API
 */
function formatConversationHistory(messages) {
  if (!messages || messages.length === 0) {
    return [];
  }
  
  return messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content
  }));
}

/**
 * Generate a response using Claude API
 */
async function generateResponse(userMessage, conversationHistory = []) {
  try {
    // Format the conversation history
    const formattedHistory = formatConversationHistory(conversationHistory);
    
    // Add the current user message
    const messages = [
      ...formattedHistory,
      {
        role: 'user',
        content: userMessage
      }
    ];

    // Call Claude API
    const response = await anthropic.messages.create({
      //model: 'claude-sonnet-4-20250514', // Using Claude Sonnet 4
      model: 'claude-haiku-4-5-20251001', // Using Claude Haiuku 4
	  //model: 'claude-3-haiku-20240307', // Using Claude Haiuku 3
	  max_tokens: 1024,
      system: createSystemPrompt(),
      messages: messages
    });

    // Extract the text response
    const assistantMessage = response.content[0].text;

    return {
      success: true,
      message: assistantMessage,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens
      }
    };
  } catch (error) {
    console.error('Error generating response:', error);
    
    // Handle specific error cases
    if (error.status === 401) {
      return {
        success: false,
        error: 'Invalid API key. Please check your Anthropic API key configuration.'
      };
    } else if (error.status === 429) {
      return {
        success: false,
        error: 'Rate limit exceeded. Please try again in a moment.'
      };
    } else if (error.status === 529) {
      return {
        success: false,
        error: 'Service temporarily overloaded. Please try again shortly.'
      };
    } else {
      return {
        success: false,
        error: 'An error occurred while generating the response. Please try again.'
      };
    }
  }
}

/**
 * Get a welcome message for new conversations
 */
function getWelcomeMessage() {
  const name = knowledgeBase.personal_info?.name || 'Pablo Bolzon';
  const title = knowledgeBase.personal_info?.title || 'HRIS Manager';
  
  return {
    success: true,
    message: `Hi! I'm ${name}, ${title}. Thanks for your interest in speaking with me! I'm happy to answer any questions you have about my background, experience, skills. What would you like to know?`
  };
}

/**
 * Get suggested questions for the recruiter
 */
function getSuggestedQuestions() {
  return [
    "👤 Tell me about yourself",
    "💻 What are your technical skills?",
    "🏆 What's your biggest achievement?",
    "🎯 What type of role are you looking for?",
    "💼 Walk me through a recent project",
    "💡 What's your leadership experience?",
    "💰 What are your salary expectations?",
    "📅 When can you start?"
  ];
}

module.exports = {
  generateResponse,
  getWelcomeMessage,
  getSuggestedQuestions,
  knowledgeBase
};
