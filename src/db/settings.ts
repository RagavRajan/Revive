import type { AppSettings } from '../types'
import { getDB } from './connection'
import { DEFAULT_DEADLINE_MINUTES, SETTINGS_KEY } from '../utils/constants'

const DEFAULT_SETTINGS: AppSettings = {
  registeredBarcode: null,
  deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
}

export async function getSettings(): Promise<AppSettings> {
  const db = await getDB()
  const settings = await db.get('settings', SETTINGS_KEY)
  return settings ?? DEFAULT_SETTINGS
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  const db = await getDB()
  await db.put('settings', settings, SETTINGS_KEY)
}
