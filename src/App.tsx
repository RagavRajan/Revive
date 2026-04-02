import { useState, useEffect, useCallback } from 'react'
import type { User } from 'firebase/auth'
import type { ActiveView } from './types'
import { onAuthChange, signOut } from './firebase/auth'
import { useSettings } from './hooks/useSettings'
import { useAttendance } from './hooks/useAttendance'
import { useMidnightAutoClose } from './hooks/useMidnightAutoClose'
import { useReminder } from './hooks/useReminder'
import { preloadSounds } from './utils/sound'
import { Layout } from './components/Layout'
import { LoginScreen } from './components/Auth/LoginScreen'
import { CalendarGrid } from './components/Calendar/CalendarGrid'
import { SharedCalendarView } from './components/Calendar/SharedCalendarView'
import { WidgetCalendarView } from './components/Calendar/WidgetCalendarView'
import { ScannerView } from './components/Scanner/ScannerView'
import { BarcodeRegistration } from './components/Scanner/BarcodeRegistration'
import { SettingsPage } from './components/Settings/SettingsPage'
import { ReminderBanner } from './components/ReminderBanner'

function getSharedUid(): string | null {
  const hash = window.location.hash
  const match = hash.match(/^#\/shared\/(.+)$/)
  return match ? match[1] : null
}

function getWidgetUid(): string | null {
  const hash = window.location.hash
  const match = hash.match(/^#\/widget\/(.+)$/)
  return match ? match[1] : null
}

function AuthenticatedApp({ user }: { user: User }) {
  const [activeView, setActiveView] = useState<ActiveView>('calendar')
  const [statsOpen, setStatsOpen] = useState(false)
  const { settings, loading: settingsLoading, updateSettings } = useSettings()
  const { checkedIn, hasCheckedInToday, recordScan, refresh: refreshAttendance } = useAttendance()
  const { bannerVisible, dismissBanner } = useReminder(settings, hasCheckedInToday)

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
    <Layout activeView={activeView} onNavigate={setActiveView} onSignOut={signOut} userEmail={user.email} onStats={() => setStatsOpen(true)} checkedIn={checkedIn}>
      {bannerVisible && <ReminderBanner onDismiss={dismissBanner} />}
      {activeView === 'calendar' && (
        <CalendarGrid settings={settings} updateSettings={updateSettings} statsOpen={statsOpen} onStatsClose={() => setStatsOpen(false)} uid={user.uid} />
      )}
      {activeView === 'scanner' && (
        <ScannerView
          settings={settings}
          checkedIn={checkedIn}
          onScan={recordScan}
        />
      )}
      {activeView === 'settings' && checkedIn && (
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
  const [sharedUid] = useState(getSharedUid)
  const [widgetUid] = useState(getWidgetUid)

  useEffect(() => {
    if (sharedUid || widgetUid) {
      setAuthLoading(false)
      return
    }
    const unsubscribe = onAuthChange((u) => {
      setUser(u)
      setAuthLoading(false)
    })
    return unsubscribe
  }, [sharedUid])

  if (authLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
        Loading...
      </div>
    )
  }

  if (widgetUid) {
    return <WidgetCalendarView uid={widgetUid} />
  }

  if (sharedUid) {
    return <SharedCalendarView uid={sharedUid} />
  }

  if (!user) {
    return <LoginScreen />
  }

  return <AuthenticatedApp user={user} />
}

export default App
