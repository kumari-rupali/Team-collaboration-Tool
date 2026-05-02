import type { Task } from '../../types';
import { mockUsers } from '../../data/mockData';
import './Insights.css';

interface TeamInsightsProps {
  tasks: Task[];
}

export function TeamInsights({ tasks }: TeamInsightsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100) || 0;

  // Calculate workload per user
  const workload = mockUsers.map(user => {
    const userTasks = tasks.filter(t => t.status !== 'done' && t.assignees.some(a => a.id === user.id));
    return {
      ...user,
      taskCount: userTasks.length
    };
  });

  return (
    <div className="insights-container">
      <h2>📈 Team Health & Insights</h2>
      <p className="text-muted">AI-driven analytics on productivity and workload distribution.</p>
      
      <div className="insights-grid">
        <div className="insight-card">
          <h3>Velocity <span>🚀</span></h3>
          <div className="stat-value">{completionRate}%</div>
          <div className="stat-label">Sprint Completion Rate</div>
          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-success)' }}>
            +12% faster than last week
          </div>
        </div>

        <div className="insight-card">
          <h3>Workload Distribution <span>⚖️</span></h3>
          <div style={{ marginTop: '1rem' }}>
            {workload.map(user => {
              const fillPercent = Math.min((user.taskCount / 5) * 100, 100);
              const isOverloaded = user.taskCount >= 3;
              
              return (
                <div key={user.id} className="member-stat">
                  <div className="member-header">
                    <span>{user.name}</span>
                    <span>{user.taskCount} tasks</span>
                  </div>
                  <div className="workload-bar">
                    <div 
                      className={`workload-fill ${isOverloaded ? 'danger' : ''}`} 
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                  {isOverloaded && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-danger)', marginTop: '0.2rem' }}>
                      Burnout Risk
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="insight-card">
          <h3>AI Productivity Assistant <span>🧠</span></h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong>Daily Summary:</strong> The team is progressing well on the CI/CD pipeline. 
            However, 2 tasks are currently stuck in the "In Progress" phase. I recommend reassigning the Navigation Component to balance Bob's workload.
          </p>
          <button className="btn-secondary" style={{ marginTop: '1rem', width: '100%' }}>
            Generate Full Report
          </button>
        </div>
      </div>
    </div>
  );
}
