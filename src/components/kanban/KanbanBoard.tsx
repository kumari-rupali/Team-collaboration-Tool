import type { Column, Task } from '../../types';
import { KanbanColumn } from './KanbanColumn';
import './Kanban.css';

interface KanbanBoardProps {
  tasks: Task[];
  columns: Column[];
}

export function KanbanBoard({ tasks, columns }: KanbanBoardProps) {
  return (
    <div className="kanban-board">
      {columns.map(column => (
        <KanbanColumn 
          key={column.id} 
          column={column} 
          tasks={tasks.filter(t => t.status === column.id)}
          allTasks={tasks} 
        />
      ))}
    </div>
  );
}
