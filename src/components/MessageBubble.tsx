
import React from 'react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

const MessageBubble = ({ message, isUser, timestamp }: MessageBubbleProps) => {
  return (
    <div className={cn(
      "mb-4 max-w-[80%] animate-fade-in",
      isUser ? "ml-auto" : "mr-auto"
    )}>
      <div className={cn(
        "rounded-2xl p-4 shadow-sm",
        isUser 
          ? "bg-study-primary text-white rounded-br-none" 
          : "bg-white border border-gray-200 rounded-bl-none"
      )}>
        <p className="whitespace-pre-wrap">{message}</p>
      </div>
      <div className={cn(
        "text-xs mt-1 text-gray-500",
        isUser ? "text-right" : "text-left"
      )}>
        {timestamp}
      </div>
    </div>
  );
};

export default MessageBubble;
