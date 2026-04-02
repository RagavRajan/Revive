import { useState, useEffect, useCallback } from 'react'
import { collection, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../../firebase/config'
import type { DayRecord, DayStatus, AppSettings } from '../../types'
import { getMonthRange, getDaysInMonth, getFirstDayOfWeek, toDateKey, isFutureDate, minutesSinceMidnight, isWeekend, isToday } from '../../utils/date'
import { HOLIDAYS_2026 } from '../../utils/constants'

interface Props {
  uid: string
}

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function cellBg(status: DayStatus): string {
  switch (status) {
    case 'on-time': return 'var(--color-success-bg)'
    case 'missed': return 'rgba(255, 152, 0, 0.15)'
    case 'no-record': return 'var(--color-danger-bg)'
    case 'holiday': return 'rgba(108, 99, 255, 0.15)'
    case 'weekend': return 'rgba(85, 85, 112, 0.1)'
    case 'day-off': return 'rgba(85, 85, 112, 0.1)'
    case 'future': return 'transparent'
    default: return 'transparent'
  }
}

function cellColor(status: DayStatus): string {
  switch (status) {
    case 'on-time': return 'var(--color-success)'
    case 'missed': return '#ff9800'
    case 'no-record': return 'var(--color-danger)'
    case 'holiday': return 'var(--color-primary)'
    case 'weekend': return 'var(--color-day-off)'
    case 'day-off': return 'var(--color-day-off)'
    case 'future': return 'var(--color-text-muted)'
    default: return 'var(--color-text-muted)'
  }
}

export function WidgetCalendarView({ uid }: Props) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const [records, setRecords] = useState<Map<string, DayRecord>>(new Map())
  const [settings, setSettings] = useState<AppSettings | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const settingsRef = doc(db, 'users', uid, 'settings', 'app')
      const settingsSnap = await getDoc(settingsRef)
      if (settingsSnap.exists()) setSettings(settingsSnap.data() as AppSettings)

      const { start, end } = getMonthRange(year, month)
      const daysRef = collection(db, 'users', uid, 'days')
      const q = query(daysRef, where('date', '>=', start), where('date', '<=', end), orderBy('date'))
      const snap = await getDocs(q)
      const map = new Map<string, DayRecord>()
      for (const d of snap.docs) {
        const record = d.data() as DayRecord
        map.set(record.date, record)
      }
      setRecords(map)
    } catch {
      // silent fail for widget
    } finally {
      setLoading(false)
    }
  }, [uid, year, month])

  useEffect(() => { fetchData() }, [fetchData])

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchData])

  const getDayStatus = (dateKey: string): DayStatus => {
    const record = records.get(dateKey)
    if (record?.isDayOff) return 'day-off'
    const checkIns = record?.events.filter(e => e.type === 'check-in') ?? []
    if (checkIns.length === 0) {
      if (HOLIDAYS_2026[dateKey]) return 'holiday'
      if (isWeekend(dateKey)) return 'weekend'
      if (isFutureDate(dateKey)) return 'future'
      return 'no-record'
    }
    if (isFutureDate(dateKey)) return 'future'
    const firstCheckIn = checkIns.reduce((a, b) => a.timestamp < b.timestamp ? a : b)
    const deadline = settings?.deadlineMinutes ?? 540
    return minutesSinceMidnight(new Date(firstCheckIn.timestamp)) <= deadline ? 'on-time' : 'missed'
  }

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfWeek(year, month)

  const cells: React.ReactNode[] = []
  for (let i = 0; i < firstDay; i++) cells.push(<div key={`e-${i}`} className="w-cell" />)
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = toDateKey(new Date(year, month, day))
    const status = getDayStatus(dateKey)
    const today = isToday(dateKey)
    cells.push(
      <div key={dateKey} className={`w-cell ${today ? 'w-today' : ''}`} style={{ background: cellBg(status), color: cellColor(status) }}>
        <span className="w-num">{day}</span>
      </div>
    )
  }

  const shareUrl = `${window.location.origin}${window.location.pathname}#/shared/${uid}`

  return (
    <div className="widget" onClick={() => window.open(shareUrl, '_blank')}>
      <div className="w-header">
        <span className="w-title">Revive</span>
        <span className="w-month">{MONTH_SHORT[month]} {year}</span>
      </div>

      {loading ? (
        <div className="w-loading">...</div>
      ) : (
        <div className="w-grid">
          {'MTWTFSS'.split('').map((l, i) => (
            <div key={i} className="w-day-label">{l}</div>
          ))}
          {cells}
        </div>
      )}

      <style>{`
        .widget {
          background: var(--color-bg);
          padding: 12px;
          border-radius: var(--radius-lg);
          max-width: 320px;
          margin: 0 auto;
          cursor: pointer;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .w-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          padding: 0 2px;
        }
        .w-title {
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--color-primary);
        }
        .w-month {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }
        .w-loading {
          text-align: center;
          color: var(--color-text-muted);
          padding: 24px;
        }
        .w-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
        }
        .w-day-label {
          text-align: center;
          font-size: 0.6rem;
          color: var(--color-text-muted);
          font-weight: 600;
          padding: 2px 0 4px;
        }
        .w-cell {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }
        .w-today {
          outline: 1.5px solid var(--color-primary);
          outline-offset: -1px;
        }
        .w-num {
          font-size: 0.65rem;
          font-weight: 600;
          line-height: 1;
        }
      `}</style>
    </div>
  )
}
