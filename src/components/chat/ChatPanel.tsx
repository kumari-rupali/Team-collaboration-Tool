import { useState } from 'react';
import { TaskPopup } from './TaskPopup';
import type { ParsedTaskData } from './TaskPopup';
import './Chat.css';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (data: ParsedTaskData) => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'system';
}

export function ChatPanel({ isOpen, onClose, onCreateTask }: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Welcome to the team chat! Need me to create a task? Just ask.', sender: 'system' }
  ]);
  const [popupData, setPopupData] = useState<ParsedTaskData | null>(null);

  const analyzeMessage = (text: string) => {
    // Basic analysis logic
    let assignee = '';
    let deadline = '';
    
    // Extract assignee: any word starting with @
    const assigneeMatch = text.match(/@(\w+)/);
    if (assigneeMatch) assignee = assigneeMatch[1];
    
    // Extract deadline: tomorrow, today, next week
    const lowerText = text.toLowerCase();
    if (lowerText.includes('tomorrow')) deadline = 'Tomorrow';
    else if (lowerText.includes('today')) deadline = 'Today';
    else if (lowerText.includes('next week')) deadline = 'Next Week';
    else deadline = 'Unscheduled';

    // If it looks like a task request, trigger popup
    if (assignee || deadline !== 'Unscheduled' || lowerText.includes('task') || lowerText.includes('todo')) {
      // Clean up title by removing the @mention
      let title = text.replace(/@\w+/, '').trim();
      setPopupData({ title, assignee, deadline });
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMsg: Message = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages([...messages, newMsg]);
    setInputValue('');
    
    analyzeMessage(newMsg.text);
  };

  const handleConfirmTask = (data: ParsedTaskData) => {
    onCreateTask(data);
    setPopupData(null);
    setMessages(prev => [...prev, { id: Date.now(), text: `Task created: "${data.title}" assigned to ${data.assignee || 'Unassigned'}.`, sender: 'system' }]);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="chat-panel">
        <div className="chat-header">
          <span className="chat-title">Team Chat</span>
          <span className="close-btn" onClick={onClose}>✖</span>
        </div>
        
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        
        <div className="chat-input-area">
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="send-btn" onClick={handleSend}>➤</button>
        </div>
      </div>
      
      {popupData && (
        <TaskPopup 
          data={popupData} 
          onConfirm={handleConfirmTask} 
          onCancel={() => setPopupData(null)} 
        />
      )}
    </>
  );
}
