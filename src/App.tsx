import { useState, useEffect, useCallback } from 'react'
import type { ActiveView } from './types'
import { useSettings } from './hooks/useSettings'
import { useAttendance } from './hooks/useAttendance'
import { useMidnightAutoClose } from './hooks/useMidnightAutoClose'
import { preloadSounds } from './utils/sound'
import { Layout } from './components/Layout'
import { CalendarGrid } from './components/Calendar/CalendarGrid'
import { ScannerView } from './components/Scanner/ScannerView'
import { BarcodeRegistration } from './components/Scanner/BarcodeRegistration'
import { SettingsPage } from './components/Settings/SettingsPage'

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('calendar')
  const { settings, loading: settingsLoading, updateSettings } = useSettings()
  const { checkedIn, recordScan, refresh: refreshAttendance } = useAttendance()

  // Preload sounds on mount
  useEffect(() => { preloadSounds() }, [])

  // Auto-close open sessions at midnight
  const handleAutoClose = useCallback(() => {
    refreshAttendance()
  }, [refreshAttendance])
  useMidnightAutoClose(handleAutoClose)

  if (settingsLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
        Loading...
      </div>
    )
  }

  // First-launch: no barcode registered
  if (!settings?.registeredBarcode) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <BarcodeRegistration
          onRegistered={(barcode) => updateSettings({ registeredBarcode: barcode })}
        />
      </div>
    )
  }

  return (
    <Layout activeView={activeView} onNavigate={setActiveView}>
      {activeView === 'calendar' && (
        <CalendarGrid settings={settings} />
      )}
      {activeView === 'scanner' && (
        <ScannerView
          settings={settings}
          checkedIn={checkedIn}
          onScan={recordScan}
        />
      )}
      {activeView === 'settings' && (
        <SettingsPage
          settings={settings}
          onUpdate={updateSettings}
        />
      )}
    </Layout>
  )
}

export default App
