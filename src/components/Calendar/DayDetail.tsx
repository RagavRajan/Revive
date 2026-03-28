import { useState, useEffect } from 'react'
import type { DayRecord } from '../../types'
import { getDayRecord, toggleDayOff } from '../../db/attendance'
import { formatTime, fromDateKey } from '../../utils/date'

interface Props {
  dateKey: string
  onClose: () => void
  onUpdate: () => void
}

export function DayDetail({ dateKey, onClose, onUpdate }: Props) {
  const [record, setRecord] = useState<DayRecord | null>(null)

  useEffect(() => {
    getDayRecord(dateKey).then(r => setRecord(r ?? null))
  }, [dateKey])

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

  return (
    <div className="day-detail-overlay" onClick={onClose}>
      <div className="day-detail" onClick={e => e.stopPropagation()}>
        <div className="day-detail-header">
          <h3>{formatted}</h3>
          <button className="day-detail-close" onClick={onClose}>&times;</button>
        </div>

        {record?.isDayOff && (
          <div className="day-detail-badge day-off-badge">Day Off</div>
        )}

        {sortedEvents.length > 0 ? (
          <div className="day-detail-timeline">
            {sortedEvents.map(event => (
              <div key={event.id} className="timeline-event">
                <div className={`timeline-dot ${event.type === 'check-in' ? 'dot-in' : 'dot-out'}`} />
                <div className="timeline-content">
                  <span className="timeline-type">
                    {event.type === 'check-in' ? 'Check In' : 'Check Out'}
                    {event.autoClose && ' (auto)'}
                  </span>
                  <span className="timeline-time">{formatTime(event.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="day-detail-empty">No events recorded</p>
        )}

        <button
          className={`btn ${record?.isDayOff ? 'btn-outline' : 'btn-primary'}`}
          onClick={handleToggleDayOff}
          style={{ width: '100%', marginTop: 16 }}
        >
          {record?.isDayOff ? 'Remove Day Off' : 'Mark as Day Off'}
        </button>
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
        }
        .day-detail {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          padding: 24px;
          max-width: 400px;
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
        .day-off-badge {
          background: var(--color-day-off);
          color: white;
        }
        .day-detail-timeline {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .timeline-event {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .timeline-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-in {
          background: var(--color-success);
        }
        .dot-out {
          background: var(--color-danger);
        }
        .timeline-content {
          display: flex;
          justify-content: space-between;
          flex: 1;
        }
        .timeline-type {
          font-weight: 500;
          font-size: 0.9rem;
        }
        .timeline-time {
          color: var(--color-text-muted);
          font-size: 0.9rem;
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
