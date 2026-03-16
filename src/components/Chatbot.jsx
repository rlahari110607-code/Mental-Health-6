import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import './Chatbot.css';

const MOCK_RESPONSES = [
  { keywords: ['hello', 'hi', 'hey'], response: "Hello! I'm your MindCare assistant. How are you feeling today?" },
  { keywords: ['sad', 'down', 'depressed', 'bad'], response: "I'm so sorry you're feeling this way. Have you tried our Mood Tracker or Stress Relief exercises? Remember, it's okay to not be okay." },
  { keywords: ['anxious', 'stress', 'panic', 'overwhelmed'], response: "Take a deep breath. I recommend trying the Guided Breathing exercise in the Relief section to help calm your nervous system." },
  { keywords: ['happy', 'good', 'great', 'joy'], response: "That's wonderful to hear! Logging these good moments in the Mood Tracker can help you spot positive trends." },
  { keywords: ['help', 'emergency', 'suicide', 'hurt'], response: "If you're in immediate danger or experiencing a crisis, please visit the Emergency section immediately to contact professional helplines. You are not alone." },
  { keywords: ['default'], response: "I hear you. If you need more specific guidance, try exploring our Educational Hub or joining the Community Forum." }
];

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm here to listen and guide you through the MindCare platform. How can I help?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');

    // Simulate thinking delay
    setTimeout(() => {
      const lowerInput = userMessage.toLowerCase();
      let botResponse = MOCK_RESPONSES.find(r => r.keywords.some(kw => lowerInput.includes(kw)))?.response;
      
      if (!botResponse) {
        botResponse = MOCK_RESPONSES.find(r => r.keywords.includes('default')).response;
      }

      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <motion.div 
      className="chat-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel chat-wrapper">
        <div className="chat-header">
          <Bot size={28} className="chatbot-icon" />
          <div>
            <h2>MindCare Support Bot</h2>
            <p>Always here to listen.</p>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx}
              className={`message-bubble ${msg.sender}`}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="message-avatar">
                {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className="message-text">
                {msg.text}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Type your message here..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-send">
            <Send size={18} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Chatbot;
