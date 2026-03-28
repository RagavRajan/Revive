import type { DayRecord } from '../types'
import { formatTime } from './date'

export function generateCsv(records: DayRecord[]): string {
  const header = 'Date,Event Type,Time,Auto-Closed,Day Off'
  const rows: string[] = [header]

  const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date))

  for (const record of sorted) {
    if (record.events.length === 0) {
      rows.push(`${record.date},,,,"${record.isDayOff ? 'Yes' : 'No'}"`)
      continue
    }

    const sortedEvents = [...record.events].sort((a, b) => a.timestamp - b.timestamp)
    for (const event of sortedEvents) {
      rows.push(
        `${record.date},${event.type},${formatTime(event.timestamp)},${event.autoClose ? 'Yes' : 'No'},${record.isDayOff ? 'Yes' : 'No'}`
      )
    }
  }

  return rows.join('\n')
}

export function downloadCsv(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
