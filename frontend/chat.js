// Configuration
// Auto-detect environment
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001'  // Local development
    : 'https://ai-interview-clone-backend.onrender.com';  // Production
console.log('🌍 Environment:', window.location.hostname === 'localhost' ? 'LOCAL' : 'PRODUCTION');
console.log('🔗 API URL:', API_URL);

//const API_URL = 'http://localhost:3001'; // Change this to your deployed backend URL
//const API_URL = 'https://ai-interview-clone-backend.onrender.com';
const MAX_MESSAGE_LENGTH = 2000;
const AUTO_SCROLL_THRESHOLD = 100; // pixels from bottom


// State
let conversationHistory = [];
let isWaitingForResponse = false;

// Load conversation counter
async function loadCounter() {
  try {
    const response = await fetch(`${API_URL}/api/counter`);
    const data = await response.json();
    const el = document.getElementById('counterNumber');
    if (el) el.textContent = data.count;
  } catch (err) {
    console.log('Counter failed:', err);
  }
}

loadCounter();

// DOM Elements
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const characterCount = document.getElementById('characterCount');
const suggestedQuestions = document.getElementById('suggestedQuestions');
const questionsGrid = document.getElementById('questionsGrid');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorToast = document.getElementById('errorToast');
const errorMessage = document.getElementById('errorMessage');
const errorClose = document.getElementById('errorClose');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeChat();
    setupEventListeners();
});

/**
 * Initialize the chat interface
 */
