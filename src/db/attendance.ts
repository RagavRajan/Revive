import { doc, getDoc, setDoc, collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import type { AttendanceEvent, DayRecord } from '../types'
import { db, getCurrentUser } from './connection'

function daysCollection() {
  const user = getCurrentUser()
  if (!user) throw new Error('Not authenticated')
  return collection(db, 'users', user.uid, 'days')
}

function dayDoc(dateKey: string) {
  const user = getCurrentUser()
  if (!user) throw new Error('Not authenticated')
  return doc(db, 'users', user.uid, 'days', dateKey)
}

export async function getDayRecord(dateKey: string): Promise<DayRecord | undefined> {
  const snap = await getDoc(dayDoc(dateKey))
  if (snap.exists()) {
    return snap.data() as DayRecord
  }
  return undefined
}

export async function saveDayRecord(record: DayRecord): Promise<void> {
  await setDoc(dayDoc(record.date), record)
}

export async function getMonthRecords(start: string, end: string): Promise<DayRecord[]> {
  const q = query(
    daysCollection(),
    where('date', '>=', start),
    where('date', '<=', end),
    orderBy('date')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => d.data() as DayRecord)
}

export async function getAllRecords(): Promise<DayRecord[]> {
  const q = query(daysCollection(), orderBy('date'))
  const snap = await getDocs(q)
  return snap.docs.map(d => d.data() as DayRecord)
}

export async function addEvent(dateKey: string, event: AttendanceEvent): Promise<DayRecord> {
  const existing = await getDayRecord(dateKey)
  const record: DayRecord = existing ?? { date: dateKey, events: [], isDayOff: false }
  record.events.push(event)
  await saveDayRecord(record)
  return record
}

export async function toggleDayOff(dateKey: string, useLifeline = false): Promise<DayRecord> {
  const existing = await getDayRecord(dateKey)
  const record: DayRecord = existing ?? { date: dateKey, events: [], isDayOff: false }
  record.isDayOff = !record.isDayOff
  if (record.isDayOff && useLifeline) {
    record.isLifeline = true
  } else {
    delete record.isLifeline
  }
  await saveDayRecord(record)
  return record
}

export async function getLifelinesUsedInMonth(year: number, month: number): Promise<number> {
  const start = `${year}-${String(month + 1).padStart(2, '0')}-01`
  const lastDay = new Date(year, month + 1, 0).getDate()
  const end = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`
  const records = await getMonthRecords(start, end)
  return records.filter(r => r.isDayOff && r.isLifeline).length
}

export function isCheckedIn(record: DayRecord | undefined): boolean {
  if (!record) return false
  const checkIns = record.events.filter(e => e.type === 'check-in').length
  const checkOuts = record.events.filter(e => e.type === 'check-out').length
  return checkIns > checkOuts
}
