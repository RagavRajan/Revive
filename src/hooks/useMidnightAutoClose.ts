import { useEffect } from 'react'
import { getDayRecord, saveDayRecord, isCheckedIn, getAllRecords } from '../db/attendance'
import { toDateKey } from '../utils/date'

async function autoCloseDay(dateKey: string) {
  const record = await getDayRecord(dateKey)
  if (record && isCheckedIn(record)) {
    const [y, m, d] = dateKey.split('-').map(Number)
    const endOfDay = new Date(y, m - 1, d, 23, 59, 59, 999)
    record.events.push({
      id: crypto.randomUUID(),
      type: 'check-out',
      timestamp: endOfDay.getTime(),
      autoClose: true,
    })
    await saveDayRecord(record)
  }
}

async function reconcilePastSessions() {
  const today = toDateKey(new Date())
  const allRecords = await getAllRecords()
  for (const record of allRecords) {
    if (record.date < today && isCheckedIn(record)) {
      await autoCloseDay(record.date)
    }
  }
}

export function useMidnightAutoClose(onAutoClose?: () => void) {
  useEffect(() => {
    // Reconcile any past unclosed sessions on startup
    reconcilePastSessions().then(() => onAutoClose?.())

    const scheduleCheck = () => {
      const now = new Date()
      const midnight = new Date(now)
      midnight.setHours(24, 0, 0, 0)
      const msUntilMidnight = midnight.getTime() - now.getTime()

      return setTimeout(async () => {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        await autoCloseDay(toDateKey(yesterday))
        onAutoClose?.()
        timeoutId = scheduleCheck()
      }, msUntilMidnight + 500)
    }

    let timeoutId = scheduleCheck()
    return () => clearTimeout(timeoutId)
  }, [onAutoClose])
}
