
import React from 'react';

const StudyFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto p-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} StudyBuddy AI. All rights reserved.</p>
        <p className="mt-1">Powered by AI to help students learn more effectively.</p>
      </div>
    </footer>
  );
};

export default StudyFooter;
