import type { DayStatus } from '../../types'
import { isToday } from '../../utils/date'

interface Props {
  dateKey: string
  dayNumber: number
  status: DayStatus
  onClick: (dateKey: string) => void
}

export function CalendarDay({ dateKey, dayNumber, status, onClick }: Props) {
  const today = isToday(dateKey)

  const statusClass =
    status === 'on-time' ? 'day-on-time' :
    status === 'missed' ? 'day-missed' :
    status === 'day-off' ? 'day-off' :
    status === 'future' ? 'day-future' :
    'day-empty'

  return (
    <button
      className={`calendar-day ${statusClass} ${today ? 'day-today' : ''}`}
      onClick={() => onClick(dateKey)}
    >
      <span className="day-number">{dayNumber}</span>
      {status === 'on-time' && <span className="day-icon">&#10003;</span>}
      {status === 'missed' && <span className="day-icon">&#10007;</span>}
      {status === 'day-off' && <span className="day-icon">&mdash;</span>}

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
        .day-missed {
          background: var(--color-danger-bg);
          color: var(--color-danger);
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
