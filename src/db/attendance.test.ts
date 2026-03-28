import { describe, it, expect } from 'vitest'
import { isCheckedIn } from './attendance'
import type { DayRecord, AttendanceEvent } from '../types'

function makeEvent(type: 'check-in' | 'check-out', ts = Date.now()): AttendanceEvent {
  return { id: crypto.randomUUID(), type, timestamp: ts, autoClose: false }
}

function makeRecord(events: AttendanceEvent[]): DayRecord {
  return { date: '2026-03-28', events, isDayOff: false }
}

describe('isCheckedIn', () => {
  it('undefined record → false', () => {
    expect(isCheckedIn(undefined)).toBe(false)
  })

  it('empty events → false', () => {
    expect(isCheckedIn(makeRecord([]))).toBe(false)
  })

  it('1 check-in, 0 check-outs → true', () => {
    expect(isCheckedIn(makeRecord([makeEvent('check-in')]))).toBe(true)
  })

  it('1 check-in, 1 check-out → false', () => {
    expect(isCheckedIn(makeRecord([
      makeEvent('check-in'),
      makeEvent('check-out'),
    ]))).toBe(false)
  })

  it('2 check-ins, 1 check-out → true', () => {
    expect(isCheckedIn(makeRecord([
      makeEvent('check-in'),
      makeEvent('check-out'),
      makeEvent('check-in'),
    ]))).toBe(true)
  })

  it('2 check-ins, 2 check-outs → false', () => {
    expect(isCheckedIn(makeRecord([
      makeEvent('check-in'),
      makeEvent('check-out'),
      makeEvent('check-in'),
      makeEvent('check-out'),
    ]))).toBe(false)
  })
})
