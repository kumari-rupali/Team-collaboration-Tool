import './Layout.css';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="logo-icon" style={{fontSize: '1.5rem'}}>💼</span>
        <span className="logo-text gradient-text">CollabFlow</span>
      </div>
      
      <nav className="nav-links">
        <a href="#" className="nav-item active">
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
        </a>
        <a href="#" className="nav-item">
          <span className="nav-icon">✅</span>
          <span>Tasks</span>
        </a>
        <a href="#" className="nav-item">
          <span className="nav-icon">👥</span>
          <span>Team</span>
        </a>
        <a href="#" className="nav-item">
          <span className="nav-icon">⚙️</span>
          <span>Settings</span>
        </a>
      </nav>
    </aside>
  );
}
