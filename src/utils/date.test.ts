import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  toDateKey, fromDateKey, todayKey, minutesSinceMidnight,
  getMonthRange, getDaysInMonth, getFirstDayOfWeek,
  formatTime, minutesToTimeString,
  isFutureDate, isToday, isWeekend,
  getRemainingWorkingDays, getTotalWorkingDays,
} from './date'

describe('toDateKey', () => {
  it('formats date with zero-padded month and day', () => {
    expect(toDateKey(new Date(2026, 0, 5))).toBe('2026-01-05')
  })
  it('handles December 31', () => {
    expect(toDateKey(new Date(2026, 11, 31))).toBe('2026-12-31')
  })
  it('handles double-digit month and day', () => {
    expect(toDateKey(new Date(2026, 10, 28))).toBe('2026-11-28')
  })
})

describe('fromDateKey', () => {
  it('parses date key correctly', () => {
    const d = fromDateKey('2026-03-28')
    expect(d.getFullYear()).toBe(2026)
    expect(d.getMonth()).toBe(2) // 0-indexed
    expect(d.getDate()).toBe(28)
  })
  it('roundtrips with toDateKey', () => {
    const original = new Date(2026, 5, 15)
    expect(toDateKey(fromDateKey(toDateKey(original)))).toBe('2026-06-15')
  })
})

describe('todayKey', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('returns mocked date', () => {
    vi.setSystemTime(new Date(2026, 2, 28))
    expect(todayKey()).toBe('2026-03-28')
  })
})

describe('minutesSinceMidnight', () => {
  it('midnight is 0', () => {
    expect(minutesSinceMidnight(new Date(2026, 0, 1, 0, 0))).toBe(0)
  })
  it('9:00 AM is 540', () => {
    expect(minutesSinceMidnight(new Date(2026, 0, 1, 9, 0))).toBe(540)
  })
  it('11:59 PM is 1439', () => {
    expect(minutesSinceMidnight(new Date(2026, 0, 1, 23, 59))).toBe(1439)
  })
  it('12:30 PM is 750', () => {
    expect(minutesSinceMidnight(new Date(2026, 0, 1, 12, 30))).toBe(750)
  })
})

describe('getMonthRange', () => {
  it('January has 31 days', () => {
    expect(getMonthRange(2026, 0)).toEqual({ start: '2026-01-01', end: '2026-01-31' })
  })
  it('February 2026 has 28 days', () => {
    expect(getMonthRange(2026, 1)).toEqual({ start: '2026-02-01', end: '2026-02-28' })
  })
  it('February 2024 (leap) has 29 days', () => {
    expect(getMonthRange(2024, 1)).toEqual({ start: '2024-02-01', end: '2024-02-29' })
  })
  it('April has 30 days', () => {
    expect(getMonthRange(2026, 3)).toEqual({ start: '2026-04-01', end: '2026-04-30' })
  })
})

describe('getDaysInMonth', () => {
  it('January has 31', () => { expect(getDaysInMonth(2026, 0)).toBe(31) })
  it('April has 30', () => { expect(getDaysInMonth(2026, 3)).toBe(30) })
  it('Feb 2026 has 28', () => { expect(getDaysInMonth(2026, 1)).toBe(28) })
  it('Feb 2024 (leap) has 29', () => { expect(getDaysInMonth(2024, 1)).toBe(29) })
})

describe('getFirstDayOfWeek', () => {
  // Monday-based: 0=Mon, 6=Sun
  it('March 2026 starts on Sunday → 6', () => {
    expect(getFirstDayOfWeek(2026, 2)).toBe(6)
  })
  it('June 2026 starts on Monday → 0', () => {
    expect(getFirstDayOfWeek(2026, 5)).toBe(0)
  })
  it('April 2026 starts on Wednesday → 2', () => {
    expect(getFirstDayOfWeek(2026, 3)).toBe(2)
  })
})

