export interface LCMultipleChoiceQuestion {
  question: string
  options: string[]
  correctIndex: number
}

export interface LCVocabFillSentence {
  text: string
  answer: string
}

export interface LCMatchPair {
  left: string
  right: string
}

export interface LCExerciseSet {
  easy: LCMultipleChoiceQuestion[]
  medium: {
    sentences: LCVocabFillSentence[]
    wordBank: string[]
  }
  hard: LCMatchPair[]
}

export interface LCVideo {
  id: string
  url: string
  title: string
  durationMinutes: number
  transcript: string
  exercises: LCExerciseSet
  createdAt: number
}

export interface LCProgress {
  completions: Record<string, {
    response: string
    completedAt: number
  }>
}

export type LCDifficulty = 'easy' | 'medium' | 'hard'
