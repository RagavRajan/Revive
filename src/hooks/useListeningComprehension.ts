import { useState, useEffect, useCallback } from 'react'
import type { LCProgress, LCVideo } from '../types/practice'
import { getLCProgress, completeLCExercise, clearLCExercise, getLCVideos, addLCVideo, deleteLCVideo } from '../db/practice'

const PROXY_URL = import.meta.env.VITE_PROXY_URL || 'http://localhost:3001'

export function useListeningComprehension() {
  const [progress, setProgress] = useState<LCProgress | null>(null)
  const [videos, setVideos] = useState<LCVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [proxyAvailable, setProxyAvailable] = useState(false)

  useEffect(() => {
    Promise.all([getLCProgress(), getLCVideos()]).then(([p, v]) => {
      setProgress(p)
      setVideos(v)
      setLoading(false)
    })

    fetch(`${PROXY_URL}/health`, { signal: AbortSignal.timeout(2000) })
      .then(r => { if (r.ok) setProxyAvailable(true) })
      .catch(() => {})
  }, [])

  const complete = useCallback(async (key: string, response: string) => {
    const updated = await completeLCExercise(key, response)
    setProgress(updated)
  }, [])

  const redo = useCallback(async (key: string) => {
    const updated = await clearLCExercise(key)
    setProgress(updated)
  }, [])

  const isCompleted = useCallback((key: string) => {
    return !!progress?.completions[key]
  }, [progress])

  const getResponse = useCallback((key: string) => {
    return progress?.completions[key]?.response ?? null
  }, [progress])

  const addVideo = useCallback(async (video: LCVideo) => {
    await addLCVideo(video)
    setVideos(prev => [video, ...prev])
  }, [])

  const deleteVideo = useCallback(async (videoId: string) => {
    await deleteLCVideo(videoId)
    setVideos(prev => prev.filter(v => v.id !== videoId))
  }, [])

  const completedCount = progress ? Object.keys(progress.completions).length : 0

  const totalQuestions = videos.reduce((sum, v) => {
    return sum + v.exercises.easy.length + v.exercises.medium.sentences.length + v.exercises.hard.length
  }, 0)

  return {
    progress, videos, loading, proxyAvailable,
    complete, redo, isCompleted, getResponse, addVideo, deleteVideo,
    completedCount, totalQuestions, proxyUrl: PROXY_URL,
  }
}
