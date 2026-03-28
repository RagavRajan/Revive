import { useState, useMemo } from 'react'
import type { AppSettings } from '../../types'
import { useCalendar } from '../../hooks/useCalendar'
import { useStreak } from '../../hooks/useStreak'
import { useMilestones } from '../../hooks/useMilestones'
import { getDaysInMonth, getFirstDayOfWeek, toDateKey, getRemainingWorkingDays, getTotalWorkingDays } from '../../utils/date'
import { getMonthlyStats } from '../../utils/monthlyStats'
import { HOLIDAYS_2026 } from '../../utils/constants'
import { MonthNavigator } from './MonthNavigator'
import { CalendarDay } from './CalendarDay'
import { DayDetail } from './DayDetail'
import { MilestoneCelebration } from '../Celebrations/MilestoneCelebration'

interface Props {
  settings: AppSettings | null
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function CalendarGrid({ settings, updateSettings }: Props) {
  const { year, month, records, prevMonth, nextMonth, getDayStatus, refresh } = useCalendar(settings)
  const { streak, bestStreak, refresh: refreshStreak } = useStreak({ settings, updateSettings })
  const { activeMilestone, dismissMilestone } = useMilestones({ streak, settings, updateSettings })
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const currentYear = new Date().getFullYear()
  const remainingDays = useMemo(() => getRemainingWorkingDays(HOLIDAYS_2026), [])
  const totalDays = useMemo(() => getTotalWorkingDays(currentYear, HOLIDAYS_2026), [currentYear])
  const remainingPct = totalDays > 0 ? (remainingDays / totalDays) * 100 : 0
  const barHue = Math.round(remainingPct * 1.2)

  const monthly = useMemo(
    () => getMonthlyStats(year, month, records, HOLIDAYS_2026),
    [year, month, records],
  )

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfWeek(year, month)

  const handleDayClick = (dateKey: string) => setSelectedDay(dateKey)
  const handleDetailClose = () => setSelectedDay(null)
  const handleDetailUpdate = () => { refresh(); refreshStreak() }

  const cells: React.ReactNode[] = []
  for (let i = 0; i < firstDay; i++) cells.push(<div key={`empty-${i}`} />)
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = toDateKey(new Date(year, month, day))
    cells.push(
      <CalendarDay key={dateKey} dateKey={dateKey} dayNumber={day} status={getDayStatus(dateKey)} onClick={handleDayClick} />
    )
  }

  const streakIsBest = streak > 0 && streak >= bestStreak

  return (
    <div className="calendar">
      <div className="calendar-streak">
        <span className="streak-icon">&#128293;</span>
        <span className="streak-count">{streak}</span>
        <span className="streak-label">day streak</span>
        {bestStreak > 0 && (
          <span className="streak-best">
            {streakIsBest ? '(personal best!)' : `(best: ${bestStreak})`}
          </span>
        )}
      </div>

      <MonthNavigator year={year} month={month} onPrev={prevMonth} onNext={nextMonth} />

      <div className="calendar-grid">
        {DAY_LABELS.map(label => (
          <div key={label} className="calendar-header">{label}</div>
        ))}
        {cells}
      </div>

      {monthly.totalWorking > 0 && (
        <div className="monthly-stats">
          {monthly.attended}/{monthly.totalWorking} days — {monthly.percentage}%
        </div>
      )}

      <div className="calendar-footer">
        <div className="progress-bar-container">
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${remainingPct}%`, background: `hsl(${barHue}, 70%, 50%)` }} />
          </div>
          <div className="progress-bar-label">
            <span style={{ color: `hsl(${barHue}, 70%, 50%)` }}>{remainingDays}</span>/{totalDays} working days remaining
          </div>
        </div>
      </div>

      {selectedDay && (
        <DayDetail dateKey={selectedDay} onClose={handleDetailClose} onUpdate={handleDetailUpdate} />
      )}

      {activeMilestone && (
        <MilestoneCelebration milestone={activeMilestone} onDismiss={dismissMilestone} />
      )}

      <style>{`
        .calendar {
          padding: 24px 32px;
          max-width: 700px;
          width: 100%;
          margin: 0 auto;
        }
        .calendar-streak {
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .streak-icon { font-size: 2rem; }
        .streak-count { color: #ff9800; font-weight: 800; font-size: 2.5rem; line-height: 1; }
        .streak-label { color: var(--color-text-muted); font-size: 1rem; font-weight: 500; }
        .streak-best { color: var(--color-text-muted); font-size: 0.8rem; }
        .monthly-stats {
          text-align: center;
          color: var(--color-text-muted);
          font-size: 0.9rem;
          margin-top: 12px;
          font-weight: 500;
        }
        .calendar-footer {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .progress-bar-container { width: 100%; }
        .progress-bar-track { width: 100%; height: 8px; background: var(--color-surface); border-radius: 4px; overflow: hidden; }
        .progress-bar-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease, background 0.5s ease; }
        .progress-bar-label { text-align: center; color: var(--color-text-muted); font-size: 0.8rem; margin-top: 6px; }
        .progress-bar-label span { font-weight: 700; font-size: 0.95rem; }
        .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
        .calendar-header {
          text-align: center; font-size: 0.85rem; font-weight: 600;
          color: var(--color-text-muted); padding: 10px 0;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  )
}
