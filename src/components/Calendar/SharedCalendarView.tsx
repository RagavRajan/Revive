import { useState, useEffect, useCallback, useMemo } from 'react'
import { collection, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../../firebase/config'
import type { DayRecord, DayStatus, AppSettings } from '../../types'
import { getMonthRange, getDaysInMonth, getFirstDayOfWeek, toDateKey, isFutureDate, minutesSinceMidnight, isWeekend, getRemainingWorkingDays, getTotalWorkingDays } from '../../utils/date'
import { HOLIDAYS_2026 } from '../../utils/constants'
import { MonthNavigator } from './MonthNavigator'
import { CalendarDay } from './CalendarDay'
import { DayDetail } from './DayDetail'

interface Props {
  uid: string
}

export function SharedCalendarView({ uid }: Props) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [records, setRecords] = useState<Map<string, DayRecord>>(new Map())
  const [settings, setSettings] = useState<AppSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const currentYear = now.getFullYear()
  const remainingDays = useMemo(() => getRemainingWorkingDays(HOLIDAYS_2026), [])
  const totalDays = useMemo(() => getTotalWorkingDays(currentYear, HOLIDAYS_2026), [currentYear])

  // Load settings once
  useEffect(() => {
    const settingsRef = doc(db, 'users', uid, 'settings', 'app')
    getDoc(settingsRef).then(snap => {
      if (snap.exists()) {
        setSettings(snap.data() as AppSettings)
      }
    }).catch(() => setError('Could not load calendar'))
  }, [uid])

  // Load month records
  const fetchMonth = useCallback(async () => {
    setLoading(true)
    try {
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
      setError(null)
    } catch {
      setError('Could not load calendar')
    } finally {
      setLoading(false)
    }
  }, [uid, year, month])

  useEffect(() => { fetchMonth() }, [fetchMonth])

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

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
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const cells: React.ReactNode[] = []
  for (let i = 0; i < firstDay; i++) cells.push(<div key={`e-${i}`} />)
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = toDateKey(new Date(year, month, day))
    cells.push(
      <CalendarDay
        key={dateKey}
        dateKey={dateKey}
        dayNumber={day}
        status={getDayStatus(dateKey)}
        onClick={setSelectedDay}
      />
    )
  }

  return (
    <div className="shared-view">
      <header className="shared-header">
        <h1 className="shared-title">Revive</h1>
        <span className="shared-badge">Shared View</span>
      </header>

      {error && <p className="shared-error">{error}</p>}

      <div className="calendar">
        <MonthNavigator year={year} month={month} onPrev={prevMonth} onNext={nextMonth} />
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</p>
        ) : (
          <div className="calendar-grid">
            {dayLabels.map(l => <div key={l} className="calendar-header">{l}</div>)}
            {cells}
          </div>
        )}
        <div className="calendar-remaining">
          <span>{remainingDays}/{totalDays}</span> working days remaining in {currentYear}
        </div>
      </div>

      {selectedDay && (
        <DayDetail
          dateKey={selectedDay}
          onClose={() => setSelectedDay(null)}
          onUpdate={() => {}}
          readOnly
          uid={uid}
        />
      )}

      <style>{`
        .shared-view {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .shared-header {
          padding: 12px 24px;
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .shared-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        .shared-badge {
          font-size: 0.75rem;
          background: var(--color-surface);
          color: var(--color-text-muted);
          padding: 4px 10px;
          border-radius: 999px;
          font-weight: 500;
        }
        .shared-error {
          color: var(--color-danger);
          text-align: center;
          padding: 24px;
        }
        .calendar {
          padding: 24px 32px;
          max-width: 700px;
          width: 100%;
          margin: 0 auto;
          flex: 1;
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
