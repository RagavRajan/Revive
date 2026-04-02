import { useState, useEffect, useCallback } from 'react'
import { getAllRecords } from '../db/attendance'
import type { AppSettings, DayRecord } from '../types'
import { toDateKey, isWeekend } from '../utils/date'
import { HOLIDAYS_2026 } from '../utils/constants'

export function calculateStreak(records: DayRecord[]): number {
  const recordMap = new Map<string, DayRecord>()
  for (const r of records) {
    recordMap.set(r.date, r)
  }

  let streak = 0
  const d = new Date()

  const todayKey = toDateKey(d)
  const todayRecord = recordMap.get(todayKey)
  const todayHasCheckIn = todayRecord?.events.some(e => e.type === 'check-in') ?? false

  if (!todayHasCheckIn) {
    d.setDate(d.getDate() - 1)
  }

  while (true) {
    const key = toDateKey(d)
    const record = recordMap.get(key)

    if (isWeekend(key) || HOLIDAYS_2026[key] || record?.isDayOff) {
      d.setDate(d.getDate() - 1)
      continue
    }

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

interface UseStreakOptions {
  settings: AppSettings | null
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>
}

export function useStreak({ settings, updateSettings }: UseStreakOptions) {
  const [streak, setStreak] = useState(0)
  const [daysOff, setDaysOff] = useState(0)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const records = await getAllRecords()
    const computed = calculateStreak(records)
    setStreak(computed)
    setDaysOff(records.filter(r => r.isDayOff).length)
    setLoading(false)

    if (settings && computed > (settings.bestStreak ?? 0)) {
      updateSettings({ bestStreak: computed })
    }
  }, [settings, updateSettings])

  useEffect(() => {
    refresh()
  }, [refresh])

  const bestStreak = settings?.bestStreak ?? 0

  return { streak, bestStreak, daysOff, loading, refresh }
}
