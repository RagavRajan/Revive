import { useState } from 'react'
import { getAllRecords } from '../../db/attendance'
import { generateCsv, downloadCsv } from '../../utils/csv'

export function CsvExport() {
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    try {
      const records = await getAllRecords()
      const csv = generateCsv(records)
      const date = new Date().toISOString().split('T')[0]
      downloadCsv(csv, `revive-attendance-${date}.csv`)
    } finally {
      setExporting(false)
    }
  }

  return (
    <button className="btn btn-outline" onClick={handleExport} disabled={exporting}>
      {exporting ? 'Exporting...' : 'Export to CSV'}
    </button>
  )
}
