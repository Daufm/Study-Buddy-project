
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { SendIcon } from 'lucide-react';
import { toast } from 'sonner';
import MessageBubble from './MessageBubble';
import { cn } from '@/lib/utils';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatInterfaceProps {
  subject: string;
  topic: string;
}

const INITIAL_MESSAGE = {
  text: "Hi there! I'm your StudyBuddy AI assistant. How can I help you with your studies today?",
  isUser: false,
  timestamp: new Date().toLocaleTimeString(),
};

const generateTimestamp = () => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatInterface = ({ subject, topic }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset chat when subject or topic changes
  useEffect(() => {
    const contextMessage = subject && topic 
      ? `How can I help you with ${topic} in ${subject}?` 
      : "How can I help you with your studies today?";
      
    setMessages([
      {
        text: `Hi there! I'm your StudyBuddy AI assistant. ${contextMessage}`,
        isUser: false,
        timestamp: generateTimestamp(),
      }
    ]);
  }, [subject, topic]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      text: input.trim(),
      isUser: true,
      timestamp: generateTimestamp(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      try {
        // This is where you would integrate with an actual API
        const aiResponses = [
          `Based on your question about ${topic} in ${subject}, I'd recommend studying these key concepts first...`,
          `That's a great question about ${topic}! Here's how I would approach this problem...`,
          `When studying ${topic} in ${subject}, it's important to remember these fundamental principles...`,
          `Let me explain this ${topic} concept in simpler terms...`,
        ];
        
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        const aiMessage = {
          text: randomResponse,
          isUser: false,
          timestamp: generateTimestamp(),
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error generating response:", error);
        toast.error("Failed to generate response. Please try again.");
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[600px] shadow-sm border border-gray-200">
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <MessageBubble 
              key={i}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isLoading && (
            <div className="flex items-center space-x-2 p-3 max-w-[80%] bg-white rounded-2xl shadow-sm border border-gray-200 rounded-bl-none animate-pulse">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse-light"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse-light" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse-light" style={{ animationDelay: "0.4s" }}></div>
              </div>
              <div className="text-sm text-gray-500">StudyBuddy is thinking...</div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end space-x-2">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your study question..."
            className={cn(
              "flex-1 min-h-[60px] max-h-[120px] resize-none focus-visible:ring-study-primary",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-study-primary hover:bg-study-primary/90 h-[60px] px-4"
          >
            <SendIcon size={20} />
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
