export interface AttendanceEvent {
  id: string
  type: 'check-in' | 'check-out'
  timestamp: number
  autoClose: boolean
}

export interface DayRecord {
  date: string // "YYYY-MM-DD"
  events: AttendanceEvent[]
  isDayOff: boolean
}

export interface AppSettings {
  registeredBarcode: string | null
  deadlineMinutes: number // minutes since midnight (540 = 9:00 AM)
}

export type DayStatus = 'on-time' | 'missed' | 'day-off' | 'future' | 'no-record'

export type ActiveView = 'calendar' | 'scanner' | 'settings'
