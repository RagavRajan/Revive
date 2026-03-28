import { useState, useEffect, useCallback } from 'react'
import type { AppSettings } from '../types'
import { getSettings, saveSettings } from '../db/settings'

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSettings().then(s => {
      setSettings(s)
      setLoading(false)
    })
  }, [])

  const updateSettings = useCallback(async (updates: Partial<AppSettings>) => {
    const current = await getSettings()
    const updated = { ...current, ...updates }
    await saveSettings(updated)
    setSettings(updated)
  }, [])

  return { settings, loading, updateSettings }
}
