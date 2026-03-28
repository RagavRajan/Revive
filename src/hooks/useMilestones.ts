import { useState, useEffect, useRef } from 'react'
import type { AppSettings } from '../types'
import { STREAK_MILESTONES } from '../utils/constants'

interface UseMilestonesOptions {
  streak: number
  settings: AppSettings | null
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>
}

export function useMilestones({ streak, settings, updateSettings }: UseMilestonesOptions) {
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null)
  const shownThisSession = useRef(false)

  useEffect(() => {
    if (!settings || shownThisSession.current || streak === 0) return

    const shown = settings.shownMilestones ?? []
    const pending = STREAK_MILESTONES.filter(m => streak >= m && !shown.includes(m))

    if (pending.length > 0) {
      setActiveMilestone(pending[0])
      shownThisSession.current = true
    }
  }, [streak, settings])

  const dismissMilestone = () => {
    if (activeMilestone && settings) {
      const updated = [...(settings.shownMilestones ?? []), activeMilestone]
      updateSettings({ shownMilestones: updated })
    }
    setActiveMilestone(null)
  }

  return { activeMilestone, dismissMilestone }
}
