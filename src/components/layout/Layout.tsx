import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import type { ViewState } from './Sidebar';
import { Header } from './Header';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  onToggleChat: () => void;
  currentView: ViewState;
  setCurrentView: (v: ViewState) => void;
}

export function Layout({ children, onToggleChat, currentView, setCurrentView }: LayoutProps) {
  return (
    <div className="layout-container">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="main-wrapper">
        <Header onToggleChat={onToggleChat} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
