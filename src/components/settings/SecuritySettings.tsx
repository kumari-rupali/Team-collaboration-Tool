import { useState } from 'react';

export function SecuritySettings() {
  const [secureMode, setSecureMode] = useState(false);

  return (
    <div className="insights-container" style={{ maxWidth: '800px' }}>
      <h2>🔒 Security & Access Control</h2>
      <p className="text-muted">Manage role-based access, encryption, and secure modes.</p>

      <div className="insight-card" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ marginBottom: '0.2rem' }}>Secure Mode (E2E Encryption)</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Restrict external sharing, disable downloads, and enable end-to-end encryption for this workspace.
          </p>
        </div>
        <button 
          className={secureMode ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setSecureMode(!secureMode)}
          style={{ transition: 'all 0.3s', minWidth: '120px' }}
        >
          {secureMode ? 'Enabled 🛡️' : 'Enable'}
        </button>
      </div>

      <div className="insight-card" style={{ marginTop: '1.5rem' }}>
        <h3>Role-Based Permissions</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
              <th style={{ padding: '0.5rem' }}>Role</th>
              <th style={{ padding: '0.5rem' }}>View Tasks</th>
              <th style={{ padding: '0.5rem' }}>Edit Tasks</th>
              <th style={{ padding: '0.5rem' }}>Manage Users</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
              <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Admin</td>
              <td style={{ color: 'var(--color-success)' }}>Full</td>
              <td style={{ color: 'var(--color-success)' }}>Full</td>
              <td style={{ color: 'var(--color-success)' }}>Full</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
              <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Manager</td>
              <td style={{ color: 'var(--color-success)' }}>Full</td>
              <td style={{ color: 'var(--color-success)' }}>Full</td>
              <td style={{ color: 'var(--color-danger)' }}>None</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Member</td>
              <td style={{ color: 'var(--color-success)' }}>Full</td>
              <td style={{ color: 'var(--color-warning)' }}>Own Only</td>
              <td style={{ color: 'var(--color-danger)' }}>None</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="insight-card" style={{ marginTop: '1.5rem' }}>
        <h3>Recent Audit Log</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-glass)' }}>[10:45 AM] Alice Cooper changed task "Setup CI/CD" priority to Urgent</li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-glass)' }}>[09:12 AM] System generated Team Health Report</li>
          <li style={{ padding: '0.5rem 0' }}>[Yesterday] Bob Singer logged in from new IP address</li>
        </ul>
      </div>
    </div>
  );
}
