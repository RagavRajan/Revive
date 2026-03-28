import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { AppSettings } from '../types'
import { db, getCurrentUser } from './connection'
import { DEFAULT_DEADLINE_MINUTES } from '../utils/constants'

const DEFAULT_SETTINGS: AppSettings = {
  registeredBarcode: null,
  deadlineMinutes: DEFAULT_DEADLINE_MINUTES,
}

function settingsDoc() {
  const user = getCurrentUser()
  if (!user) throw new Error('Not authenticated')
  return doc(db, 'users', user.uid, 'settings', 'app')
}

export async function getSettings(): Promise<AppSettings> {
  const snap = await getDoc(settingsDoc())
  if (snap.exists()) {
    return snap.data() as AppSettings
  }
  return DEFAULT_SETTINGS
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await setDoc(settingsDoc(), settings)
}
