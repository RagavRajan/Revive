import { useState, useEffect, useCallback } from 'react'
import type { DayRecord } from '../types'
import { getDayRecord, addEvent, toggleDayOff, isCheckedIn } from '../db/attendance'
import { todayKey } from '../utils/date'

export function useAttendance() {
  const [todayRecord, setTodayRecord] = useState<DayRecord | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const record = await getDayRecord(todayKey())
    setTodayRecord(record)
  }, [])

  useEffect(() => {
    refresh().then(() => setLoading(false))
  }, [refresh])

  const checkedIn = isCheckedIn(todayRecord)
  const hasCheckedInToday = todayRecord?.events.some(e => e.type === 'check-in') ?? false

  const recordScan = useCallback(async () => {
    const eventType = checkedIn ? 'check-out' : 'check-in'
    const event = {
      id: crypto.randomUUID(),
      type: eventType as 'check-in' | 'check-out',
      timestamp: Date.now(),
      autoClose: false,
    }
    const updated = await addEvent(todayKey(), event)
    setTodayRecord(updated)
    return eventType
  }, [checkedIn])

  const toggleTodayDayOff = useCallback(async () => {
    const isMarkingOff = !todayRecord?.isDayOff
    const updated = await toggleDayOff(todayKey(), isMarkingOff)
    setTodayRecord(updated)
  }, [todayRecord])

  return { todayRecord, checkedIn, hasCheckedInToday, loading, recordScan, toggleTodayDayOff, refresh }
}
