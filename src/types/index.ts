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
  isLifeline?: boolean // true if day-off was marked using a lifeline (same-day)
}

export interface AppSettings {
  registeredBarcode: string | null
  deadlineMinutes: number // minutes since midnight (540 = 9:00 AM)
  bestStreak: number
  reminderMinutes: number | null // null = disabled
  shownMilestones: number[]
}

export type DayStatus = 'on-time' | 'missed' | 'day-off' | 'holiday' | 'weekend' | 'future' | 'no-record'

export type ActiveView = 'calendar' | 'scanner' | 'settings' | 'skills'
