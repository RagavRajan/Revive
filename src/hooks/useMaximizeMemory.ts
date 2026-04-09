import { useState, useEffect, useCallback } from 'react'
import type { MMProgress } from '../types/maximizeMemory'
import { getMMProgress, completeMMExercise, clearMMExercise } from '../db/maximizeMemory'

export function useMaximizeMemory() {
  const [progress, setProgress] = useState<MMProgress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMMProgress().then(p => {
      setProgress(p)
      setLoading(false)
    })
  }, [])

  const complete = useCallback(async (exerciseId: number, response: string) => {
    const updated = await completeMMExercise(exerciseId, response)
    setProgress(updated)
  }, [])

  const redo = useCallback(async (exerciseId: number) => {
    const updated = await clearMMExercise(exerciseId)
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
