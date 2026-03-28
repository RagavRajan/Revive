import type { DayRecord, DayStatus } from '../types'
import { isFutureDate, isWeekend, minutesSinceMidnight } from './date'

export function computeDayStatus(
  dateKey: string,
  record: DayRecord | undefined,
  holidays: Record<string, string>,
  deadlineMinutes: number,
): DayStatus {
  if (record?.isDayOff) return 'day-off'

  const checkIns = record?.events.filter(e => e.type === 'check-in') ?? []

  if (checkIns.length === 0) {
    if (holidays[dateKey]) return 'holiday'
    if (isWeekend(dateKey)) return 'weekend'
    if (isFutureDate(dateKey)) return 'future'
    return 'no-record'
  }

  if (isFutureDate(dateKey)) return 'future'

  const firstCheckIn = checkIns.reduce((earliest, e) =>
    e.timestamp < earliest.timestamp ? e : earliest
  )

  const checkInMinutes = minutesSinceMidnight(new Date(firstCheckIn.timestamp))
  return checkInMinutes <= deadlineMinutes ? 'on-time' : 'missed'
}
