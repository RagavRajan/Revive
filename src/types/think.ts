export type CAExerciseType =
  | 'wordHunt'
  | 'consonantWords'
  | 'reverseWords'
  | 'wordTransform'
  | 'homophones'
  | 'creativePrompt'
  | 'caExercise'

interface CAExerciseBase {
  id: number
  day: number
  title: string
  type: CAExerciseType
  prompt: string
  targetCount: number
}

export interface WordHuntExercise extends CAExerciseBase {
  type: 'wordHunt'
  sourceWord: string
  minLetters: number
}

export interface ConsonantWordsExercise extends CAExerciseBase {
  type: 'consonantWords'
  consonants: string[]
  userPicksLetters?: boolean
}

export interface ReverseWordsExercise extends CAExerciseBase {
  type: 'reverseWords'
  minLetters: number
  addPlurals?: boolean
}

export interface WordTransformExercise extends CAExerciseBase {
  type: 'wordTransform'
  rules: string[]
  example: string
  wordLength?: number
}

export interface HomophonesExercise extends CAExerciseBase {
  type: 'homophones'
  examples: string[]
  tips: string[]
}

export interface CreativePromptExercise extends CAExerciseBase {
  type: 'creativePrompt'
  questions: string[]
}

export interface CAMethodExercise extends CAExerciseBase {
  type: 'caExercise'
  caStep: 'CA1' | 'CA2' | 'CA3' | 'CA4' | 'headline' | 'slogan' | 'fullCA'
  guidance: string
  productSuggestions?: string[]
}

export type CAExercise =
  | WordHuntExercise
  | ConsonantWordsExercise
  | ReverseWordsExercise
  | WordTransformExercise
  | HomophonesExercise
  | CreativePromptExercise
  | CAMethodExercise

export interface CAChapter {
  id: number
  title: string
  reading: string
  days: number[]
}

export interface CAProgress {
  completions: Record<string, {
    response: string
    completedAt: number
  }>
}
