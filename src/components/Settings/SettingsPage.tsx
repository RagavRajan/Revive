import { useState } from 'react'
import type { AppSettings } from '../../types'
import { BarcodeRegistration } from '../Scanner/BarcodeRegistration'
import { CsvExport } from './CsvExport'

interface Props {
  settings: AppSettings
  onUpdate: (updates: Partial<AppSettings>) => Promise<void>
}

export function SettingsPage({ settings, onUpdate }: Props) {
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
        <label className="settings-label">Morning Reminder</label>
        <p className="settings-hint">Get a notification to remind you to check in</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            type="checkbox"
            checked={settings.reminderMinutes !== null}
            onChange={(e) => {
              if (e.target.checked) {
                Notification.requestPermission()
                onUpdate({ reminderMinutes: 450 }) // default 7:30 AM
              } else {
                onUpdate({ reminderMinutes: null })
              }
            }}
          />
          {settings.reminderMinutes !== null && (
            <input
              type="time"
              value={`${String(Math.floor(settings.reminderMinutes / 60)).padStart(2, '0')}:${String(settings.reminderMinutes % 60).padStart(2, '0')}`}
              onChange={(e) => {
                const [h, m] = e.target.value.split(':').map(Number)
                onUpdate({ reminderMinutes: h * 60 + m })
              }}
            />
          )}
        </div>
        {settings.reminderMinutes !== null && Notification.permission === 'denied' && (
          <p className="settings-hint" style={{ color: 'var(--color-danger)', marginTop: 8, marginBottom: 0 }}>
            Notifications are blocked. Enable them in browser settings.
          </p>
        )}
      </div>

      <div className="settings-group">
        <label className="settings-label">Export Data</label>
        <p className="settings-hint">Download all attendance records as CSV</p>
        <CsvExport />
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
