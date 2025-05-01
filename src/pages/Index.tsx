
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import StudyHeader from '@/components/StudyHeader';
import StudyFooter from '@/components/StudyFooter';
import ChatInterface from '@/components/ChatInterface';
import TopicSelector from '@/components/TopicSelector';
import Notepad from '@/components/Notepad';

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [selectedTopic, setSelectedTopic] = useState('algebra');
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <StudyHeader />
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <Card className="mb-6 bg-white shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-lg font-medium mb-4">Study Session Setup</h2>
            <TopicSelector
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="chat">AI Chat</TabsTrigger>
                <TabsTrigger value="notes">Study Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="mt-0">
                <ChatInterface subject={selectedSubject} topic={selectedTopic} />
              </TabsContent>
              
              <TabsContent value="notes" className="mt-0 lg:hidden">
                <Notepad subject={selectedSubject} topic={selectedTopic} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="hidden lg:block">
            <Notepad subject={selectedSubject} topic={selectedTopic} />
          </div>
        </div>
        
        <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-medium mb-2">About StudyBuddy AI</h3>
          <p className="text-gray-700 text-sm">
            StudyBuddy AI is your personal AI-powered study assistant. Select a subject and topic, 
            then ask questions to get help with your studies. You can also take notes while you learn!
          </p>
        </div>
      </main>
      
      <StudyFooter />
    </div>
  );
};

export default Index;
