import { useState, useMemo } from 'react'
import type { AppSettings } from '../../types'
import { useCalendar } from '../../hooks/useCalendar'
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
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const currentYear = new Date().getFullYear()
  const remainingDays = useMemo(() => getRemainingWorkingDays(HOLIDAYS_2026), [])
  const totalDays = useMemo(() => getTotalWorkingDays(currentYear, HOLIDAYS_2026), [currentYear])

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

      <div className="calendar-remaining">
        <span>{remainingDays}/{totalDays}</span> working days remaining in {currentYear}
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
        .calendar-remaining {
          text-align: center;
          color: var(--color-text-muted);
          font-size: 0.85rem;
          margin-top: 16px;
        }
        .calendar-remaining span {
          color: var(--color-primary);
          font-weight: 700;
          font-size: 1.1rem;
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
