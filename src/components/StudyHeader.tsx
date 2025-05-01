
import React from 'react';
import { BookOpenIcon } from 'lucide-react';

const StudyHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-study-primary to-study-secondary rounded-lg p-2">
            <BookOpenIcon className="text-white" size={24} />
          </div>
          <h1 className="font-bold text-xl sm:text-2xl text-gray-800">StudyBuddy AI</h1>
        </div>
        
        <div className="text-sm text-gray-600 hidden md:block">
          Your AI-powered study assistant
        </div>
      </div>
    </header>
  );
};

export default StudyHeader;
