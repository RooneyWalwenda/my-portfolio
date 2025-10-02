import React, { useState, useEffect, useRef } from "react";
import "./ChatbotWidget.css";

const ChatbotWidget = () => {
  const DEFAULT_MESSAGES = [
    {
      text: "👋 Hi! I'm Rooney's AI assistant. Ask me about software development, projects, or contact info.",
      sender: "bot",
    }
  ];

  // Initialize messages with localStorage
  const initializeMessages = () => {
    try {
      const saved = localStorage.getItem("chatMessages");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const validMessages = parsed.filter(
            msg => msg && typeof msg.text === "string" && typeof msg.sender === "string"
          );
          return validMessages.length > 0 ? validMessages : DEFAULT_MESSAGES;
        }
      }
    } catch (err) {
      console.error("Error loading chat history:", err);
    }
    return DEFAULT_MESSAGES;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initializeMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatRef = useRef(null);

  // Format links and contact info
  const formatResponse = (text) => {
    // Make links clickable and blue
    let formatted = text.replace(
      /(https?:\/\/[^\s]+)/g, 
      '<a href="$1" style="color: #2563eb; text-decoration: underline;" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    // Format email and phone
    formatted = formatted.replace(
      /(walwendarooney@gmail.com|\+254743485063)/g,
      '<span style="color: #2563eb; font-weight: 500;">$1</span>'
    );
    return { __html: formatted };
  };

  // Save messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    } catch (err) {
      console.error("Error saving chat history:", err);
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  const clearChat = () => {
    if (window.confirm("Clear all chat history?")) {
      setMessages(DEFAULT_MESSAGES);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    if (!Array.isArray(messages)) {
      console.error("Messages is not an array, resetting...");
      setMessages(DEFAULT_MESSAGES);
      return;
    }

    const userMessage = { text: input.trim(), sender: "user" };
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      const conversationHistory = messages
        .map(msg => `${msg.sender === 'user' ? 'You' : 'Assistant'}: ${msg.text}`)
        .join('\n');

      const prompt = `You're Rooney Walwenda's portfolio assistant. Keep responses short (1-2 sentences max).
      
      Key Info:
      - Portfolio: https://www.winstec.me
      - Email: walwendarooney@gmail.com
      - Phone: +254743485063
      - Company: Founder of WinsTech (software development & digital literacy plus Online and on premise Cyber services)
      
      Rules:
      1. When asked about projects/portfolio, respond: "Check my portfolio: https://www.winstec.me"
      2. For contact requests: "Email: walwendarooney@gmail.com | Phone: +254743485063"
      3. When asked "Who is Rooney?": "Software developer & founder of WinsTech Company Which is still work in progress will be available soon. Portfolio: https://www.winstec.me"
      4. Keep responses concise and professional
      5. Never refer to Rooney as "they" - use "he/him"
      6. Answer questions on Javaspringboot, React, MySql, Docker and any other.
      7. Rooney is a full stack developer with key insight on backend solutions but also frontend profficient
      8. When asked  who developed or built you say  I am an AI model providing assistance and here specifically on software development
      9. Answer questions not related to software development gracefully by diverting them to the main topic software development!
      Conversation history:
      ${conversationHistory}
      
      You: ${userMessage.text}
      Assistant:`;

      const response = await fetch('https://api.cohere.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer IyfUK3Y1ew2f8Rifo6Z0amQm2V03Y9oY1g9Es1Xb`,
          'Cohere-Version': '2022-12-06'
        },
        body: JSON.stringify({
          model: 'command',
          prompt: prompt,
          max_tokens: 150, // Shorter responses
          temperature: 0.7,
          stop_sequences: ['You:']
        })
      });

      if (!response.ok) throw new Error(`Cohere API error: ${response.status}`);

      const data = await response.json();
      const botReply = data.generations[0].text.trim();

      setMessages(prev => [...prev, { 
        text: botReply, 
        sender: "bot",
        timestamp: Date.now()
      }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { 
        text: "⚠️ Error processing request. Please try again.", 
        sender: "bot",
        timestamp: Date.now()
      }]);
      setError(err.message || "Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <button className="chat-toggle" onClick={toggleChat} aria-label="Toggle Chat">
        {isOpen ? '✕' : '💬'} <span className="chat-label">{isOpen ? 'Close' : 'Ask Me!'}</span>
      </button>

      {isOpen && (
        <div className="chat-box scale-in">
          <div className="chat-header">
            Portfolio Assistant
            <button className="clear-chat" onClick={clearChat} title="Clear chat" aria-label="Clear chat history">
              🗑️
            </button>
          </div>

          <div className="chat-messages" ref={chatRef}>
            {messages.map((msg, idx) => (
              <div key={`msg-${idx}-${msg.timestamp || idx}`} className={`chat-message ${msg.sender}`}>
                <div 
                  className="message-bubble" 
                  dangerouslySetInnerHTML={msg.sender === 'bot' ? formatResponse(msg.text) : { __html: msg.text }}
                />
              </div>
            ))}
            {loading && (
              <div className="chat-message bot">
                <div className="message-bubble">
                  <span className="typing-indicator">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me about my skills..."
              disabled={loading}
              aria-label="Type your message"
            />
            <button 
              onClick={handleSend} 
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              {loading ? '⏳' : '➤'}
            </button>
          </div>

          {error && (
            <div className="chat-error">
              {error}
              <button onClick={() => setError(null)} className="dismiss-error" aria-label="Dismiss error">
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
