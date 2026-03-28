import type { ActiveView } from '../types'

interface Props {
  activeView: ActiveView
  onNavigate: (view: ActiveView) => void
  children: React.ReactNode
}

export function Layout({ activeView, onNavigate, children }: Props) {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1 className="layout-title">Revive</h1>
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
          className={`nav-tab ${activeView === 'settings' ? 'nav-active' : ''}`}
          onClick={() => onNavigate('settings')}
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
          padding: 16px 24px;
          border-bottom: 1px solid var(--color-border);
          flex-shrink: 0;
        }
        .layout-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-primary);
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
