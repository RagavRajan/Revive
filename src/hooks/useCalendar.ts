import { useState, useEffect, useCallback } from 'react'
import type { DayRecord, DayStatus, AppSettings } from '../types'
import { getMonthRecords } from '../db/attendance'
import { getMonthRange } from '../utils/date'
import { HOLIDAYS_2026 } from '../utils/constants'
import { computeDayStatus } from '../utils/dayStatus'

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
    const record = records.get(dateKey)
    const deadline = settings?.deadlineMinutes ?? 540
    return computeDayStatus(dateKey, record, HOLIDAYS_2026, deadline)
  }, [records, settings])

  return { year, month, records, loading, prevMonth, nextMonth, getDayStatus, refresh: fetchMonth }
}
