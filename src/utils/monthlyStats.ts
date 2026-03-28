import type { DayRecord } from '../types'
import { toDateKey, getDaysInMonth, isWeekend, isFutureDate } from './date'

export function getMonthlyStats(
  year: number,
  month: number,
  records: Map<string, DayRecord>,
  holidays: Record<string, string>,
): { attended: number; totalWorking: number; percentage: number } {
  const days = getDaysInMonth(year, month)
  let attended = 0
  let totalWorking = 0

  for (let day = 1; day <= days; day++) {
    const dateKey = toDateKey(new Date(year, month, day))

    if (isFutureDate(dateKey)) break
    if (isWeekend(dateKey)) continue
    if (holidays[dateKey]) continue

    const record = records.get(dateKey)
    if (record?.isDayOff) continue

    totalWorking++
    const hasCheckIn = record?.events.some(e => e.type === 'check-in') ?? false
    if (hasCheckIn) attended++
  }

  const percentage = totalWorking > 0 ? Math.round((attended / totalWorking) * 100) : 0

  return { attended, totalWorking, percentage }
}
