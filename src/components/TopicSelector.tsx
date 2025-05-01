
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface TopicSelectorProps {
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
}

const subjects = [
  { value: 'math', label: 'Mathematics' },
  { value: 'science', label: 'Science' },
  { value: 'history', label: 'History' },
  { value: 'english', label: 'English Literature' },
  { value: 'computer', label: 'Computer Science' },
];

const topicsBySubject: Record<string, Array<{ value: string; label: string }>> = {
  math: [
    { value: 'algebra', label: 'Algebra' },
    { value: 'calculus', label: 'Calculus' },
    { value: 'geometry', label: 'Geometry' },
    { value: 'statistics', label: 'Statistics' },
  ],
  science: [
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'astronomy', label: 'Astronomy' },
  ],
  history: [
    { value: 'world', label: 'World History' },
    { value: 'us', label: 'US History' },
    { value: 'european', label: 'European History' },
    { value: 'ancient', label: 'Ancient History' },
  ],
  english: [
    { value: 'shakespeare', label: 'Shakespeare' },
    { value: 'american', label: 'American Literature' },
    { value: 'british', label: 'British Literature' },
    { value: 'poetry', label: 'Poetry' },
  ],
  computer: [
    { value: 'programming', label: 'Programming' },
    { value: 'algorithms', label: 'Algorithms' },
    { value: 'webdev', label: 'Web Development' },
    { value: 'databases', label: 'Databases' },
  ],
};

const TopicSelector = ({
  selectedSubject,
  setSelectedSubject,
  selectedTopic,
  setSelectedTopic
}: TopicSelectorProps) => {
  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    // Reset topic when subject changes
    if (topicsBySubject[value] && topicsBySubject[value].length > 0) {
      setSelectedTopic(topicsBySubject[value][0].value);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="w-full sm:w-1/2">
        <label className="text-sm font-medium mb-1 block text-gray-700">Subject</label>
        <Select value={selectedSubject} onValueChange={handleSubjectChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.value} value={subject.value}>
                {subject.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-1/2">
        <label className="text-sm font-medium mb-1 block text-gray-700">Topic</label>
        <Select 
          value={selectedTopic} 
          onValueChange={setSelectedTopic} 
          disabled={!selectedSubject}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            {selectedSubject && topicsBySubject[selectedSubject]?.map((topic) => (
              <SelectItem key={topic.value} value={topic.value}>
                {topic.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TopicSelector;
