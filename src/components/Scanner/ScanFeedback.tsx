import { useEffect, useState } from 'react'

interface Props {
  type: 'success' | 'failure' | null
  onDone: () => void
}

export function ScanFeedback({ type, onDone }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (type) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        onDone()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [type, onDone])

  if (!visible || !type) return null

  return (
    <div className={`scan-feedback scan-feedback-${type}`}>
      <div className="scan-feedback-icon">
        {type === 'success' ? '\u2713' : '\u2717'}
      </div>
      <style>{`
        .scan-feedback {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          pointer-events: none;
          animation: flash-success 1.5s ease-out forwards;
        }
        .scan-feedback-success {
          background: rgba(76, 175, 80, 0.3);
        }
        .scan-feedback-failure {
          background: rgba(244, 67, 54, 0.3);
          animation-name: flash-failure;
        }
        .scan-feedback-icon {
          font-size: 80px;
          font-weight: bold;
          color: white;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  )
}
