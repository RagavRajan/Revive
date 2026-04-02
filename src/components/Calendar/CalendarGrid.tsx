import { useState, useMemo, useCallback } from 'react'
import type { AppSettings } from '../../types'
import { useCalendar } from '../../hooks/useCalendar'
import { useStreak } from '../../hooks/useStreak'
import { useMilestones } from '../../hooks/useMilestones'
import { getDaysInMonth, getFirstDayOfWeek, toDateKey, getRemainingWorkingDays, getTotalWorkingDays, isFutureDate } from '../../utils/date'
import { getMonthlyStats } from '../../utils/monthlyStats'
import { HOLIDAYS_2026 } from '../../utils/constants'
import { MonthNavigator } from './MonthNavigator'
import { CalendarDay } from './CalendarDay'
import { DayDetail } from './DayDetail'
import { MilestoneCelebration } from '../Celebrations/MilestoneCelebration'

interface Props {
  settings: AppSettings | null
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>
  statsOpen: boolean
  onStatsClose: () => void
  uid: string
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function CalendarGrid({ settings, updateSettings, statsOpen, onStatsClose, uid }: Props) {
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

  const allBreakDates = Object.keys(HOLIDAYS_2026)
  const totalBreaks = allBreakDates.length
  const usedBreaks = allBreakDates.filter(d => !isFutureDate(d)).length
  const breakPct = totalBreaks > 0 ? (usedBreaks / totalBreaks) * 100 : 0

  const streakIsBest = streak > 0 && streak >= bestStreak

  const base = `${window.location.origin}${window.location.pathname}`
  const shareUrl = `${base}#/shared/${uid}`
  const widgetUrl = `${base}#/widget/${uid}`

  const [copied, setCopied] = useState<'share' | 'widget' | null>(null)
  const copyLink = useCallback((url: string, type: 'share' | 'widget') => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    })
  }, [])

  return (
    <div className="calendar">
      <MonthNavigator year={year} month={month} onPrev={prevMonth} onNext={nextMonth} />

      <div className="calendar-grid">
        {DAY_LABELS.map(label => (
          <div key={label} className="calendar-header">{label}</div>
        ))}
        {cells}
      </div>

      {selectedDay && (
        <DayDetail dateKey={selectedDay} onClose={handleDetailClose} onUpdate={handleDetailUpdate} />
      )}

      {activeMilestone && (
        <MilestoneCelebration milestone={activeMilestone} onDismiss={dismissMilestone} />
      )}

      {/* Stats Sidebar */}
      {statsOpen && <div className="stats-backdrop" onClick={() => onStatsClose()} />}
      <div className={`stats-sidebar ${statsOpen ? 'stats-open' : ''}`}>
        <div className="stats-header">
          <h3>Stats</h3>
          <button className="stats-close" onClick={() => onStatsClose()}>&times;</button>
        </div>

        <div className="stats-section">
          <div className="stats-streak">
            <span className="streak-icon">&#128293;</span>
            <span className="streak-count">{streak}</span>
            <span className="streak-label">day streak</span>
          </div>
          {bestStreak > 0 && (
            <div className="streak-best">
              {streakIsBest ? 'Personal best!' : `Best: ${bestStreak} days`}
            </div>
          )}
        </div>

        {monthly.totalWorking > 0 && (
          <div className="stats-section">
            <div className="stats-section-title">This Month</div>
            <div className="stats-monthly">
              <span className="stats-monthly-num">{monthly.attended}/{monthly.totalWorking}</span>
              <span className="stats-monthly-pct">{monthly.percentage}%</span>
            </div>
          </div>
        )}

        <div className="stats-section">
          <div className="stats-section-title">Year Progress</div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${remainingPct}%`, background: `hsl(${barHue}, 70%, 50%)` }} />
          </div>
          <div className="progress-bar-label">
            <span style={{ color: `hsl(${barHue}, 70%, 50%)` }}>{remainingDays}</span>/{totalDays} remaining
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-section-title">Break Days</div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${breakPct}%`, background: 'var(--color-primary)' }} />
          </div>
          <div className="progress-bar-label">
            <span style={{ color: 'var(--color-primary)' }}>{usedBreaks}</span>/{totalBreaks} used
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-section-title">Share Link</div>
          <div className="stats-link-row">
            <code className="stats-link-url">{shareUrl}</code>
            <button className="stats-link-copy" onClick={() => copyLink(shareUrl, 'share')}>
              {copied === 'share' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-section-title">Widget Link</div>
          <div className="stats-link-row">
            <code className="stats-link-url">{widgetUrl}</code>
            <button className="stats-link-copy" onClick={() => copyLink(widgetUrl, 'widget')}>
              {copied === 'widget' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .calendar {
          padding: 24px 32px;
          max-width: 700px;
          width: 100%;
          margin: 0 auto;
        }
        .stats-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 60;
        }
        .stats-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 300px;
          max-width: 85vw;
          background: var(--color-bg);
          border-left: 1px solid var(--color-border);
          z-index: 70;
          transform: translateX(100%);
          transition: transform 0.25s ease;
          overflow-y: auto;
          padding: 24px;
        }
        .stats-open {
          transform: translateX(0);
        }
        .stats-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .stats-header h3 {
          font-size: 1.2rem;
          font-weight: 700;
        }
        .stats-close {
          font-size: 1.5rem;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius);
        }
        .stats-close:hover {
          background: var(--color-surface-hover);
        }
        .stats-section {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          padding: 16px;
          margin-bottom: 16px;
        }
        .stats-section-title {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--color-text-muted);
          margin-bottom: 10px;
        }
        .stats-streak {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .streak-icon { font-size: 1.8rem; }
        .streak-count { color: #ff9800; font-weight: 800; font-size: 2.2rem; line-height: 1; }
        .streak-label { color: var(--color-text-muted); font-size: 0.95rem; font-weight: 500; }
        .streak-best {
          text-align: center;
          color: var(--color-text-muted);
          font-size: 0.8rem;
          margin-top: 6px;
        }
        .stats-monthly {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }
        .stats-monthly-num {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-text);
        }
        .stats-monthly-pct {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        .progress-bar-track { width: 100%; height: 8px; background: var(--color-surface-hover); border-radius: 4px; overflow: hidden; }
        .progress-bar-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease, background 0.5s ease; }
        .progress-bar-label { text-align: center; color: var(--color-text-muted); font-size: 0.8rem; margin-top: 6px; }
        .progress-bar-label span { font-weight: 700; font-size: 0.95rem; }
        .stats-link-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stats-link-url {
          flex: 1;
          font-size: 0.7rem;
          background: var(--color-surface-hover);
          padding: 6px 8px;
          border-radius: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--color-text-muted);
        }
        .stats-link-copy {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-primary);
          padding: 6px 10px;
          border: 1px solid var(--color-primary);
          border-radius: var(--radius);
          white-space: nowrap;
          transition: background var(--transition);
        }
        .stats-link-copy:hover {
          background: rgba(108, 99, 255, 0.15);
        }
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
