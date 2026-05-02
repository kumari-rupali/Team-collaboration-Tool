import { useState, useMemo } from 'react';
import { Layout } from './components/layout/Layout';
import { KanbanBoard } from './components/kanban/KanbanBoard';
import { ChatPanel } from './components/chat/ChatPanel';
import { ParsedTaskData } from './components/chat/TaskPopup';
import { mockTasks, mockColumns, mockUsers } from './data/mockData';
import { getTaskHealth } from './utils/taskHealth';
import { Task } from './types';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [columns] = useState(mockColumns);

  // Compute Alerts
  const alerts = useMemo(() => {
    let overdueCount = 0;
    let blockedCount = 0;
    let stuckCount = 0;

    tasks.forEach(task => {
      const health = getTaskHealth(task, tasks);
      if (health === 'Overdue') overdueCount++;
      if (health === 'Blocked') blockedCount++;
      if (health === 'Stuck') stuckCount++;
    });

    return { overdueCount, blockedCount, stuckCount };
  }, [tasks]);

  const handleCreateTaskFromChat = (data: ParsedTaskData) => {
    // Generate a new task
    const newTask: Task = {
      id: `t${Date.now()}`,
      title: data.title,
      status: 'todo', // Default to "To Do"
      priority: 'Medium',
      assignees: data.assignee ? [{
        id: `u${Date.now()}`,
        name: data.assignee,
        initials: data.assignee.substring(0, 2).toUpperCase()
      }] : [mockUsers[0]], // fallback assignee
      deadline: data.deadline !== 'Unscheduled' ? new Date(new Date().getTime() + 86400000).toISOString() : undefined,
      last_updated: new Date().toISOString(),
      comments: 0,
      attachments: 0
    };

    setTasks(prev => [...prev, newTask]);
  };

  return (
    <div style={{ display: 'flex', width: '100vw', overflow: 'hidden' }}>
      <Layout onToggleChat={() => setIsChatOpen(!isChatOpen)}>
        <div className="dashboard-content">
          <header className="dashboard-header" style={{ marginBottom: '1rem' }}>
            <div className="dashboard-title-area">
              <h1>Product Engineering</h1>
              <p className="text-muted">Manage your team's tasks and sprints.</p>
            </div>
            <button className="btn-primary">
              <span style={{ fontSize: '18px' }}>➕</span>
              <span>New Task</span>
            </button>
          </header>

          <div className="dashboard-alerts" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            {alerts.overdueCount > 0 && (
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid var(--color-danger)', borderRadius: '8px', color: 'var(--color-danger)', fontWeight: 600 }}>
                ⚠️ {alerts.overdueCount} task{alerts.overdueCount > 1 ? 's' : ''} overdue
              </div>
            )}
            {alerts.blockedCount > 0 && (
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(100, 116, 139, 0.1)', border: '1px solid var(--text-muted)', borderRadius: '8px', color: 'var(--text-primary)', fontWeight: 600 }}>
                🚫 {alerts.blockedCount} task{alerts.blockedCount > 1 ? 's' : ''} blocked
              </div>
            )}
            {alerts.stuckCount > 0 && (
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid var(--color-warning)', borderRadius: '8px', color: 'var(--color-warning)', fontWeight: 600 }}>
                ⏳ {alerts.stuckCount} task{alerts.stuckCount > 1 ? 's' : ''} stuck
              </div>
            )}
          </div>
          
          <KanbanBoard tasks={tasks} columns={columns} />
        </div>
      </Layout>
      <ChatPanel 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        onCreateTask={handleCreateTaskFromChat}
      />
    </div>
  );
}

export default App;
