import type { Task } from '../../types';
import { getTaskHealth, formatDeadline } from '../../utils/taskHealth';
import './Kanban.css';

interface TaskCardProps {
  task: Task;
  allTasks: Task[];
}

export function TaskCard({ task, allTasks }: TaskCardProps) {
  const health = getTaskHealth(task, allTasks);

  return (
    <div className={`task-card health-${health.toLowerCase()}`} draggable>
      <div className="task-header">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className={`task-priority priority-${task.priority}`}>
            {task.priority}
          </span>
          {health !== 'Healthy' && (
            <span className={`health-badge badge-${health.toLowerCase()}`}>
              {health === 'Overdue' && '⚠️ Overdue'}
              {health === 'Blocked' && '🚫 Blocked'}
              {health === 'Stuck' && '⏳ Stuck'}
            </span>
          )}
        </div>
        <button className="action-btn" style={{ width: '24px', height: '24px', border: 'none', background: 'transparent' }}>
          ⋯
        </button>
      </div>
      
      <h4 className="task-title">{task.title}</h4>
      
      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}
      
      <div className="task-footer">
        <div className="task-meta">
          {task.comments > 0 && (
            <div className="meta-item">
              <span style={{ fontSize: '14px' }}>💬</span>
              <span>{task.comments}</span>
            </div>
          )}
          {task.attachments > 0 && (
            <div className="meta-item">
              <span style={{ fontSize: '14px' }}>📎</span>
              <span>{task.attachments}</span>
            </div>
          )}
          {task.deadline && (
            <div className={`meta-item ${health === 'Overdue' ? 'text-danger' : ''}`}>
              <span style={{ fontSize: '14px' }}>⏱️</span>
              <span>{formatDeadline(task.deadline)}</span>
            </div>
          )}
        </div>
        
        <div className="task-assignees">
          {task.assignees.map((user) => (
            <div key={user.id} className="assignee-avatar" title={user.name}>
              {user.initials}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
