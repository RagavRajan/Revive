import { useState } from 'react'
import type { AppSettings } from '../../types'
import { BarcodeRegistration } from '../Scanner/BarcodeRegistration'
import { CsvExport } from './CsvExport'

interface Props {
  settings: AppSettings
  onUpdate: (updates: Partial<AppSettings>) => Promise<void>
  onSignOut: () => Promise<void>
}

export function SettingsPage({ settings, onUpdate, onSignOut }: Props) {
  const [showRegistration, setShowRegistration] = useState(false)

  const hours = Math.floor(settings.deadlineMinutes / 60)
  const minutes = settings.deadlineMinutes % 60
  const timeValue = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [h, m] = e.target.value.split(':').map(Number)
    onUpdate({ deadlineMinutes: h * 60 + m })
  }

  const handleRegistered = (barcode: string) => {
    onUpdate({ registeredBarcode: barcode })
    setShowRegistration(false)
  }

  if (showRegistration) {
    return (
      <div>
        <div className="settings-back">
          <button className="btn btn-outline" onClick={() => setShowRegistration(false)}>
            Back to Settings
          </button>
        </div>
        <BarcodeRegistration
          onRegistered={handleRegistered}
          currentBarcode={settings.registeredBarcode}
        />
        <style>{`
          .settings-back { padding: 16px 24px 0; }
        `}</style>
      </div>
    )
  }

  return (
    <div className="settings">
      <h2>Settings</h2>

      <div className="settings-group">
        <label className="settings-label">Check-in Deadline</label>
        <p className="settings-hint">First check-in must be before this time</p>
        <input
          type="time"
          value={timeValue}
          onChange={handleTimeChange}
        />
      </div>

      <div className="settings-group">
        <label className="settings-label">Registered Barcode</label>
        <p className="settings-hint">
          {settings.registeredBarcode
            ? <>Current: <code>{settings.registeredBarcode}</code></>
            : 'No barcode registered'}
        </p>
        <button className="btn btn-outline" onClick={() => setShowRegistration(true)}>
          {settings.registeredBarcode ? 'Change Barcode' : 'Register Barcode'}
        </button>
      </div>

      <div className="settings-group">
        <label className="settings-label">Export Data</label>
        <p className="settings-hint">Download all attendance records as CSV</p>
        <CsvExport />
      </div>

      <div className="settings-group">
        <label className="settings-label">Account</label>
        <p className="settings-hint">Sign out of your Google account</p>
        <button className="btn btn-danger" onClick={onSignOut}>
          Sign Out
        </button>
      </div>

      <style>{`
        .settings {
          padding: 24px;
          max-width: 500px;
          margin: 0 auto;
        }
        .settings h2 {
          margin-bottom: 24px;
        }
        .settings-group {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          padding: 16px;
          margin-bottom: 16px;
        }
        .settings-label {
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }
        .settings-hint {
          color: var(--color-text-muted);
          font-size: 0.85rem;
          margin-bottom: 12px;
        }
        .settings-hint code {
          background: var(--color-surface-hover);
          padding: 2px 6px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}
