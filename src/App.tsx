import { useState, useEffect, useCallback } from 'react'
import type { User } from 'firebase/auth'
import type { ActiveView } from './types'
import { onAuthChange, signOut } from './firebase/auth'
import { useSettings } from './hooks/useSettings'
import { useAttendance } from './hooks/useAttendance'
import { useMidnightAutoClose } from './hooks/useMidnightAutoClose'
import { preloadSounds } from './utils/sound'
import { Layout } from './components/Layout'
import { LoginScreen } from './components/Auth/LoginScreen'
import { CalendarGrid } from './components/Calendar/CalendarGrid'
import { ScannerView } from './components/Scanner/ScannerView'
import { BarcodeRegistration } from './components/Scanner/BarcodeRegistration'
import { SettingsPage } from './components/Settings/SettingsPage'

function AuthenticatedApp({ user }: { user: User }) {
  const [activeView, setActiveView] = useState<ActiveView>('calendar')
  const { settings, loading: settingsLoading, updateSettings } = useSettings()
  const { checkedIn, recordScan, refresh: refreshAttendance } = useAttendance()

  useEffect(() => { preloadSounds() }, [])

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
    <Layout activeView={activeView} onNavigate={setActiveView} onSignOut={signOut} userEmail={user.email}>
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

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u)
      setAuthLoading(false)
    })
    return unsubscribe
  }, [])

  if (authLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
        Loading...
      </div>
    )
  }

  if (!user) {
    return <LoginScreen />
  }

  return <AuthenticatedApp user={user} />
}

export default App
