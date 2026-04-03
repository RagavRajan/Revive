import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { CAProgress } from '../types/think'
import { db, getCurrentUser } from './connection'

const DEFAULT_PROGRESS: CAProgress = { completions: {} }

function progressDoc() {
  const user = getCurrentUser()
  if (!user) throw new Error('Not authenticated')
  return doc(db, 'users', user.uid, 'think', 'progress')
}

export async function getCAProgress(): Promise<CAProgress> {
  const snap = await getDoc(progressDoc())
  if (snap.exists()) {
    return { ...DEFAULT_PROGRESS, ...snap.data() } as CAProgress
  }
  return DEFAULT_PROGRESS
}

export async function saveCAProgress(progress: CAProgress): Promise<void> {
  await setDoc(progressDoc(), progress)
}

export async function completeExercise(exerciseId: number, response: string): Promise<CAProgress> {
  const progress = await getCAProgress()
  progress.completions[String(exerciseId)] = {
    response,
    completedAt: Date.now(),
  }
  await saveCAProgress(progress)
  return progress
}

export async function clearExercise(exerciseId: number): Promise<CAProgress> {
  const progress = await getCAProgress()
  delete progress.completions[String(exerciseId)]
  await saveCAProgress(progress)
  return progress
}
