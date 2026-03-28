import type { DayStatus } from '../../types'
import { isToday } from '../../utils/date'
import { HOLIDAYS_2026 } from '../../utils/constants'

interface Props {
  dateKey: string
  dayNumber: number
  status: DayStatus
  onClick: (dateKey: string) => void
}

export function CalendarDay({ dateKey, dayNumber, status, onClick }: Props) {
  const today = isToday(dateKey)
  const isPast = status !== 'future' && status !== 'holiday' && status !== 'weekend'
  const noShow = isPast && status === 'no-record'
  const isOff = status === 'day-off' || status === 'holiday' || status === 'weekend'
  const holidayName = HOLIDAYS_2026[dateKey]

  const statusClass =
    status === 'on-time' ? 'day-on-time' :
    status === 'missed' ? 'day-late' :
    noShow ? 'day-absent' :
    status === 'holiday' ? 'day-holiday' :
    status === 'weekend' ? 'day-weekend' :
    status === 'day-off' ? 'day-off' :
    status === 'future' ? 'day-future' :
    'day-empty'

  return (
    <button
      className={`calendar-day ${statusClass} ${today ? 'day-today' : ''}`}
      onClick={() => onClick(dateKey)}
      title={holidayName || undefined}
    >
      <span className="day-number">{dayNumber}</span>
      {(status === 'on-time' || status === 'missed') && <span className="day-icon">&#10003;</span>}
      {noShow && <span className="day-icon">&#10007;</span>}
      {isOff && <span className="day-icon">&mdash;</span>}

      <style>{`
        .calendar-day {
          aspect-ratio: 1;
          border-radius: var(--radius);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          font-size: 0.85rem;
          transition: background var(--transition);
          position: relative;
        }
        .calendar-day:hover {
          background: var(--color-surface-hover);
        }
        .day-today {
          outline: 2px solid var(--color-primary);
          outline-offset: -2px;
        }
        .day-number {
          font-weight: 500;
        }
        .day-icon {
          font-size: 0.7rem;
          line-height: 1;
        }
        .day-on-time {
          background: var(--color-success-bg);
          color: var(--color-success);
        }
        .day-late {
          background: rgba(255, 152, 0, 0.15);
          color: #ff9800;
        }
        .day-absent {
          background: var(--color-danger-bg);
          color: var(--color-danger);
        }
        .day-holiday {
          background: rgba(108, 99, 255, 0.15);
          color: var(--color-primary);
        }
        .day-weekend {
          background: rgba(85, 85, 112, 0.1);
          color: var(--color-day-off);
        }
        .day-off {
          color: var(--color-day-off);
        }
        .day-future {
          color: var(--color-text-muted);
          opacity: 0.5;
        }
        .day-empty {
          color: var(--color-text-muted);
        }
      `}</style>
    </button>
  )
}
