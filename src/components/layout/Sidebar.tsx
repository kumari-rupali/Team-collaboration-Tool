import './Layout.css';

export type ViewState = 'dashboard' | 'focus' | 'insights' | 'security';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (v: ViewState) => void;
}

export function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="logo-icon" style={{fontSize: '1.5rem'}}>💼</span>
        <span className="logo-text gradient-text">CollabFlow</span>
      </div>
      
      <nav className="nav-links">
        <a href="#" className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('dashboard'); }}>
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
        </a>
        <a href="#" className={`nav-item ${currentView === 'focus' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('focus'); }}>
          <span className="nav-icon">🎯</span>
          <span>Focus Mode</span>
        </a>
        <a href="#" className={`nav-item ${currentView === 'insights' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('insights'); }}>
          <span className="nav-icon">🧠</span>
          <span>Team Insights</span>
        </a>
        <a href="#" className={`nav-item ${currentView === 'security' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('security'); }}>
          <span className="nav-icon">🔒</span>
          <span>Security</span>
        </a>
      </nav>
    </aside>
  );
}
