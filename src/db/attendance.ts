import type { AttendanceEvent, DayRecord } from '../types'
import { getDB } from './connection'

export async function getDayRecord(dateKey: string): Promise<DayRecord | undefined> {
  const db = await getDB()
  return db.get('days', dateKey)
}

export async function saveDayRecord(record: DayRecord): Promise<void> {
  const db = await getDB()
  await db.put('days', record, record.date)
}

export async function getMonthRecords(start: string, end: string): Promise<DayRecord[]> {
  const db = await getDB()
  const range = IDBKeyRange.bound(start, end)
  return db.getAll('days', range)
}

export async function getAllRecords(): Promise<DayRecord[]> {
  const db = await getDB()
  return db.getAll('days')
}

export async function addEvent(dateKey: string, event: AttendanceEvent): Promise<DayRecord> {
  const existing = await getDayRecord(dateKey)
  const record: DayRecord = existing ?? { date: dateKey, events: [], isDayOff: false }
  record.events.push(event)
  await saveDayRecord(record)
  return record
}

export async function toggleDayOff(dateKey: string): Promise<DayRecord> {
  const existing = await getDayRecord(dateKey)
  const record: DayRecord = existing ?? { date: dateKey, events: [], isDayOff: false }
  record.isDayOff = !record.isDayOff
  await saveDayRecord(record)
  return record
}

export function isCheckedIn(record: DayRecord | undefined): boolean {
  if (!record) return false
  const checkIns = record.events.filter(e => e.type === 'check-in').length
  const checkOuts = record.events.filter(e => e.type === 'check-out').length
  return checkIns > checkOuts
}