describe('formatTime', () => {
  it('outputs AM/PM format', () => {
    const ts = new Date(2026, 2, 28, 14, 30).getTime()
    expect(formatTime(ts)).toMatch(/\d{1,2}:\d{2}\s[AP]M/)
  })
})

describe('minutesToTimeString', () => {
  it('midnight → 12:00 AM', () => { expect(minutesToTimeString(0)).toBe('12:00 AM') })
  it('540 → 9:00 AM', () => { expect(minutesToTimeString(540)).toBe('9:00 AM') })
  it('720 → 12:00 PM', () => { expect(minutesToTimeString(720)).toBe('12:00 PM') })
  it('780 → 1:00 PM', () => { expect(minutesToTimeString(780)).toBe('1:00 PM') })
  it('1439 → 11:59 PM', () => { expect(minutesToTimeString(1439)).toBe('11:59 PM') })
})

describe('isFutureDate', () => {
  beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date(2026, 2, 28)) })
  afterEach(() => { vi.useRealTimers() })

  it('tomorrow is future', () => { expect(isFutureDate('2026-03-29')).toBe(true) })
  it('today is not future', () => { expect(isFutureDate('2026-03-28')).toBe(false) })
  it('yesterday is not future', () => { expect(isFutureDate('2026-03-27')).toBe(false) })
})

describe('isToday', () => {
  beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date(2026, 2, 28)) })
  afterEach(() => { vi.useRealTimers() })

  it('today returns true', () => { expect(isToday('2026-03-28')).toBe(true) })
  it('yesterday returns false', () => { expect(isToday('2026-03-27')).toBe(false) })
})

describe('isWeekend', () => {
  it('Saturday is weekend', () => { expect(isWeekend('2026-03-28')).toBe(true) })
  it('Sunday is weekend', () => { expect(isWeekend('2026-03-29')).toBe(true) })
  it('Monday is not weekend', () => { expect(isWeekend('2026-03-30')).toBe(false) })
  it('Friday is not weekend', () => { expect(isWeekend('2026-04-03')).toBe(false) })
})

describe('getRemainingWorkingDays', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('starts counting from tomorrow', () => {
    // Dec 30 2026 is a Wednesday, Dec 31 is Thursday
    vi.setSystemTime(new Date(2026, 11, 30))
    expect(getRemainingWorkingDays({})).toBe(1) // only Dec 31
  })

  it('returns 0 on Dec 31', () => {
    vi.setSystemTime(new Date(2026, 11, 31))
    expect(getRemainingWorkingDays({})).toBe(0)
  })

  it('excludes weekends', () => {
    // Fri Dec 25 2026 is a Friday. Sat 26, Sun 27 are weekend. Mon 28-Thu 31 = 4 working days
    vi.setSystemTime(new Date(2026, 11, 25))
    expect(getRemainingWorkingDays({})).toBe(4) // 28,29,30,31
  })

  it('excludes holidays', () => {
    vi.setSystemTime(new Date(2026, 11, 25))
    // Mark Dec 28 as holiday
    expect(getRemainingWorkingDays({ '2026-12-28': 'Test' })).toBe(3) // 29,30,31
  })
})

describe('getTotalWorkingDays', () => {
  it('2026 without holidays has 261 working days', () => {
    expect(getTotalWorkingDays(2026, {})).toBe(261)
  })

  it('holidays reduce the count', () => {
    // One weekday holiday
    const result = getTotalWorkingDays(2026, { '2026-01-01': 'New Year' })
    expect(result).toBe(260)
  })

  it('weekend holidays do not reduce weekday count', () => {
    // Aug 15 2026 is Saturday — should not change the count
    const withoutHoliday = getTotalWorkingDays(2026, {})
    const withWeekendHoliday = getTotalWorkingDays(2026, { '2026-08-15': 'Independence Day' })
    expect(withWeekendHoliday).toBe(withoutHoliday)
  })
})
