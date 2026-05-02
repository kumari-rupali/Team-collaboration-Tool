import './Layout.css';

interface HeaderProps {
  onToggleChat: () => void;
}

export function Header({ onToggleChat }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-search">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search tasks, people, or projects..." 
          className="search-input"
        />
      </div>
      
      <div className="header-actions">
        <button className="action-btn" aria-label="Messages" onClick={onToggleChat}>
          💬
        </button>
        <button className="action-btn" aria-label="Notifications">
          🔔
        </button>
        <div className="user-avatar" title="Current User">
          R
        </div>
      </div>
    </header>
  );
}
