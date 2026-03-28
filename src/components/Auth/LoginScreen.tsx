import { useState } from 'react'
import { signInWithGoogle } from '../../firebase/auth'

export function LoginScreen() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    setLoading(true)
    setError(null)
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <h1 className="login-title">Revive</h1>
        <p className="login-subtitle">Attendance Tracker</p>

        {error && <p className="login-error">{error}</p>}

        <button
          className="btn btn-primary login-btn"
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
      </div>

      <style>{`
        .login-screen {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .login-card {
          text-align: center;
          background: var(--color-surface);
          padding: 48px 40px;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow);
          max-width: 360px;
          width: 100%;
        }
        .login-title {
          font-size: 2rem;
          color: var(--color-primary);
          margin-bottom: 4px;
        }
        .login-subtitle {
          color: var(--color-text-muted);
          margin-bottom: 32px;
        }
        .login-error {
          color: var(--color-danger);
          font-size: 0.85rem;
          margin-bottom: 16px;
        }
        .login-btn {
          width: 100%;
          padding: 12px 24px;
          font-size: 1rem;
        }
      `}</style>
    </div>
  )
}
