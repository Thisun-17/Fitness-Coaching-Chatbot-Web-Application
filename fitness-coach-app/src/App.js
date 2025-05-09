import React from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[600px] flex flex-col">
        <header className="text-center mb-4">
          <h1 className="text-3xl font-bold text-blue-700">FitCoach AI</h1>
          <p className="text-gray-600">Your personal fitness assistant</p>
        </header>
        
        <main className="flex-1">
          <ChatInterface />
        </main>
        
        <footer className="text-center mt-4 text-sm text-gray-500">
          © {new Date().getFullYear()} FitCoach AI - Powered by React, Node.js & PHP
        </footer>
      </div>
    </div>
  );
}

export default App;