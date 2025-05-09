import React from 'react';

const ChatMessage = ({ message }) => {
  const { text, isUser } = message;
  
  // Dynamically assign classes based on who sent the message
  const containerClasses = isUser 
    ? "flex justify-end" 
    : "flex justify-start";
    
  const messageClasses = isUser 
    ? "bg-blue-500 text-white rounded-lg py-2 px-4 max-w-3/4"
    : "bg-white border border-gray-200 rounded-lg py-2 px-4 max-w-3/4";

  return (
    <div className={containerClasses}>
      <div className={messageClasses}>
        {/* Parse message text for line breaks */}
        {text.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i !== text.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMessage;