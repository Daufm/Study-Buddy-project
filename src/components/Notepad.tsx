
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PencilIcon, CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotepadProps {
  subject: string;
  topic: string;
}

const Notepad = ({ subject, topic }: NotepadProps) => {
  const storageKey = `study-notes-${subject}-${topic}`;
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Load saved notes when subject or topic changes
  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey) || '';
    setNotes(savedNotes);
    setIsEditing(false);
  }, [subject, topic, storageKey]);
  
  const handleSaveNotes = () => {
    localStorage.setItem(storageKey, notes);
    setIsEditing(false);
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">Study Notes</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => isEditing ? handleSaveNotes() : setIsEditing(true)}
          className="text-gray-500 hover:text-study-primary"
        >
          {isEditing ? <CheckIcon size={18} /> : <PencilIcon size={18} />}
        </Button>
      </div>
      
      {isEditing ? (
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Type your notes here..."
          className="min-h-[200px] focus:border-study-primary"
        />
      ) : (
        <div className={cn(
          "min-h-[200px] text-gray-700 whitespace-pre-wrap",
          !notes && "text-gray-400 italic"
        )}>
          {notes || "No notes yet. Click the pencil icon to add some!"}
        </div>
      )}
      
      {isEditing && (
        <div className="flex justify-end mt-3">
          <Button 
            size="sm" 
            onClick={handleSaveNotes}
            className="bg-study-primary hover:bg-study-primary/90"
          >
            Save Notes
          </Button>
        </div>
      )}
    </div>
  );
};

export default Notepad;
