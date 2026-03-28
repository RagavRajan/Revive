import { useState, useMemo } from 'react'
import type { AppSettings } from '../../types'
import { useCalendar } from '../../hooks/useCalendar'
import { useStreak } from '../../hooks/useStreak'
import { getDaysInMonth, getFirstDayOfWeek, toDateKey, getRemainingWorkingDays, getTotalWorkingDays } from '../../utils/date'
import { HOLIDAYS_2026 } from '../../utils/constants'
import { MonthNavigator } from './MonthNavigator'
import { CalendarDay } from './CalendarDay'
import { DayDetail } from './DayDetail'

interface Props {
  settings: AppSettings | null
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function CalendarGrid({ settings }: Props) {
  const { year, month, prevMonth, nextMonth, getDayStatus, refresh } = useCalendar(settings)
  const { streak, refresh: refreshStreak } = useStreak()
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const currentYear = new Date().getFullYear()
  const remainingDays = useMemo(() => getRemainingWorkingDays(HOLIDAYS_2026), [])
  const totalDays = useMemo(() => getTotalWorkingDays(currentYear, HOLIDAYS_2026), [currentYear])
  const remainingPct = totalDays > 0 ? (remainingDays / totalDays) * 100 : 0
  // Green at 100% → yellow at 50% → red at 0%
  const barHue = Math.round(remainingPct * 1.2) // 120 (green) → 0 (red)

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfWeek(year, month)

  const handleDayClick = (dateKey: string) => {
    setSelectedDay(dateKey)
  }

  const handleDetailClose = () => {
    setSelectedDay(null)
  }

  const handleDetailUpdate = () => {
    refresh()
    refreshStreak()
  }

  // Build grid cells
  const cells: React.ReactNode[] = []

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} />)
  }

  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = toDateKey(new Date(year, month, day))
    const status = getDayStatus(dateKey)
    cells.push(
      <CalendarDay
        key={dateKey}
        dateKey={dateKey}
        dayNumber={day}
        status={status}
        onClick={handleDayClick}
      />
    )
  }

  return (
    <div className="calendar">
      <div className="calendar-streak">
        <span className="streak-icon">&#128293;</span>
        <span className="streak-count">{streak}</span>
        <span className="streak-label">day streak</span>
      </div>

      <MonthNavigator
        year={year}
        month={month}
        onPrev={prevMonth}
        onNext={nextMonth}
      />

      <div className="calendar-grid">
        {DAY_LABELS.map(label => (
          <div key={label} className="calendar-header">{label}</div>
        ))}
        {cells}
      </div>

      <div className="calendar-footer">
        <div className="progress-bar-container">
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{
                width: `${remainingPct}%`,
                background: `hsl(${barHue}, 70%, 50%)`,
              }}
            />
          </div>
          <div className="progress-bar-label">
            <span style={{ color: `hsl(${barHue}, 70%, 50%)` }}>{remainingDays}</span>/{totalDays} working days remaining
          </div>
        </div>
      </div>

      {selectedDay && (
        <DayDetail
          dateKey={selectedDay}
          onClose={handleDetailClose}
          onUpdate={handleDetailUpdate}
        />
      )}

      <style>{`
        .calendar {
          padding: 24px 32px;
          max-width: 700px;
          width: 100%;
          margin: 0 auto;
        }
        .calendar-footer {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .progress-bar-container {
          width: 100%;
        }
        .progress-bar-track {
          width: 100%;
          height: 8px;
          background: var(--color-surface);
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease, background 0.5s ease;
        }
        .progress-bar-label {
          text-align: center;
          color: var(--color-text-muted);
          font-size: 0.8rem;
          margin-top: 6px;
        }
        .progress-bar-label span {
          font-weight: 700;
          font-size: 0.95rem;
        }
        .calendar-streak {
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .streak-icon {
          font-size: 2rem;
        }
        .streak-count {
          color: #ff9800;
          font-weight: 800;
          font-size: 2.5rem;
          line-height: 1;
        }
        .streak-label {
          color: var(--color-text-muted);
          font-size: 1rem;
          font-weight: 500;
        }
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
        }
        .calendar-header {
          text-align: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-muted);
          padding: 10px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  )
}
