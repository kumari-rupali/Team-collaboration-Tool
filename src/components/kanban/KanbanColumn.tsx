import type { Column, Task } from '../../types';
import { TaskCard } from './TaskCard';
import './Kanban.css';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  allTasks: Task[];
}

export function KanbanColumn({ column, tasks, allTasks }: KanbanColumnProps) {
  return (
    <div className="kanban-column glass-panel">
      <div className="column-header">
        <div className="column-title">
          {column.title}
          <span className="task-count">{tasks.length}</span>
        </div>
        <div className="column-actions">
          <button className="action-btn" style={{ width: '28px', height: '28px', marginRight: '0.25rem', border: 'none', background: 'transparent' }}>
            ➕
          </button>
          <button className="action-btn" style={{ width: '28px', height: '28px', border: 'none', background: 'transparent' }}>
            ⋯
          </button>
        </div>
      </div>
      
      <div className="column-content">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} allTasks={allTasks} />
        ))}
      </div>
    </div>
  );
}
