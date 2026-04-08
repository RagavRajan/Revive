import type { ActiveView } from '../types'

interface Props {
  activeView: ActiveView
  onNavigate: (view: ActiveView) => void
  onSignOut: () => Promise<void>
  onStats?: () => void
  userEmail?: string | null
  checkedIn: boolean
  children: React.ReactNode
}

export function Layout({ activeView, onNavigate, onSignOut, onStats, userEmail, checkedIn, children }: Props) {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1 className="layout-title">Revive</h1>
        <div className="layout-user">
          {userEmail && <span className="layout-email">{userEmail}</span>}
          {onStats && <button className="layout-stats" onClick={onStats}>Stats</button>}
          <button className="layout-signout" onClick={() => {
            if (window.confirm('Are you sure you want to sign out?')) onSignOut()
          }}>Sign Out</button>
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <nav className="layout-nav">
        <button
          className={`nav-tab ${activeView === 'calendar' ? 'nav-active' : ''}`}
          onClick={() => onNavigate('calendar')}
        >
          <span className="nav-icon">&#128197;</span>
          <span className="nav-label">Calendar</span>
        </button>
        <button
          className={`nav-tab ${activeView === 'scanner' ? 'nav-active' : ''}`}
          onClick={() => onNavigate('scanner')}
        >
          <span className="nav-icon">&#128247;</span>
          <span className="nav-label">Scan</span>
        </button>
        <button
          className={`nav-tab ${activeView === 'skills' ? 'nav-active' : ''}`}
          onClick={() => onNavigate('skills')}
        >
          <span className="nav-icon">&#128161;</span>
          <span className="nav-label">Skills</span>
        </button>
        <button
          className={`nav-tab ${activeView === 'settings' ? 'nav-active' : ''} ${!checkedIn ? 'nav-disabled' : ''}`}
          onClick={() => checkedIn ? onNavigate('settings') : undefined}
        >
          <span className="nav-icon">&#9881;</span>
          <span className="nav-label">Settings</span>
        </button>
      </nav>

      <style>{`
        .layout {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .layout-header {
          padding: 12px 24px;
          border-bottom: 1px solid var(--color-border);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .layout-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        .layout-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .layout-email {
          color: var(--color-text-muted);
          font-size: 0.8rem;
        }
        .layout-stats {
          font-size: 0.8rem;
          color: var(--color-text);
          padding: 6px 12px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          transition: background var(--transition);
        }
        .layout-stats:hover {
          background: var(--color-surface-hover);
        }
        .layout-signout {
          font-size: 0.8rem;
          color: var(--color-danger);
          padding: 6px 12px;
          border: 1px solid var(--color-danger);
          border-radius: var(--radius);
          transition: background var(--transition);
        }
        .layout-signout:hover {
          background: var(--color-danger-bg);
        }
        .layout-main {
          flex: 1;
          overflow-y: auto;
        }
        .layout-nav {
          display: flex;
          border-top: 1px solid var(--color-border);
          background: var(--color-surface);
          flex-shrink: 0;
        }
        .nav-tab {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 10px 0;
          color: var(--color-text-muted);
          transition: color var(--transition);
        }
        .nav-tab:hover {
          color: var(--color-text);
        }
        .nav-active {
          color: var(--color-primary);
        }
        .nav-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .nav-icon {
          font-size: 1.3rem;
          line-height: 1;
        }
        .nav-label {
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  )
}
