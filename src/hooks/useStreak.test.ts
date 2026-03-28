import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { calculateStreak } from './useStreak'
import type { DayRecord, AttendanceEvent } from '../types'

function makeCheckIn(dateKey: string, hour = 8): AttendanceEvent {
  const [y, m, d] = dateKey.split('-').map(Number)
  return {
    id: crypto.randomUUID(),
    type: 'check-in',
    timestamp: new Date(y, m - 1, d, hour).getTime(),
    autoClose: false,
  }
}

function makeDay(dateKey: string, hasCheckIn = true, isDayOff = false): DayRecord {
  return {
    date: dateKey,
    events: hasCheckIn ? [makeCheckIn(dateKey)] : [],
    isDayOff,
  }
}

describe('calculateStreak', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('no records → 0', () => {
    vi.setSystemTime(new Date(2026, 2, 25)) // Wednesday
    expect(calculateStreak([])).toBe(0)
  })

  it('today has check-in → streak includes today', () => {
    vi.setSystemTime(new Date(2026, 2, 25)) // Wednesday
    expect(calculateStreak([makeDay('2026-03-25')])).toBe(1)
  })

  it('consecutive working days', () => {
    vi.setSystemTime(new Date(2026, 2, 25)) // Wednesday
    expect(calculateStreak([
      makeDay('2026-03-25'), // Wed
      makeDay('2026-03-24'), // Tue
      makeDay('2026-03-23'), // Mon
    ])).toBe(3)
  })

  it('missed day breaks streak', () => {
    vi.setSystemTime(new Date(2026, 2, 25)) // Wednesday
    expect(calculateStreak([
      makeDay('2026-03-25'), // Wed — checked in
      // Mar 24 (Tue) — missing
      makeDay('2026-03-23'), // Mon — checked in
    ])).toBe(1) // only today counts
  })

  it('weekends are skipped', () => {
    vi.setSystemTime(new Date(2026, 2, 23)) // Monday
    expect(calculateStreak([
      makeDay('2026-03-23'), // Mon
      // Sat 21, Sun 22 — skipped
      makeDay('2026-03-20'), // Fri
    ])).toBe(2)
  })

  it('day-offs are skipped', () => {
    vi.setSystemTime(new Date(2026, 2, 25)) // Wednesday
    expect(calculateStreak([
      makeDay('2026-03-25'),                    // Wed — checked in
      makeDay('2026-03-24', false, true),        // Tue — day off (skipped)
      makeDay('2026-03-23'),                     // Mon — checked in
    ])).toBe(2)
  })

  it('today has no check-in → starts from yesterday', () => {
    vi.setSystemTime(new Date(2026, 2, 25)) // Wednesday
    expect(calculateStreak([
      makeDay('2026-03-24'), // Tue — checked in
      makeDay('2026-03-23'), // Mon — checked in
    ])).toBe(2) // today excluded since no check-in
  })
})
