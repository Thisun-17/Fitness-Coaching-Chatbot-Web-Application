import React from 'react';

const ChatMessage = ({ message }) => {
  const { text, isUser } = message;
  
  // Dynamically assign classes based on who sent the message
  const containerClasses = isUser 
    ? "flex justify-end" 
    : "flex justify-start";
    
  const messageClasses = isUser 
    ? "bg-blue-500 text-white rounded-2xl rounded-tr-sm py-3 px-4 max-w-[85%] shadow-md"
    : "bg-white text-gray-700 rounded-2xl rounded-tl-sm py-3 px-4 max-w-[85%] shadow-md border border-gray-100";

  return (
    <div className={containerClasses}>
      {!isUser && (
        <div className="flex-shrink-0 mr-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
            FC
          </div>
        </div>
      )}
      <div className={messageClasses}>
        <div className="text-sm md:text-base leading-relaxed">
          {/* Parse message text for line breaks */}
          {text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i !== text.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
      {isUser && (
        <div className="flex-shrink-0 ml-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;