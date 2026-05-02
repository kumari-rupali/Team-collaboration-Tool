export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string; // matches column id
  priority: Priority;
  assignees: User[];
  deadline?: string; // ISO String format preferred for calculation
  last_updated: string; // ISO String format
  dependencyId?: string; // ID of another task blocking this one
  comments: number;
  attachments: number;
}

export interface Column {
  id: string;
  title: string;
}
