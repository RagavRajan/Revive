import { useState, useEffect, useCallback } from 'react'
import type { DayRecord, DayStatus, AppSettings } from '../types'
import { getMonthRecords } from '../db/attendance'
import { getMonthRange, isFutureDate, minutesSinceMidnight } from '../utils/date'

export function useCalendar(settings: AppSettings | null) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [records, setRecords] = useState<Map<string, DayRecord>>(new Map())
  const [loading, setLoading] = useState(true)

  const fetchMonth = useCallback(async () => {
    setLoading(true)
    const { start, end } = getMonthRange(year, month)
    const dayRecords = await getMonthRecords(start, end)
    const map = new Map<string, DayRecord>()
    for (const r of dayRecords) {
      map.set(r.date, r)
    }
    setRecords(map)
    setLoading(false)
  }, [year, month])

  useEffect(() => {
    fetchMonth()
  }, [fetchMonth])

  const prevMonth = useCallback(() => {
    if (month === 0) {
      setYear(y => y - 1)
      setMonth(11)
    } else {
      setMonth(m => m - 1)
    }
  }, [month])

  const nextMonth = useCallback(() => {
    if (month === 11) {
      setYear(y => y + 1)
      setMonth(0)
    } else {
      setMonth(m => m + 1)
    }
  }, [month])

  const getDayStatus = useCallback((dateKey: string): DayStatus => {
    if (isFutureDate(dateKey)) return 'future'

    const record = records.get(dateKey)
    if (!record) return 'no-record'
    if (record.isDayOff) return 'day-off'

    const checkIns = record.events.filter(e => e.type === 'check-in')
    if (checkIns.length === 0) return 'no-record'

    const firstCheckIn = checkIns.reduce((earliest, e) =>
      e.timestamp < earliest.timestamp ? e : earliest
    )

    const deadline = settings?.deadlineMinutes ?? 540
    const checkInMinutes = minutesSinceMidnight(new Date(firstCheckIn.timestamp))
    return checkInMinutes <= deadline ? 'on-time' : 'missed'
  }, [records, settings])

  return { year, month, records, loading, prevMonth, nextMonth, getDayStatus, refresh: fetchMonth }
}
