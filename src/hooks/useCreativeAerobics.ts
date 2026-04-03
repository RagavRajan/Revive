import { useState, useEffect, useCallback } from 'react'
import type { CAProgress } from '../types/think'
import { getCAProgress, completeExercise, clearExercise } from '../db/creativeAerobics'

export function useCreativeAerobics() {
  const [progress, setProgress] = useState<CAProgress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCAProgress().then(p => {
      setProgress(p)
      setLoading(false)
    })
  }, [])

  const complete = useCallback(async (exerciseId: number, response: string) => {
    const updated = await completeExercise(exerciseId, response)
    setProgress(updated)
  }, [])

  const redo = useCallback(async (exerciseId: number) => {
    const updated = await clearExercise(exerciseId)
    setProgress(updated)
  }, [])

  const isCompleted = useCallback((exerciseId: number) => {
    return !!progress?.completions[String(exerciseId)]
  }, [progress])

  const getResponse = useCallback((exerciseId: number) => {
    return progress?.completions[String(exerciseId)]?.response ?? null
  }, [progress])

  const completedCount = progress
    ? Object.keys(progress.completions).length
    : 0

  return { progress, loading, complete, redo, isCompleted, getResponse, completedCount }
}
