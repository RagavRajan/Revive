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
  // Summer Break (June 29 – July 3)
  '2026-06-29': 'Summer Break',
  '2026-06-30': 'Summer Break',
  '2026-07-01': 'Summer Break',
  '2026-07-02': 'Summer Break',
  '2026-07-03': 'Summer Break',
  // Winter Break (Dec 21 – Jan 1)
  '2026-12-21': 'Winter Break',
  '2026-12-22': 'Winter Break',
  '2026-12-23': 'Winter Break',
  '2026-12-24': 'Winter Break',
  '2026-12-25': 'Christmas',
  '2026-12-28': 'Winter Break',
  '2026-12-29': 'Winter Break',
  '2026-12-30': 'Winter Break',
  '2026-12-31': 'Winter Break',
  '2027-01-01': 'Winter Break',
}
