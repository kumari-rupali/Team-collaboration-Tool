import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  onToggleChat: () => void;
}

export function Layout({ children, onToggleChat }: LayoutProps) {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header onToggleChat={onToggleChat} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
