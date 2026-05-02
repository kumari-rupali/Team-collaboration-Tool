import { useState, useEffect } from 'react';
import type { Task } from '../../types';
import './Focus.css';

interface FocusModeProps {
  tasks: Task[];
}

export function FocusMode({ tasks }: FocusModeProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  // Find urgent/high priority task to focus on
  const focusTask = tasks.find(t => t.status !== 'done' && (t.priority === 'Urgent' || t.priority === 'High')) || tasks[0];

  return (
    <div className="focus-container">
      <div className="timer-circle">
        <div className="time-display">{mins}:{secs}</div>
        <div className="timer-controls">
          <button className="btn-primary" onClick={toggleTimer}>
            {isActive ? 'Pause' : 'Start Focus'}
          </button>
          <button className="btn-secondary" onClick={resetTimer}>Reset</button>
        </div>
      </div>

      <div className="focus-tasks">
        <h3>🎯 Current Objective</h3>
        {focusTask ? (
          <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{focusTask.title}</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>{focusTask.description || 'No description provided.'}</div>
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No pending tasks! You are all caught up.</p>
        )}
      </div>
    </div>
  );
}
