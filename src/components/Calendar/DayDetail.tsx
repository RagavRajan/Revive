import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import type { DayRecord } from '../../types'
import { getDayRecord, toggleDayOff } from '../../db/attendance'
import { formatTime, fromDateKey, isWeekend } from '../../utils/date'
import { HOLIDAYS_2026 } from '../../utils/constants'

interface Props {
  dateKey: string
  onClose: () => void
  onUpdate: () => void
  readOnly?: boolean
  uid?: string
}

export function DayDetail({ dateKey, onClose, onUpdate, readOnly, uid }: Props) {
  const [record, setRecord] = useState<DayRecord | null>(null)

  useEffect(() => {
    if (readOnly && uid) {
      // Shared view: read directly from Firestore with the uid
      const ref = doc(db, 'users', uid, 'days', dateKey)
      getDoc(ref).then(snap => setRecord(snap.exists() ? snap.data() as DayRecord : null))
    } else {
      getDayRecord(dateKey).then(r => setRecord(r ?? null))
    }
  }, [dateKey, readOnly, uid])

  const date = fromDateKey(dateKey)
  const formatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)

  const handleToggleDayOff = async () => {
    const updated = await toggleDayOff(dateKey)
    setRecord(updated)
    onUpdate()
  }

  const sortedEvents = record
    ? [...record.events].sort((a, b) => a.timestamp - b.timestamp)
    : []

  // Calculate total hours from check-in/check-out pairs
  let totalMs = 0
  for (let i = 0; i < sortedEvents.length; i++) {
    if (sortedEvents[i].type === 'check-in') {
      const checkOut = sortedEvents.find((e, j) => j > i && e.type === 'check-out')
      if (checkOut) {
        totalMs += checkOut.timestamp - sortedEvents[i].timestamp
      }
    }
  }
  const totalHours = totalMs / (1000 * 60 * 60)
  const hours = Math.floor(totalHours)
  const mins = Math.round((totalHours - hours) * 60)

  return (
    <div className="day-detail-overlay" onClick={onClose}>
      <div className="day-detail" onClick={e => e.stopPropagation()}>
        <div className="day-detail-header">
          <h3>{formatted}</h3>
          <button className="day-detail-close" onClick={onClose}>&times;</button>
        </div>

        {HOLIDAYS_2026[dateKey] && (
          <div className="day-detail-badge holiday-badge">{HOLIDAYS_2026[dateKey]}</div>
        )}

        {isWeekend(dateKey) && !HOLIDAYS_2026[dateKey] && (
          <div className="day-detail-badge weekend-badge">Weekend</div>
        )}

        {record?.isDayOff && (
          <div className="day-detail-badge day-off-badge">Day Off</div>
        )}

        {sortedEvents.length > 0 ? (
          <div className="day-detail-sessions">
            <div className="session-header">
              <span className="session-col-num">#</span>
              <span className="session-col"><span className="session-dot dot-in" /> Check-In</span>
              <span className="session-col"><span className="session-dot dot-out" /> Check-Out</span>
            </div>
            {(() => {
              const sessions: { checkIn: typeof sortedEvents[0]; checkOut?: typeof sortedEvents[0] }[] = []
              for (let i = 0; i < sortedEvents.length; i++) {
                if (sortedEvents[i].type === 'check-in') {
                  const out = sortedEvents.find((e, j) => j > i && e.type === 'check-out')
                  sessions.push({ checkIn: sortedEvents[i], checkOut: out })
                  if (out) i = sortedEvents.indexOf(out)
                }
              }
              return sessions.map((s, i) => (
                <div key={s.checkIn.id} className="session-row">
                  <span className="session-col-num">{i + 1}</span>
                  <span className="session-col">{formatTime(s.checkIn.timestamp)}</span>
                  <span className="session-col">
                    {s.checkOut
                      ? <>{formatTime(s.checkOut.timestamp)}{s.checkOut.autoClose && ' (auto)'}</>
                      : <span className="session-active">Active</span>
                    }
                  </span>
                </div>
              ))
            })()}
          </div>
        ) : (
          <p className="day-detail-empty">No events recorded</p>
        )}

        {totalMs > 0 && (
          <div className="day-detail-hours">
            {hours}h {mins}m logged
          </div>
        )}

        {!readOnly && (
          <button
            className={`btn ${record?.isDayOff ? 'btn-outline' : 'btn-primary'}`}
            onClick={handleToggleDayOff}
            style={{ width: '100%', marginTop: 16 }}
          >
            {record?.isDayOff ? 'Remove Day Off' : 'Mark as Day Off'}
          </button>
        )}
      </div>

      <style>{`
        .day-detail-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 24px;
          overflow-y: auto;
        }
        .day-detail {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          padding: 24px;
          max-height: 80vh;
          overflow-y: auto;
          max-width: 550px;
          width: 100%;
          box-shadow: var(--shadow);
        }
        .day-detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .day-detail-header h3 {
          font-size: 1rem;
        }
        .day-detail-close {
          font-size: 1.5rem;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius);
        }
        .day-detail-close:hover {
          background: var(--color-surface-hover);
        }
        .day-detail-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 12px;
        }
        .holiday-badge {
          background: rgba(108, 99, 255, 0.2);
          color: var(--color-primary);
        }
        .weekend-badge {
          background: rgba(85, 85, 112, 0.2);
          color: var(--color-day-off);
        }
        .day-off-badge {
          background: var(--color-day-off);
          color: white;
        }
        .day-detail-sessions {
          background: var(--color-bg);
          border-radius: var(--radius);
          overflow: hidden;
        }
        .session-header {
          display: flex;
          padding: 8px 12px;
          border-bottom: 1px solid var(--color-border);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--color-text-muted);
        }
        .session-header .session-col {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .session-row {
          display: flex;
          padding: 10px 12px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .session-row + .session-row {
          border-top: 1px solid var(--color-border);
        }
        .session-col-num {
          width: 30px;
          flex-shrink: 0;
          color: var(--color-text-muted);
          font-size: 0.8rem;
        }
        .session-col {
          flex: 1;
        }
        .session-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
        .dot-in { background: var(--color-success); }
        .dot-out { background: var(--color-danger); }
        .session-active {
          color: var(--color-success);
          font-style: italic;
        }
        .day-detail-hours {
          text-align: center;
          margin-top: 16px;
          padding: 10px;
          background: var(--color-success-bg);
          border-radius: var(--radius);
          color: var(--color-success);
          font-weight: 600;
          font-size: 1.1rem;
        }
        .day-detail-empty {
          color: var(--color-text-muted);
          text-align: center;
          padding: 20px 0;
        }
      `}</style>
    </div>
  )
}
