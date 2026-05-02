import { useState } from 'react';
import './Chat.css';

export interface ParsedTaskData {
  title: string;
  deadline: string;
  assignee: string;
}

interface TaskPopupProps {
  data: ParsedTaskData;
  onConfirm: (data: ParsedTaskData) => void;
  onCancel: () => void;
}

export function TaskPopup({ data, onConfirm, onCancel }: TaskPopupProps) {
  const [formData, setFormData] = useState<ParsedTaskData>(data);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h3>✨ Create task from this message?</h3>
        </div>
        <div className="popup-body">
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Assignee</label>
            <input 
              type="text" 
              className="form-input"
              value={formData.assignee}
              onChange={(e) => setFormData({...formData, assignee: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Deadline</label>
            <input 
              type="text" 
              className="form-input"
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
            />
          </div>
        </div>
        <div className="popup-footer">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn-primary" onClick={() => onConfirm(formData)}>Create Task</button>
        </div>
      </div>
    </div>
  );
}
