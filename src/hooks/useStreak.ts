import { useState, useEffect, useCallback } from 'react'
import { getAllRecords } from '../db/attendance'
import type { DayRecord } from '../types'
import { toDateKey, isWeekend } from '../utils/date'
import { HOLIDAYS_2026 } from '../utils/constants'

function calculateStreak(records: DayRecord[]): number {
  const recordMap = new Map<string, DayRecord>()
  for (const r of records) {
    recordMap.set(r.date, r)
  }

  let streak = 0
  const d = new Date()

  // If today has no check-in yet, start checking from yesterday
  const todayKey = toDateKey(d)
  const todayRecord = recordMap.get(todayKey)
  const todayHasCheckIn = todayRecord?.events.some(e => e.type === 'check-in') ?? false

  if (!todayHasCheckIn) {
    d.setDate(d.getDate() - 1)
  }

  while (true) {
    const key = toDateKey(d)
    const record = recordMap.get(key)

    // Skip weekends, holidays, and manual day-offs
    if (isWeekend(key) || HOLIDAYS_2026[key] || record?.isDayOff) {
      d.setDate(d.getDate() - 1)
      continue
    }

    // Working day — check for check-in
    const hasCheckIn = record?.events.some(e => e.type === 'check-in') ?? false

    if (hasCheckIn) {
      streak++
      d.setDate(d.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

export function useStreak() {
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const records = await getAllRecords()
    setStreak(calculateStreak(records))
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { streak, loading, refresh }
}
