import React, { useState } from 'react';

const UserInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form 
      className="border-t border-gray-200 p-4 bg-white rounded-b-lg" 
      onSubmit={handleSubmit}
    >
      <div className="flex items-center">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask about workouts, nutrition, or fitness goals..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          disabled={disabled || !message.trim()}
        >
          Send
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Try asking: "Can you suggest a workout for beginners?" or "How much protein should I eat daily?"
      </div>
    </form>
  );
};

export default UserInput;