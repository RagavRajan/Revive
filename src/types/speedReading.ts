export type SRExerciseType = 'matchPairs' | 'vocabFill' | 'multipleChoice' | 'reflection' | 'speedLog'

interface SRExerciseBase {
  id: number
  day: number
  title: string
  type: SRExerciseType
  prompt: string
}

export interface MatchPairsExercise extends SRExerciseBase {
  type: 'matchPairs'
  pairs: { left: string; right: string }[]
}

export interface VocabFillExercise extends SRExerciseBase {
  type: 'vocabFill'
  sentences: { text: string; answer: string }[]
  wordBank: string[]
}

export interface MultipleChoiceExercise extends SRExerciseBase {
  type: 'multipleChoice'
  questions: { question: string; options: string[]; correctIndex: number }[]
}

export interface ReflectionExercise extends SRExerciseBase {
  type: 'reflection'
  questions: string[]
}

export interface SpeedLogExercise extends SRExerciseBase {
  type: 'speedLog'
  instructions: string
  wordCount: number
  passage?: string
  passageWordCount?: number
  comprehensionQuestions: { question: string; options: string[]; correctIndex: number }[]
}

export type SRExercise = MatchPairsExercise | VocabFillExercise | MultipleChoiceExercise | ReflectionExercise | SpeedLogExercise

export interface SRChapter {
  id: number
  title: string
  reading: string
  days: number[]
}

export interface SRProgress {
  completions: Record<string, {
    response: string
    completedAt: number
  }>
}
