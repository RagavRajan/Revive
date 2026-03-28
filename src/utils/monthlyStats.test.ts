import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getMonthlyStats } from './monthlyStats'
import type { DayRecord } from '../types'

function makeDay(dateKey: string, hasCheckIn: boolean, isDayOff = false): DayRecord {
  return {
    date: dateKey,
    events: hasCheckIn ? [{
      id: crypto.randomUUID(),
      type: 'check-in',
      timestamp: Date.now(),
      autoClose: false,
    }] : [],
    isDayOff,
  }
}

describe('getMonthlyStats', () => {
  beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date(2026, 2, 28)) }) // Mar 28
  afterEach(() => { vi.useRealTimers() })

  it('empty records for past month', () => {
    const stats = getMonthlyStats(2026, 1, new Map(), {}) // Feb 2026
    expect(stats.attended).toBe(0)
    expect(stats.totalWorking).toBe(20) // 20 weekdays in Feb 2026
    expect(stats.percentage).toBe(0)
  })

  it('excludes weekends', () => {
    const stats = getMonthlyStats(2026, 1, new Map(), {}) // Feb 2026
    // Feb has 28 days, 20 weekdays
    expect(stats.totalWorking).toBe(20)
  })

  it('excludes holidays', () => {
    const holidays = { '2026-02-02': 'Test Holiday' } // Monday
    const stats = getMonthlyStats(2026, 1, new Map(), holidays)
    expect(stats.totalWorking).toBe(19) // 20 - 1
  })

  it('counts attended days', () => {
    const records = new Map<string, DayRecord>()
    records.set('2026-02-02', makeDay('2026-02-02', true))
    records.set('2026-02-03', makeDay('2026-02-03', true))
    const stats = getMonthlyStats(2026, 1, records, {})
    expect(stats.attended).toBe(2)
    expect(stats.percentage).toBe(10) // 2/20 = 10%
  })

  it('excludes day-offs from total', () => {
    const records = new Map<string, DayRecord>()
    records.set('2026-02-02', makeDay('2026-02-02', false, true))
    const stats = getMonthlyStats(2026, 1, records, {})
    expect(stats.totalWorking).toBe(19) // 20 - 1 day off
  })

  it('stops at today for current month', () => {
    // Mar 28 is a Saturday, so last working day counted should be Mar 27 (Fri)
    const stats = getMonthlyStats(2026, 2, new Map(), {})
    // Mar 1 is Sun, so working days: Mon 2 - Fri 6, Mon 9 - Fri 13, Mon 16 - Fri 20, Mon 23 - Fri 27 = 20
    expect(stats.totalWorking).toBe(20)
  })

  it('returns 0 for future month', () => {
    const stats = getMonthlyStats(2026, 3, new Map(), {}) // April — all future
    expect(stats.totalWorking).toBe(0)
    expect(stats.percentage).toBe(0)
  })
})
