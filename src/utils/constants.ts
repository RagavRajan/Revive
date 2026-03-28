export const DB_NAME = 'revive-db'
export const DB_VERSION = 1
export const DEFAULT_DEADLINE_MINUTES = 540 // 9:00 AM
export const SETTINGS_KEY = 'app-settings'

export const STREAK_MILESTONES = [7, 14, 30, 50, 100, 200, 365] as const

export const HOLIDAYS_2026: Record<string, string> = {
  '2026-01-01': 'New Year',
  '2026-01-15': 'Sankranthi/Pongal',
  '2026-01-26': 'Republic Day',
  '2026-03-04': 'Holi',
  '2026-03-19': 'Ugadi',
  '2026-03-21': 'Eid al-Fitr',
  '2026-04-03': 'Good Friday',
  '2026-05-27': 'Eid-al-Adha',
  '2026-08-15': 'Independence Day',
  '2026-09-14': 'Ganesh Chaturthi',
  '2026-10-02': 'Gandhi Jayanthi',
  '2026-10-20': 'Dusshera/Vijayadashami',
  '2026-11-08': 'Deepavali/Diwali',
  '2026-12-25': 'Christmas',
}
