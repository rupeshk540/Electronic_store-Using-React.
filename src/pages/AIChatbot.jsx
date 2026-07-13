import React, { useState, useEffect, useRef } from 'react';
import '../customcss/AIChatbot.css';
import { sendMessageToAI } from '../services/AiChatService';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

    const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') return;

    // 1. Add user message
    const userMessage = {
        id: Date.now(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    const currentMessage = inputValue;
    setInputValue('');
    
    // 2. Call backend (THIS PART YOU ASKED)
    try {
        const response = await sendMessageToAI(currentMessage);

        const aiMessage = {
        id: Date.now() + 1,
        text: response.reply,
        sender: 'ai',
        timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
        const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I couldn't connect to the server.",
        sender: 'ai',
        timestamp: new Date()
        };

        setMessages(prev => [...prev, errorMessage]);

    
    }
    };
    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          className="chat-toggle-btn"
          onClick={toggleChat}
          aria-label="Open AI Chat"
        >
          <span className="sparkle">✨</span>
          <span className="btn-text">Ask AI</span>
        </button>
      )}

      {/* Chat Window */}
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="header-content">
              <div className="ai-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <div className="header-text">
                <h3>AI Shopping Assistant</h3>
                <span className="status-indicator">
                  <span className="status-dot"></span>
                  Online
                </span>
              </div>
            </div>
            <button 
              className="close-btn" 
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div 
                key={message.id} 
                className={`message ${message.sender}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {message.sender === 'ai' && (
                  <div className="message-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                  </div>
                )}
                <div className="message-content">
                  <div className="message-bubble">
                    {message.text.split("\n").map((line, index) => {
                        const urlMatch = line.match(/(https?:\/\/[^\s]+)/);

                        if (urlMatch) {
                        const url = urlMatch[0];
                        // const textBeforeUrl = line.replace(url, "");

                        return (
                            <React.Fragment key={index}>
                            
                            <a href={url} target="_blank" rel="noreferrer">
                                View Product
                            </a>
                            <br />
                            </React.Fragment>
                        );
                        }

                        return (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                        );
                    })}
                    </div>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chatbot-input-container">
            <form onSubmit={handleSendMessage} className="chatbot-input-form">
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button 
                type="submit" 
                className="send-btn"
                disabled={inputValue.trim() === '' }
                aria-label="Send message"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
            <div className="input-footer">
              <span className="powered-by">Powered by AI</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatBot;