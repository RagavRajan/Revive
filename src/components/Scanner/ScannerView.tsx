import { useState, useCallback, useEffect, useRef } from 'react'
import { useScanner } from '../../hooks/useScanner'
import { ScanFeedback } from './ScanFeedback'
import { playSuccess, playFailure } from '../../utils/sound'
import type { AppSettings } from '../../types'

interface Props {
  settings: AppSettings
  checkedIn: boolean
  onScan: () => Promise<string>
}

export function ScannerView({ settings, checkedIn, onScan }: Props) {
  const [feedback, setFeedback] = useState<'success' | 'failure' | null>(null)
  const [lastAction, setLastAction] = useState<string | null>(null)
  const processingRef = useRef(false)

  const handleScan = useCallback(async (decodedText: string) => {
    if (processingRef.current) return
    processingRef.current = true

    if (decodedText === settings.registeredBarcode) {
      const action = await onScan()
      setLastAction(action === 'check-in' ? 'Checked In' : 'Checked Out')
      setFeedback('success')
      playSuccess()
    } else {
      setFeedback('failure')
      playFailure()
    }

    // Debounce: wait before allowing next scan
    setTimeout(() => {
      processingRef.current = false
    }, 2000)
  }, [settings.registeredBarcode, onScan])

  const { start, stop, error } = useScanner({
    onScan: handleScan,
    elementId: 'scanner-view',
  })

  useEffect(() => {
    start()
    return () => { stop() }
  }, [start, stop])

  const clearFeedback = useCallback(() => setFeedback(null), [])

  return (
    <div className="scanner-page">
      <div className="scanner-status">
        <div className={`status-indicator ${checkedIn ? 'status-in' : 'status-out'}`} />
        <div>
          <div className="status-label">
            {checkedIn ? 'Checked IN' : 'Checked OUT'}
          </div>
          <div className="status-hint">
            Next scan will: {checkedIn ? 'CHECK OUT' : 'CHECK IN'}
          </div>
        </div>
      </div>

      {error && <p className="scanner-error">{error}</p>}

      <div className="scanner-container">
        <div id="scanner-view" className="scanner-viewport" />
      </div>

      {lastAction && (
        <p className="scanner-last-action">Last: {lastAction}</p>
      )}

      <p className="scanner-hint">
        Scan the registered book barcode to {checkedIn ? 'check out' : 'check in'}.
      </p>

      <ScanFeedback type={feedback} onDone={clearFeedback} />

      <style>{`
        .scanner-page {
          padding: 24px;
          max-width: 500px;
          margin: 0 auto;
        }
        .scanner-status {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--color-surface);
          padding: 16px;
          border-radius: var(--radius-lg);
          margin-bottom: 20px;
        }
        .status-indicator {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .status-in {
          background: var(--color-success);
          box-shadow: 0 0 8px var(--color-success);
        }
        .status-out {
          background: var(--color-text-muted);
        }
        .status-label {
          font-weight: 600;
          font-size: 1.1rem;
        }
        .status-hint {
          color: var(--color-text-muted);
          font-size: 0.85rem;
        }
        .scanner-error {
          color: var(--color-danger);
          margin-bottom: 16px;
        }
        .scanner-container {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #000;
          margin-bottom: 16px;
        }
        .scanner-viewport {
          width: 100%;
          min-height: 300px;
        }
        .scanner-last-action {
          text-align: center;
          color: var(--color-success);
          font-weight: 500;
          margin-bottom: 8px;
        }
        .scanner-hint {
          text-align: center;
          color: var(--color-text-muted);
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  )
}
