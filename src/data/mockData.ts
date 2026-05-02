import type { Task, Column, User } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Alice Cooper', initials: 'AC' },
  { id: 'u2', name: 'Bob Singer', initials: 'BS' },
  { id: 'u3', name: 'Charlie Day', initials: 'CD' },
];

export const mockColumns: Column[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

// Helper to calculate dates relative to today
const getRelativeDate = (daysOffset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString();
};

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Design Authentication Flow',
    description: 'Create wireframes and user flow for the new SSO login.',
    status: 'in-progress',
    priority: 'High',
    assignees: [mockUsers[0]],
    deadline: getRelativeDate(-1), // Overdue
    last_updated: getRelativeDate(-2), // Stuck (no update in 48 hours)
    comments: 3,
    attachments: 1
  },
  {
    id: 't2',
    title: 'Setup CI/CD Pipeline',
    status: 'todo',
    priority: 'Urgent',
    assignees: [mockUsers[1], mockUsers[2]],
    deadline: getRelativeDate(2),
    last_updated: getRelativeDate(0),
    dependencyId: 't1', // Blocked (t1 is not done)
    comments: 5,
    attachments: 0
  },
  {
    id: 't3',
    title: 'Refactor Navigation Component',
    description: 'Move to the new routing library and update styles.',
    status: 'in-progress',
    priority: 'Medium',
    assignees: [mockUsers[0], mockUsers[1]],
    deadline: getRelativeDate(5),
    last_updated: getRelativeDate(-3), // Stuck
    comments: 1,
    attachments: 2
  },
  {
    id: 't4',
    title: 'Update API Documentation',
    status: 'review',
    priority: 'Low',
    assignees: [mockUsers[2]],
    deadline: getRelativeDate(1),
    last_updated: getRelativeDate(0),
    comments: 0,
    attachments: 0
  },
  {
    id: 't5',
    title: 'Fix Sidebar Bug on Mobile',
    status: 'done',
    priority: 'High',
    assignees: [mockUsers[0]],
    deadline: getRelativeDate(-5),
    last_updated: getRelativeDate(-1),
    comments: 8,
    attachments: 3
  }
];
