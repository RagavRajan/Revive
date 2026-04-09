import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { MMProgress } from '../types/maximizeMemory'
import { db, getCurrentUser } from './connection'

const DEFAULT_PROGRESS: MMProgress = { completions: {} }

function progressDoc() {
  const user = getCurrentUser()
  if (!user) throw new Error('Not authenticated')
  return doc(db, 'users', user.uid, 'maximizeMemory', 'progress')
}

export async function getMMProgress(): Promise<MMProgress> {
  const snap = await getDoc(progressDoc())
  if (snap.exists()) {
    return { ...DEFAULT_PROGRESS, ...snap.data() } as MMProgress
  }
  return DEFAULT_PROGRESS
}

export async function saveMMProgress(progress: MMProgress): Promise<void> {
  await setDoc(progressDoc(), progress)
}

export async function completeMMExercise(exerciseId: number, response: string): Promise<MMProgress> {
  const progress = await getMMProgress()
  progress.completions[String(exerciseId)] = {
    response,
    completedAt: Date.now(),
  }
  await saveMMProgress(progress)
  return progress
}

export async function clearMMExercise(exerciseId: number): Promise<MMProgress> {
  const progress = await getMMProgress()
  delete progress.completions[String(exerciseId)]
  await saveMMProgress(progress)
  return progress
}
