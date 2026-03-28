import { describe, it, expect } from 'vitest'
import { generateCsv } from './csv'
import type { DayRecord, AttendanceEvent } from '../types'

function makeEvent(type: 'check-in' | 'check-out', ts: number, autoClose = false): AttendanceEvent {
  return { id: crypto.randomUUID(), type, timestamp: ts, autoClose }
}

const HEADER = 'Date,Event Type,Time,Auto-Closed,Day Off'

describe('generateCsv', () => {
  it('empty records returns header only', () => {
    expect(generateCsv([])).toBe(HEADER)
  })

  it('record with no events produces row with empty fields', () => {
    const records: DayRecord[] = [{ date: '2026-03-28', events: [], isDayOff: false }]
    const csv = generateCsv(records)
    const lines = csv.split('\n')
    expect(lines).toHaveLength(2)
    expect(lines[1]).toBe('2026-03-28,,,,"No"')
  })

  it('isDayOff shows Yes', () => {
    const records: DayRecord[] = [{ date: '2026-03-28', events: [], isDayOff: true }]
    const csv = generateCsv(records)
    expect(csv.split('\n')[1]).toContain('"Yes"')
  })

  it('single event has correct columns', () => {
    const ts = new Date(2026, 2, 28, 9, 0).getTime()
    const records: DayRecord[] = [{
      date: '2026-03-28',
      events: [makeEvent('check-in', ts)],
      isDayOff: false,
    }]
    const csv = generateCsv(records)
    const row = csv.split('\n')[1]
    expect(row).toMatch(/^2026-03-28,check-in,\d{1,2}:\d{2}\s[AP]M,No,No$/)
  })

  it('multiple records are sorted by date', () => {
    const records: DayRecord[] = [
      { date: '2026-03-30', events: [], isDayOff: false },
      { date: '2026-03-28', events: [], isDayOff: false },
    ]
    const csv = generateCsv(records)
    const lines = csv.split('\n')
    expect(lines[1]).toContain('2026-03-28')
    expect(lines[2]).toContain('2026-03-30')
  })

  it('events within a record are sorted by timestamp', () => {
    const early = new Date(2026, 2, 28, 8, 0).getTime()
    const late = new Date(2026, 2, 28, 17, 0).getTime()
    const records: DayRecord[] = [{
      date: '2026-03-28',
      events: [makeEvent('check-out', late), makeEvent('check-in', early)],
      isDayOff: false,
    }]
    const csv = generateCsv(records)
    const lines = csv.split('\n')
    expect(lines[1]).toContain('check-in')
    expect(lines[2]).toContain('check-out')
  })

  it('auto-close event shows Yes', () => {
    const ts = new Date(2026, 2, 28, 23, 59).getTime()
    const records: DayRecord[] = [{
      date: '2026-03-28',
      events: [makeEvent('check-out', ts, true)],
      isDayOff: false,
    }]
    const csv = generateCsv(records)
    expect(csv.split('\n')[1]).toMatch(/,Yes,No$/)
  })
})