async function initializeChat() {
    try {
        // Fetch welcome message and suggested questions
        const response = await fetch(`${API_URL}/api/welcome`);
        
        if (!response.ok) {
            throw new Error('Failed to load welcome message');
        }
        
        const data = await response.json();
        
        // Display welcome message
        if (data.welcome) {
            addMessage('assistant', data.welcome);
        }
        
        // Display suggested questions
        if (data.suggestedQuestions && data.suggestedQuestions.length > 0) {
            renderSuggestedQuestions(data.suggestedQuestions);
        }
        
    } catch (error) {
        console.error('Initialization error:', error);
        showError('Failed to initialize chat. Please refresh the page.');
        // Add a fallback welcome message
        addMessage('assistant', "Hi! I'm having trouble connecting to the server. Please make sure the backend is running and try refreshing the page.");
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Send button click
    sendButton.addEventListener('click', handleSendMessage);
    
    // Enter key to send (Shift+Enter for new line)
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    
    // Character count update
    messageInput.addEventListener('input', () => {
        const length = messageInput.value.length;
        characterCount.textContent = `${length} / ${MAX_MESSAGE_LENGTH}`;
        
        // Auto-resize textarea
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
    });
    
    // Error toast close button
    errorClose.addEventListener('click', hideError);
    
    // Auto-hide error after 5 seconds
    let errorTimeout;
    const showErrorOriginal = showError;
    showError = (message) => {
        showErrorOriginal(message);
        clearTimeout(errorTimeout);
        errorTimeout = setTimeout(hideError, 5000);
    };
}

/**
 * Render suggested questions
 */
function renderSuggestedQuestions(questions) {
    questionsGrid.innerHTML = '';
    
    questions.forEach(question => {
        const button = document.createElement('button');
        button.className = 'question-button';
        button.textContent = question;
        button.addEventListener('click', () => {
            messageInput.value = question;
            handleSendMessage();
        });
        questionsGrid.appendChild(button);
    });
}

/**
 * Handle sending a message
 */
async function handleSendMessage() {
    const message = messageInput.value.trim();
    
    // Validate message
    if (!message) {
        return;
    }
    
    if (message.length > MAX_MESSAGE_LENGTH) {
        showError(`Message is too long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.`);
        return;
    }
    
    if (isWaitingForResponse) {
        showError('Please wait for the current response to complete.');
        return;
    }
    
    // Add user message to UI
    addMessage('user', message);
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    characterCount.textContent = `0 / ${MAX_MESSAGE_LENGTH}`;
    
    // Hide suggested questions after first message
    if (!suggestedQuestions.classList.contains('hidden')) {
        suggestedQuestions.classList.add('hidden');
    }
    
    // Add message to conversation history
    conversationHistory.push({
        role: 'user',
        content: message
    });
    
    // Show typing indicator
    const typingIndicatorId = addTypingIndicator();

	// Show warning if backend is slow (cold start)
    const timeoutWarning = setTimeout(() => {
        const typingEl = document.getElementById(typingIndicatorId);
        if (typingEl) {
            typingEl.querySelector('.typing-text') 
                ? typingEl.querySelector('.typing-text').textContent = '⏳ Still waking up, almost ready...'
                : typingEl.innerHTML = '<div class="message-content">⏳ Still waking up, almost ready...</div>';
        }
    }, 10000);
    
    // Disable input while waiting
    setInputDisabled(true);
    isWaitingForResponse = true;
    
    try {
        // Send message to API
        const response = await fetch(`${API_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                conversationHistory: conversationHistory
            })
        });
        
        // Remove typing indicator
        removeTypingIndicator(typingIndicatorId);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Server error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || 'Failed to get response');
        }
        
        // Add assistant message to UI
        addMessage('assistant', data.message);
		checkShowContactPopup(); // ← Add this line
        //scrollToBottomIfNeeded(); // ← should be right after this
		// Force scroll on new message
setTimeout(() => {
    messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
    });
}, 300);
setTimeout(() => {
    messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
    });
}, 900);

        // Add to conversation history
        conversationHistory.push({
            role: 'assistant',
            content: data.message
        });
        
    } catch (error) {
		clearTimeout(timeoutWarning);
        console.error('Error sending message:', error);
        removeTypingIndicator(typingIndicatorId);
        
        // Add error message to chat
        addMessage('assistant', "I apologize, but I'm having trouble responding right now. Please try again in a moment. If the problem persists, please contact me directly.");
        
        showError(error.message || 'Failed to send message. Please try again.');
        
    } finally {
		 clearTimeout(timeoutWarning);
        setInputDisabled(false);
        isWaitingForResponse = false;
        messageInput.focus();
    }
}

/**
 * Add a message to the chat
 */
function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? 'You' : 'JP AI';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messageText = document.createElement('p');
    messageText.className = 'message-text';
    messageText.textContent = content;
    
    messageContent.appendChild(messageText);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom if user is near bottom
    scrollToBottomIfNeeded();
}

/**
 * Add typing indicator
 */
function addTypingIndicator() {
    const id = 'typing-' + Date.now();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    messageDiv.id = id;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'JP AI';
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message-content typing-indicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        typingDiv.appendChild(dot);
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(typingDiv);
    messagesContainer.appendChild(messageDiv);
    
    scrollToBottomIfNeeded();
    
    return id;
}

/**
 * Remove typing indicator
 */
function removeTypingIndicator(id) {
    const indicator = document.getElementById(id);
    if (indicator) {
        indicator.remove();
    }
}

/**
 * Scroll to bottom if user is near bottom
 */
function scrollToBottomIfNeeded() {
    const isNearBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight < AUTO_SCROLL_THRESHOLD;
    
    if (isNearBottom) {
        // Smooth scroll with mobile delay
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });

        // Extra timeout for mobile keyboard viewport changes
        setTimeout(() => {
            messagesContainer.scrollTo({
                top: messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
        }, 150);
    }
}

/**
 * Enable/disable input
 */
function setInputDisabled(disabled) {
    messageInput.disabled = disabled;
    sendButton.disabled = disabled;
}

/**
 * Show error toast
 */
function showError(message) {
    errorMessage.textContent = message;
    errorToast.classList.add('visible');
}

/**
 * Hide error toast
 */
function hideError() {
    errorToast.classList.remove('visible');
}

/**
 * Show loading indicator
 */
function showLoading() {
    loadingIndicator.classList.add('visible');
}

/**
 * Hide loading indicator
 */
function hideLoading() {
    loadingIndicator.classList.remove('visible');
}

//New code

// Export conversation functionality
function setupExportButton() {
    const exportBtn = document.getElementById('exportChat');
    if (!exportBtn) {
        console.warn('Export button not found');
        return;
    }
    
    exportBtn.addEventListener('click', () => {
        console.log('Export button clicked!'); // Debug log
        
        // Check if there are messages
        if (conversationHistory.length === 0) {
            alert('No conversation to export yet. Start chatting first!');
            return;
        }
        
        // Create formatted text
        let exportText = `AI Interview Clone Conversation\n`;
        exportText += `Date: ${new Date().toLocaleString()}\n`;
        exportText += `Candidate: Pablo Bolzon\n`; // Change to your name
        exportText += `\n${'='.repeat(60)}\n\n`;
        
        conversationHistory.forEach((msg, index) => {
            const speaker = msg.role === 'user' ? 'Recruiter' : 'JP AI';
            exportText += `${speaker}:\n${msg.content}\n\n`;
        });
        
        exportText += `${'='.repeat(60)}\n`;
        exportText += `End of conversation\n`;
        exportText += `Generated by AI Interview Clone\n`;
        
        // Create and download file
        try {
            const blob = new Blob([exportText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `JP-ai-interview-${Date.now()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log('Export successful!'); // Debug log
            
            // Show success message
            alert('Conversation exported successfully!');
        } catch (error) {
            console.error('Export error:', error);
            alert('Failed to export conversation. Check console for details.');
        }
    });
}

// Call setup function when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupExportButton);
} else {
    setupExportButton();
}

