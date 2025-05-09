import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import UserInput from './UserInput';
import { sendMessage } from '../services/chatService';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your fitness coach. How can I help you today?", isUser: false }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    
    // Add user message to chat
    const userMessage = { id: messages.length + 1, text, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    // Show loading state
    setLoading(true);
    
    try {
      // Send message to backend
      const response = await sendMessage(text);
      
      // Add response to chat
      const botMessage = { id: messages.length + 2, text: response.message, isUser: false };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        id: messages.length + 2, 
        text: "Sorry, I'm having trouble responding right now. Please try again.", 
        isUser: false 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-md">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">Fitness Coach</h2>
        <p className="text-sm">Ask me anything about fitness, nutrition, or workouts</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {loading && (
          <div className="flex justify-center">
            <div className="animate-pulse text-gray-500">Coach is typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <UserInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
};

export default ChatInterface;