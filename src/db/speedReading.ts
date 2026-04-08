import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { SRProgress } from '../types/speedReading'
import { db, getCurrentUser } from './connection'

const DEFAULT_PROGRESS: SRProgress = { completions: {} }

function progressDoc() {
  const user = getCurrentUser()
  if (!user) throw new Error('Not authenticated')
  return doc(db, 'users', user.uid, 'speedReading', 'progress')
}

export async function getSRProgress(): Promise<SRProgress> {
  const snap = await getDoc(progressDoc())
  if (snap.exists()) {
    return { ...DEFAULT_PROGRESS, ...snap.data() } as SRProgress
  }
  return DEFAULT_PROGRESS
}

export async function saveSRProgress(progress: SRProgress): Promise<void> {
  await setDoc(progressDoc(), progress)
}

export async function completeSRExercise(exerciseId: number, response: string): Promise<SRProgress> {
  const progress = await getSRProgress()
  progress.completions[String(exerciseId)] = {
    response,
    completedAt: Date.now(),
  }
  await saveSRProgress(progress)
  return progress
}

export async function clearSRExercise(exerciseId: number): Promise<SRProgress> {
  const progress = await getSRProgress()
  delete progress.completions[String(exerciseId)]
  await saveSRProgress(progress)
  return progress
}
