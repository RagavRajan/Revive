import { useState, useEffect, useRef } from 'react'
import type { AppSettings } from '../types'

export function useReminder(settings: AppSettings | null, checkedIn: boolean) {
  const [bannerVisible, setBannerVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!settings?.reminderMinutes || checkedIn) {
      setBannerVisible(false)
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }

    const now = new Date()
    const todayReminder = new Date(now)
    todayReminder.setHours(Math.floor(settings.reminderMinutes / 60), settings.reminderMinutes % 60, 0, 0)

    const msUntil = todayReminder.getTime() - now.getTime()

    if (msUntil <= 0) {
      // Reminder time already passed — show banner now
      setBannerVisible(true)
      if (Notification.permission === 'granted') {
        new Notification('Revive', { body: "Don't forget to check in today!" })
      }
    } else {
      // Schedule for later
      timerRef.current = setTimeout(() => {
        setBannerVisible(true)
        if (Notification.permission === 'granted') {
          new Notification('Revive', { body: "Don't forget to check in today!" })
        }
      }, msUntil)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [settings?.reminderMinutes, checkedIn])

  const dismissBanner = () => setBannerVisible(false)

  return { bannerVisible, dismissBanner }
}
