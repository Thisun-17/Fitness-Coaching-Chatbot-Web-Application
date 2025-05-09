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
    <div className="flex flex-col h-[600px] md:h-[650px]">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <h2 className="text-2xl font-bold">Fitness Coach</h2>
        <p className="text-blue-100 text-sm">Ask me anything about fitness, nutrition, or workouts</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {loading && (
          <div className="flex items-center space-x-2">
            <div className="rounded-full h-3 w-3 bg-blue-500 animate-pulse"></div>
            <div className="rounded-full h-3 w-3 bg-blue-500 animate-pulse delay-75"></div>
            <div className="rounded-full h-3 w-3 bg-blue-500 animate-pulse delay-150"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <UserInput onSendMessage={handleSendMessage} disabled={loading} />
    </div>
  );
};

export default ChatInterface;