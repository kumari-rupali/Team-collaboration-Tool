import type { Task } from '../types';

export type TaskHealth = 'Overdue' | 'Stuck' | 'Blocked' | 'Healthy';

export function getTaskHealth(task: Task, allTasks: Task[]): TaskHealth {
  if (task.status === 'done') return 'Healthy';

  // Check Overdue
  if (task.deadline) {
    const deadlineDate = new Date(task.deadline);
    const now = new Date();
    // Reset hours to compare purely by day, or leave it for exact time
    if (deadlineDate < now) {
      return 'Overdue';
    }
  }

  // Check Blocked
  if (task.dependencyId) {
    const blockingTask = allTasks.find(t => t.id === task.dependencyId);
    if (blockingTask && blockingTask.status !== 'done') {
      return 'Blocked';
    }
  }

  // Check Stuck (No updates in 24 hours, and it's not a 'todo' that was just created)
  if (task.last_updated && task.status === 'in-progress') {
    const lastUpdate = new Date(task.last_updated);
    const now = new Date();
    const diffHours = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
    if (diffHours > 24) {
      return 'Stuck';
    }
  }

  return 'Healthy';
}

export function formatDeadline(isoString?: string) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
