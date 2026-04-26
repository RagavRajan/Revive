import { useState, useMemo } from 'react'
import type { LCMultipleChoiceQuestion, LCVocabFillSentence, LCMatchPair } from '../../types/practice'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// --- Multiple Choice (Easy) ---

function MultipleChoiceCard({ questions, completedKeys, onComplete }: {
  questions: LCMultipleChoiceQuestion[]
  completedKeys: Record<number, string | null>
  onComplete: (index: number, response: string) => void
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null))
  const [checked, setChecked] = useState<boolean[]>(questions.map(() => false))

  return (
    <div className="lc-card">
      <div className="lc-mc-list">
        {questions.map((q, qi) => {
          const savedResponse = completedKeys[qi]
          if (savedResponse !== undefined && savedResponse !== null) {
            return (
              <div key={qi} className="lc-mc-question lc-mc-correct">
                <div className="lc-mc-q">{qi + 1}. {q.question}</div>
                <div className="lc-completed-inline">Completed</div>
              </div>
            )
          }

          const isChecked = checked[qi]
          const isCorrect = answers[qi] === q.correctIndex

          return (
            <div key={qi} className={`lc-mc-question ${isChecked ? (isCorrect ? 'lc-mc-correct' : 'lc-mc-wrong') : ''}`}>
              <div className="lc-mc-q">{qi + 1}. {q.question}</div>
              <div className="lc-mc-options">
                {q.options.map((opt, oi) => (
                  <label key={oi} className={`lc-mc-option ${answers[qi] === oi ? 'lc-mc-chosen' : ''} ${isChecked && oi === q.correctIndex ? 'lc-mc-answer' : ''}`}>
                    <input
                      type="radio"
                      name={`lc-q${qi}`}
                      checked={answers[qi] === oi}
                      onChange={() => {
                        const next = [...answers]
                        next[qi] = oi
                        setAnswers(next)
                        const c = [...checked]
                        c[qi] = false
                        setChecked(c)
                      }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {answers[qi] !== null && (
                <button className="btn btn-primary lc-check-btn" onClick={() => {
                  const c = [...checked]
                  c[qi] = true
                  setChecked(c)
                  if (answers[qi] === q.correctIndex) {
                    onComplete(qi, `${q.question} → ${q.options[answers[qi]!]}`)
                  }
                }}>
                  {isChecked && isCorrect ? 'Completed' : 'Check'}
                </button>
              )}
              {isChecked && !isCorrect && <div className="lc-error">Incorrect — the correct answer is highlighted</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// --- Vocab Fill (Medium) ---

function VocabFillCard({ sentences, wordBank, completedKeys, onComplete }: {
  sentences: LCVocabFillSentence[]
  wordBank: string[]
  completedKeys: Record<number, string | null>
  onComplete: (index: number, response: string) => void
}) {
  const [answers, setAnswers] = useState<string[]>(sentences.map(() => ''))
  const [checked, setChecked] = useState<boolean[]>(sentences.map(() => false))

  return (
    <div className="lc-card">
      <div className="lc-wordbank">
        <span className="lc-wordbank-label">Word bank:</span>
        {wordBank.map((w, i) => (
          <span key={i} className="lc-wordbank-word">{w}</span>
        ))}
      </div>
      <div className="lc-fill-list">
        {sentences.map((s, i) => {
          const savedResponse = completedKeys[i]
          if (savedResponse !== undefined && savedResponse !== null) {
            return (
              <div key={i} className="lc-fill-item lc-fill-correct">
                <span className="lc-fill-num">{i + 1}.</span>
                <span className="lc-fill-text">{s.text.replace('___', s.answer)}</span>
                <span className="lc-completed-inline">Completed</span>
              </div>
            )
          }

          const isChecked = checked[i]
          const isCorrect = answers[i].trim().toLowerCase() === s.answer.toLowerCase()
          const parts = s.text.split('___')

          return (
            <div key={i} className={`lc-fill-item ${isChecked ? (isCorrect ? 'lc-fill-correct' : 'lc-fill-wrong') : ''}`}>
              <span className="lc-fill-num">{i + 1}.</span>
              <span className="lc-fill-text">
                {parts[0]}
                <input
                  className="lc-fill-input"
                  value={answers[i]}
                  onChange={e => {
                    const next = [...answers]
                    next[i] = e.target.value
                    setAnswers(next)
                    const c = [...checked]
                    c[i] = false
                    setChecked(c)
                  }}
                  placeholder="..."
                />
                {parts[1] || ''}
              </span>
              {answers[i].trim() && (
                <button className="btn btn-primary lc-check-btn" style={{ fontSize: '0.75rem', padding: '3px 10px' }} onClick={() => {
                  const c = [...checked]
                  c[i] = true
                  setChecked(c)
                  if (answers[i].trim().toLowerCase() === s.answer.toLowerCase()) {
                    onComplete(i, s.text.replace('___', answers[i].trim()))
                  }
                }}>
                  Check
                </button>
              )}
              {isChecked && !isCorrect && <span className="lc-fill-answer">({s.answer})</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// --- Match Pairs (Hard) ---

function MatchPairsCard({ pairs, completedKeys, onComplete }: {
  pairs: LCMatchPair[]
  completedKeys: Record<number, string | null>
  onComplete: (index: number, response: string) => void
}) {
  const uncompletedIndices = pairs.map((_, i) => i).filter(i => completedKeys[i] === undefined || completedKeys[i] === null)
  const uncompletedPairs = uncompletedIndices.map(i => pairs[i])
  const shuffledRight = useMemo(() => shuffle(uncompletedPairs.map(p => p.right)), [uncompletedPairs.length])
  const [matched, setMatched] = useState<Record<number, number>>({})
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const completedCount = Object.keys(completedKeys).filter(k => completedKeys[Number(k)] !== null).length

  const tryMatch = (rightIdx: number) => {
    if (selectedLeft === null) return
    const leftPair = uncompletedPairs[selectedLeft]
    const rightItem = shuffledRight[rightIdx]
    if (leftPair.right === rightItem) {
      const next = { ...matched, [selectedLeft]: rightIdx }
      setMatched(next)
      setSelectedLeft(null)
      setError(null)
      // Complete this individual pair
      const originalIdx = uncompletedIndices[selectedLeft]
      onComplete(originalIdx, `${leftPair.left} → ${leftPair.right}`)
    } else {
      setError('Not a match — try again')
      setSelectedLeft(null)
    }
  }

  const matchedRightIdxs = new Set(Object.values(matched))

  return (
    <div className="lc-card">
      <div className="lc-match-progress">{completedCount + Object.keys(matched).length}/{pairs.length} matched</div>
      {error && <div className="lc-error">{error}</div>}
      {uncompletedPairs.length > 0 && (
        <div className="lc-match-grid">
          <div className="lc-match-col">
            {uncompletedPairs.map((p, i) => (
              <button
                key={i}
                className={`lc-match-item ${matched[i] !== undefined ? 'lc-match-done' : ''} ${selectedLeft === i ? 'lc-match-selected' : ''}`}
                onClick={() => matched[i] === undefined && setSelectedLeft(i)}
                disabled={matched[i] !== undefined}
              >
                {p.left}
              </button>
            ))}
          </div>
          <div className="lc-match-col">
            {shuffledRight.map((r, i) => (
              <button
                key={i}
                className={`lc-match-item ${matchedRightIdxs.has(i) ? 'lc-match-done' : ''} ${selectedLeft !== null && !matchedRightIdxs.has(i) ? 'lc-match-target' : ''}`}
                onClick={() => !matchedRightIdxs.has(i) && tryMatch(i)}
                disabled={matchedRightIdxs.has(i)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
      {completedCount === pairs.length && (
        <div className="lc-completed-inline" style={{ textAlign: 'center', marginTop: 8 }}>All pairs matched!</div>
      )}
    </div>
  )
}

// --- Main export ---

export function LCExercisePanel({ videoId, difficulty, exercises, isCompleted, getResponse, onComplete }: {
  videoId: string
  difficulty: 'easy' | 'medium' | 'hard'
  exercises: {
    easy: LCMultipleChoiceQuestion[]
    medium: { sentences: LCVocabFillSentence[]; wordBank: string[] }
    hard: LCMatchPair[]
  }
  isCompleted: (key: string) => boolean
  getResponse: (key: string) => string | null
  onComplete: (key: string, response: string) => void
}) {
  const makeKey = (index: number) => `${videoId}:${difficulty}:${index}`

  if (difficulty === 'easy') {
    const completedKeys: Record<number, string | null> = {}
    exercises.easy.forEach((_, i) => {
      const key = makeKey(i)
      if (isCompleted(key)) completedKeys[i] = getResponse(key)
    })
    return <MultipleChoiceCard
      questions={exercises.easy}
      completedKeys={completedKeys}
      onComplete={(idx, resp) => onComplete(makeKey(idx), resp)}
    />
  }

  if (difficulty === 'medium') {
    const completedKeys: Record<number, string | null> = {}
    exercises.medium.sentences.forEach((_, i) => {
      const key = makeKey(i)
      if (isCompleted(key)) completedKeys[i] = getResponse(key)
    })
    return <VocabFillCard
      sentences={exercises.medium.sentences}
      wordBank={exercises.medium.wordBank}
      completedKeys={completedKeys}
      onComplete={(idx, resp) => onComplete(makeKey(idx), resp)}
    />
  }

  // hard
  const completedKeys: Record<number, string | null> = {}
  exercises.hard.forEach((_, i) => {
    const key = makeKey(i)
    if (isCompleted(key)) completedKeys[i] = getResponse(key)
  })
  return <MatchPairsCard
    pairs={exercises.hard}
    completedKeys={completedKeys}
    onComplete={(idx, resp) => onComplete(makeKey(idx), resp)}
  />
}
