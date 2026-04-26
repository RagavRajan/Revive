import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore'
import type { LCProgress, LCVideo } from '../types/practice'
import { db, getCurrentUser } from './connection'

const DEFAULT_PROGRESS: LCProgress = { completions: {} }

function uid() {
  const user = getCurrentUser()
  if (!user) throw new Error('Not authenticated')
  return user.uid
}

function progressDoc() {
  return doc(db, 'users', uid(), 'practice', 'listeningComprehension')
}

function videosCollection() {
  return collection(db, 'users', uid(), 'practiceVideos')
}

// --- Progress ---

export async function getLCProgress(): Promise<LCProgress> {
  const snap = await getDoc(progressDoc())
  if (snap.exists()) {
    return { ...DEFAULT_PROGRESS, ...snap.data() } as LCProgress
  }
  return DEFAULT_PROGRESS
}

export async function saveLCProgress(progress: LCProgress): Promise<void> {
  await setDoc(progressDoc(), progress)
}

export async function completeLCExercise(key: string, response: string): Promise<LCProgress> {
  const progress = await getLCProgress()
  progress.completions[key] = {
    response,
    completedAt: Date.now(),
  }
  await saveLCProgress(progress)
  return progress
}

export async function clearLCExercise(key: string): Promise<LCProgress> {
  const progress = await getLCProgress()
  delete progress.completions[key]
  await saveLCProgress(progress)
  return progress
}

// --- Videos ---

export async function getLCVideos(): Promise<LCVideo[]> {
  const q = query(videosCollection(), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => d.data() as LCVideo)
}

export async function addLCVideo(video: LCVideo): Promise<void> {
  await setDoc(doc(db, 'users', uid(), 'practiceVideos', video.id), video)
}

export async function deleteLCVideo(videoId: string): Promise<void> {
  await deleteDoc(doc(db, 'users', uid(), 'practiceVideos', videoId))
}