//end new code

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addMessage,
        handleSendMessage,
        showError,
        hideError
    };
}

// ============================================================
// Recruiter contact popup after 3+ messages
// ============================================================
let popupShown = false;

function checkShowContactPopup() {
    // Count user messages only
    const userMessages = conversationHistory.filter(m => m.role === 'user').length;
    
    if (userMessages >= 3 && !popupShown) {
        popupShown = true;
        // Small delay so it doesn't interrupt the response
        setTimeout(() => {
            document.getElementById('contactPopup').classList.remove('hidden');
        }, 1500);
    }
}

// Submit contact info
function setupContactPopup() {
    const submitBtn = document.getElementById('submitContactBtn');
    const closeBtn = document.getElementById('closeContactPopup');
    const skipBtn = document.getElementById('skipContactBtn');

    if (!submitBtn || !closeBtn || !skipBtn) {
        console.warn('Contact popup elements not found');
        return;
    }

    submitBtn.addEventListener('click', async () => {
        const name = document.getElementById('recruiterName').value.trim();
        const email = document.getElementById('recruiterEmail').value.trim();
        const linkedIn = document.getElementById('recruiterLinkedIn').value.trim();
        const company = document.getElementById('recruiterCompany').value.trim();

        if (!name || !email) {
            alert('Please fill in your name and email!');
            return;
        }

        submitBtn.textContent = '⏳ Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(`${API_URL}/api/recruiter-contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, linkedIn, company })
            });

            const data = await response.json();

            if (data.success) {
                submitBtn.textContent = '✅ Sent!';
                setTimeout(() => {
                    document.getElementById('contactPopup').classList.add('hidden');
                }, 1500);
            } else {
                submitBtn.textContent = 'Send My Details 🚀';
                submitBtn.disabled = false;
                alert('Something went wrong. Please try again!');
            }
        } catch (error) {
            submitBtn.textContent = 'Send My Details 🚀';
            submitBtn.disabled = false;
            alert('Something went wrong. Please try again!');
        }
    });

    closeBtn.addEventListener('click', () => {
        document.getElementById('contactPopup').classList.add('hidden');
    });

    skipBtn.addEventListener('click', () => {
        document.getElementById('contactPopup').classList.add('hidden');
    });
}

// Call when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupContactPopup);
} else {
    setupContactPopup();
}
