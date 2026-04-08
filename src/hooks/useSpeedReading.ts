import { useState, useEffect, useCallback } from 'react'
import type { SRProgress } from '../types/speedReading'
import { getSRProgress, completeSRExercise, clearSRExercise } from '../db/speedReading'

export function useSpeedReading() {
  const [progress, setProgress] = useState<SRProgress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSRProgress().then(p => {
      setProgress(p)
      setLoading(false)
    })
  }, [])

  const complete = useCallback(async (exerciseId: number, response: string) => {
    const updated = await completeSRExercise(exerciseId, response)
    setProgress(updated)
  }, [])

  const redo = useCallback(async (exerciseId: number) => {
    const updated = await clearSRExercise(exerciseId)
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
