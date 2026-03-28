import { useState, useCallback, useEffect, useRef } from 'react'
import { useScanner } from '../../hooks/useScanner'

interface ScannerPanelProps {
  onScan: (value: string) => void
  elementId: string
}

function ScannerPanel({ onScan, elementId }: ScannerPanelProps) {
  const processedRef = useRef(false)
  const activeRef = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => { activeRef.current = true }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const guardedScan = useCallback((value: string) => {
    if (!activeRef.current || processedRef.current) return
    processedRef.current = true
    onScan(value)
  }, [onScan])

  const { start, stop, error } = useScanner({ onScan: guardedScan, elementId })

  useEffect(() => {
    start()
    return () => { stop() }
  }, [start, stop])

  return (
    <>
      {error && <p className="registration-error">{error}</p>}
      <div className="scanner-container">
        <div id={elementId} className="scanner-viewport" />
      </div>
    </>
  )
}

type Step =
  | 'verify-scan'
  | 'verify-confirm'
  | 'new-scan'
  | 'new-confirm'

interface Props {
  onRegistered: (barcode: string) => void
  currentBarcode?: string | null
}

export function BarcodeRegistration({ onRegistered, currentBarcode }: Props) {
  const initialStep: Step = currentBarcode ? 'verify-scan' : 'new-scan'
  const [step, setStep] = useState<Step>(initialStep)
  const [verifyValue, setVerifyValue] = useState<string | null>(null)
  const [newValue, setNewValue] = useState<string | null>(null)

  // Step 1: Scan old barcode
  const handleVerifyScan = useCallback((value: string) => {
    setVerifyValue(value)
    setStep('verify-confirm')
  }, [])

  // Step 1 confirm: check match
  const handleVerifyConfirm = () => {
    if (verifyValue === currentBarcode) {
      setStep('new-scan')
    } else {
      // Mismatch — go back to scan
      setVerifyValue(null)
      setStep('verify-scan')
    }
  }

  const handleVerifyRetry = () => {
    setVerifyValue(null)
    setStep('verify-scan')
  }

  // Step 2: Scan new barcode
  const handleNewScan = useCallback((value: string) => {
    setNewValue(value)
    setStep('new-confirm')
  }, [])

  // Step 2 confirm: register
  const handleNewConfirm = () => {
    if (newValue) {
      onRegistered(newValue)
    }
  }

  const handleNewRetry = () => {
    setNewValue(null)
    setStep('new-scan')
  }

  const verifyMatch = verifyValue === currentBarcode

  return (
    <div className="registration">
      {step === 'verify-scan' && (
        <>
          <div className="registration-step">Step 1 of 2</div>
          <h2>Verify Current Barcode</h2>
          <p className="registration-desc">
            Scan the currently registered barcode to unlock re-registration.
          </p>
          <ScannerPanel
            key="verify"
            onScan={handleVerifyScan}
            elementId="barcode-verify"
          />
        </>
      )}

      {step === 'verify-confirm' && (
        <>
          <div className="registration-step">Step 1 of 2</div>
          <h2>Verify Current Barcode</h2>
          <div className="registration-confirm">
            <p>Scanned barcode:</p>
            <code className="registration-value">{verifyValue}</code>
            {!verifyMatch && (
              <p className="registration-error">
                Does not match the registered barcode.
              </p>
            )}
            <div className="registration-actions">
              {verifyMatch ? (
                <button className="btn btn-primary" onClick={handleVerifyConfirm}>
                  Confirmed — Next
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleVerifyConfirm}>
                  Try Again
                </button>
              )}
              <button className="btn btn-outline" onClick={handleVerifyRetry}>
                Scan Again
              </button>
            </div>
          </div>
        </>
      )}

      {step === 'new-scan' && (
        <>
          <div className="registration-step">
            {currentBarcode ? 'Step 2 of 2' : 'Registration'}
          </div>
          <h2>Register New Barcode</h2>
          <p className="registration-desc">
            Scan the barcode of the book you want to use for check-in.
          </p>
          <ScannerPanel
            key="register"
            onScan={handleNewScan}
            elementId="barcode-register"
          />
        </>
      )}

      {step === 'new-confirm' && (
        <>
          <div className="registration-step">
            {currentBarcode ? 'Step 2 of 2' : 'Registration'}
          </div>
          <h2>Confirm New Barcode</h2>
          <div className="registration-confirm">
            <p>Scanned barcode:</p>
            <code className="registration-value">{newValue}</code>
            <div className="registration-actions">
              <button className="btn btn-primary" onClick={handleNewConfirm}>
                Confirm
              </button>
              <button className="btn btn-outline" onClick={handleNewRetry}>
                Scan Again
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        .registration {
          padding: 24px;
          max-width: 500px;
          margin: 0 auto;
        }
        .registration-step {
          font-size: 0.8rem;
          color: var(--color-primary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .registration h2 {
          margin-bottom: 8px;
        }
        .registration-desc {
          color: var(--color-text-muted);
          margin-bottom: 16px;
        }
        .registration-error {
          color: var(--color-danger);
          margin-bottom: 16px;
        }
        .scanner-container {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #000;
        }
        .scanner-viewport {
          width: 100%;
          min-height: 300px;
        }
        .registration-confirm {
          text-align: center;
          padding: 24px 0;
        }
        .registration-value {
          display: block;
          font-size: 1.2rem;
          background: var(--color-surface);
          padding: 12px 16px;
          border-radius: var(--radius);
          margin: 12px 0 20px;
        }
        .registration-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}
