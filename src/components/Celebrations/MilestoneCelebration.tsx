import { useEffect } from 'react'

const MESSAGES: Record<number, string> = {
  7: 'One week strong!',
  14: 'Two weeks of consistency!',
  30: 'A full month \u2014 unstoppable!',
  50: '50 days \u2014 remarkable dedication!',
  100: 'Triple digits \u2014 incredible!',
  200: '200 days \u2014 legendary streak!',
  365: 'A full year \u2014 you are the streak!',
}

interface Props {
  milestone: number
  onDismiss: () => void
}

export function MilestoneCelebration({ milestone, onDismiss }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 360
    const color = `hsl(${angle}, 80%, 60%)`
    return (
      <div
        key={i}
        className="particle"
        style={{
          background: color,
          '--angle': `${angle}deg`,
        } as React.CSSProperties}
      />
    )
  })

  return (
    <div className="milestone-overlay" onClick={onDismiss}>
      <div className="milestone-card">
        <div className="milestone-particles">{particles}</div>
        <div className="milestone-emoji">&#127881;</div>
        <div className="milestone-number">{milestone}</div>
        <div className="milestone-label">day streak!</div>
        <div className="milestone-message">{MESSAGES[milestone] ?? `${milestone} days \u2014 amazing!`}</div>
      </div>

      <style>{`
        .milestone-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          cursor: pointer;
        }
        .milestone-card {
          text-align: center;
          position: relative;
          animation: milestone-pop 0.4s ease-out;
        }
        .milestone-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          animation: particle-burst 1s ease-out forwards;
          animation-delay: calc(var(--angle) / 3600 * 1s);
        }
        .milestone-emoji {
          font-size: 3rem;
          margin-bottom: 8px;
        }
        .milestone-number {
          font-size: 4rem;
          font-weight: 800;
          color: #ff9800;
          line-height: 1;
        }
        .milestone-label {
          font-size: 1.2rem;
          color: var(--color-text-muted);
          margin-bottom: 12px;
        }
        .milestone-message {
          font-size: 1.1rem;
          color: var(--color-text);
          font-weight: 500;
        }
        @keyframes milestone-pop {
          0% { transform: scale(0.3); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes particle-burst {
          0% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-120px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
