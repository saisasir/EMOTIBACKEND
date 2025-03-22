
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white text-xl font-bold">AI</span>
        </div>
        <div>
          <h1 className="text-xl font-bold">Emotion-Driven AI</h1>
          <p className="text-xs text-gray-500">Automated Responses for Smarter Human Interaction</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center space-x-2">
        <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
          Real-time Processing
        </span>
        <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
          7 Emotions
        </span>
      </div>
    </header>
  );
};

export default Header;
