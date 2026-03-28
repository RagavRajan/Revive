import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { computeDayStatus } from './dayStatus'
import type { DayRecord, AttendanceEvent } from '../types'

function makeEvent(type: 'check-in' | 'check-out', hour: number, minute = 0): AttendanceEvent {
  return {
    id: crypto.randomUUID(),
    type,
    timestamp: new Date(2026, 2, 25, hour, minute).getTime(), // Mar 25 2026 (Wednesday)
    autoClose: false,
  }
}

function makeRecord(events: AttendanceEvent[], isDayOff = false): DayRecord {
  return { date: '2026-03-25', events, isDayOff }
}

const NO_HOLIDAYS: Record<string, string> = {}
const DEADLINE = 540 // 9:00 AM

describe('computeDayStatus', () => {
  beforeEach(() => { vi.useFakeTimers(); vi.setSystemTime(new Date(2026, 2, 28)) })
  afterEach(() => { vi.useRealTimers() })

  it('isDayOff overrides everything', () => {
    const record = makeRecord([makeEvent('check-in', 8)], true)
    expect(computeDayStatus('2026-03-25', record, NO_HOLIDAYS, DEADLINE)).toBe('day-off')
  })

  it('no check-ins + holiday → holiday', () => {
    const holidays = { '2026-03-25': 'Test Holiday' }
    expect(computeDayStatus('2026-03-25', undefined, holidays, DEADLINE)).toBe('holiday')
  })

  it('no check-ins + weekend → weekend', () => {
    // Mar 28 2026 is Saturday
    expect(computeDayStatus('2026-03-28', undefined, NO_HOLIDAYS, DEADLINE)).toBe('weekend')
  })

  it('no check-ins + future weekday → future', () => {
    // Mar 30 2026 is Monday, after mocked date of Mar 28
    expect(computeDayStatus('2026-03-30', undefined, NO_HOLIDAYS, DEADLINE)).toBe('future')
  })

  it('no check-ins + past weekday → no-record', () => {
    expect(computeDayStatus('2026-03-25', undefined, NO_HOLIDAYS, DEADLINE)).toBe('no-record')
  })

  it('check-in before deadline → on-time', () => {
    const record = makeRecord([makeEvent('check-in', 8, 30)])
    expect(computeDayStatus('2026-03-25', record, NO_HOLIDAYS, DEADLINE)).toBe('on-time')
  })

  it('check-in after deadline → missed', () => {
    const record = makeRecord([makeEvent('check-in', 9, 30)])
    expect(computeDayStatus('2026-03-25', record, NO_HOLIDAYS, DEADLINE)).toBe('missed')
  })

  it('check-in exactly at deadline → on-time', () => {
    const record = makeRecord([makeEvent('check-in', 9, 0)])
    expect(computeDayStatus('2026-03-25', record, NO_HOLIDAYS, DEADLINE)).toBe('on-time')
  })

  it('multiple check-ins uses earliest', () => {
    const record = makeRecord([
      makeEvent('check-in', 10, 0), // late
      makeEvent('check-in', 8, 0),  // early — should be used
    ])
    expect(computeDayStatus('2026-03-25', record, NO_HOLIDAYS, DEADLINE)).toBe('on-time')
  })

  it('holiday + isDayOff → day-off wins', () => {
    const holidays = { '2026-03-25': 'Test Holiday' }
    const record = makeRecord([], true)
    expect(computeDayStatus('2026-03-25', record, holidays, DEADLINE)).toBe('day-off')
  })
})
