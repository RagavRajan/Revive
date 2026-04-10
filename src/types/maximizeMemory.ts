export type MMExerciseType = 'multipleChoice' | 'reflection' | 'matchPairs' | 'speedLog' | 'timedRecall' | 'sequenceInput' | 'chainLinking'

interface MMExerciseBase {
  id: number
  day: number
  title: string
  type: MMExerciseType
  prompt: string
}

export interface MMMultipleChoiceExercise extends MMExerciseBase {
  type: 'multipleChoice'
  questions: { question: string; options: string[]; correctIndex: number }[]
}

export interface MMReflectionExercise extends MMExerciseBase {
  type: 'reflection'
  questions: string[]
}

export interface MMMatchPairsExercise extends MMExerciseBase {
  type: 'matchPairs'
  pairs: { left: string; right: string }[]
}

export interface MMSpeedLogExercise extends MMExerciseBase {
  type: 'speedLog'
  instructions: string
  wordCount: number
  passage?: string
  passageWordCount?: number
  comprehensionQuestions: { question: string; options: string[]; correctIndex: number }[]
}

export interface TimedRecallExercise extends MMExerciseBase {
  type: 'timedRecall'
  items: string[]
  studySeconds: number
  instructions: string
}

export interface SequenceInputExercise extends MMExerciseBase {
  type: 'sequenceInput'
  sequences: { shown: number[]; answer: number; explanation: string }[]
}

export interface ChainLinkingExercise extends MMExerciseBase {
  type: 'chainLinking'
  instructions: string
  guidedChain: {
    words: string[]
    associations: string[]
  }
  independentWords: string[]
}

export type MMExercise =
  | MMMultipleChoiceExercise
  | MMReflectionExercise
  | MMMatchPairsExercise
  | MMSpeedLogExercise
  | TimedRecallExercise
  | SequenceInputExercise
  | ChainLinkingExercise

export interface MMChapter {
  id: number
  title: string
  reading: string
  days: number[]
}

export interface MMProgress {
  completions: Record<string, {
    response: string
    completedAt: number
  }>
}
