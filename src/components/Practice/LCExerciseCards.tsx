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
  onComplete: (responses: Record<number, string>) => void
}) {
  const unanswered = questions.map((_, i) => i).filter(i => completedKeys[i] === undefined || completedKeys[i] === null)
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null))
  const [checked, setChecked] = useState(false)

  const results = answers.map((a, i) => a === questions[i].correctIndex)
  const allAnswered = unanswered.every(i => answers[i] !== null)
  const allCorrect = unanswered.every(i => results[i])
  const score = unanswered.filter(i => results[i]).length

  const check = () => {
    setChecked(true)
    if (allCorrect) {
      const responses: Record<number, string> = {}
      unanswered.forEach(i => {
        responses[i] = `${questions[i].question} → ${questions[i].options[answers[i]!]}`
      })
      onComplete(responses)
    }
  }

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

          return (
            <div key={qi} className={`lc-mc-question ${checked ? (results[qi] ? 'lc-mc-correct' : 'lc-mc-wrong') : ''}`}>
              <div className="lc-mc-q">{qi + 1}. {q.question}</div>
              <div className="lc-mc-options">
                {q.options.map((opt, oi) => (
                  <label key={oi} className={`lc-mc-option ${answers[qi] === oi ? 'lc-mc-chosen' : ''} ${checked && oi === q.correctIndex ? 'lc-mc-answer' : ''}`}>
                    <input
                      type="radio"
                      name={`lc-q${qi}`}
                      checked={answers[qi] === oi}
                      onChange={() => {
                        const next = [...answers]
                        next[qi] = oi
                        setAnswers(next)
                        setChecked(false)
                      }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {checked && !allCorrect && <div className="lc-error">{score}/{unanswered.length} correct — the correct answers are highlighted</div>}
      {allAnswered && unanswered.length > 0 && (
        <button className="btn btn-primary lc-complete" onClick={check}>
          {checked && allCorrect ? 'Complete' : 'Check Answers'}
        </button>
      )}
    </div>
  )
}

// --- Vocab Fill (Medium) ---

function VocabFillCard({ sentences, wordBank, completedKeys, onComplete }: {
  sentences: LCVocabFillSentence[]
  wordBank: string[]
  completedKeys: Record<number, string | null>
  onComplete: (responses: Record<number, string>) => void
}) {
  const unanswered = sentences.map((_, i) => i).filter(i => completedKeys[i] === undefined || completedKeys[i] === null)
  const [answers, setAnswers] = useState<string[]>(sentences.map(() => ''))
  const [checked, setChecked] = useState(false)

  const results = answers.map((a, i) => a.trim().toLowerCase() === sentences[i].answer.toLowerCase())
  const allFilled = unanswered.every(i => answers[i].trim().length > 0)
  const allCorrect = unanswered.every(i => results[i])
  const score = unanswered.filter(i => results[i]).length

  const check = () => {
    setChecked(true)
    if (allCorrect) {
      const responses: Record<number, string> = {}
      unanswered.forEach(i => {
        responses[i] = sentences[i].text.replace('___', answers[i].trim())
      })
      onComplete(responses)
    }
  }

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

          const parts = s.text.split('___')

          return (
            <div key={i} className={`lc-fill-item ${checked ? (results[i] ? 'lc-fill-correct' : 'lc-fill-wrong') : ''}`}>
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
                    setChecked(false)
                  }}
                  placeholder="..."
                />
                {parts[1] || ''}
              </span>
              {checked && !results[i] && <span className="lc-fill-answer">({s.answer})</span>}
            </div>
          )
        })}
      </div>
      {checked && !allCorrect && <div className="lc-error">{score}/{unanswered.length} correct — fix the highlighted answers</div>}
      {allFilled && unanswered.length > 0 && (
        <button className="btn btn-primary lc-complete" onClick={check}>
          {checked && allCorrect ? 'Complete' : 'Check Answers'}
        </button>
      )}
    </div>
  )
}

// --- Match Pairs (Hard) ---

function MatchPairsCard({ pairs, completedKeys, onComplete }: {
  pairs: LCMatchPair[]
  completedKeys: Record<number, string | null>
  onComplete: (responses: Record<number, string>) => void
}) {
  const shuffledRight = useMemo(() => shuffle(pairs.map(p => p.right)), [pairs])
  const [matched, setMatched] = useState<Record<number, number>>(() => {
    // Pre-populate matched state for already-completed pairs
    const initial: Record<number, number> = {}
    pairs.forEach((_, i) => {
      if (completedKeys[i] !== undefined && completedKeys[i] !== null) {
        const rightIdx = shuffledRight.indexOf(pairs[i].right)
        if (rightIdx !== -1) initial[i] = rightIdx
      }
    })
    return initial
  })
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const tryMatch = (rightIdx: number) => {
    if (selectedLeft === null) return
    const leftPair = pairs[selectedLeft]
    const rightItem = shuffledRight[rightIdx]
    if (leftPair.right === rightItem) {
      const next = { ...matched, [selectedLeft]: rightIdx }
      setMatched(next)
      setSelectedLeft(null)
      setError(null)
      // Check if all pairs are now matched
      const totalMatched = Object.keys(next).length
      if (totalMatched === pairs.length) {
        const responses: Record<number, string> = {}
        pairs.forEach((p, i) => {
          if (completedKeys[i] === undefined || completedKeys[i] === null) {
            responses[i] = `${p.left} → ${p.right}`
          }
        })
        onComplete(responses)
      }
    } else {
      setError('Not a match — try again')
      setSelectedLeft(null)
    }
  }

  const matchedRightIdxs = new Set(Object.values(matched))

  return (
    <div className="lc-card">
      <div className="lc-match-progress">{Object.keys(matched).length}/{pairs.length} matched</div>
      {error && <div className="lc-error">{error}</div>}
      <div className="lc-match-grid">
        <div className="lc-match-col">
          {pairs.map((p, i) => (
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
    </div>
  )
}

// --- Main export ---

export function LCExercisePanel({ videoId, difficulty, exercises, isCompleted, getResponse, onComplete, onRedo }: {
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
  onRedo: (keys: string[]) => void
}) {
  const makeKey = (index: number) => `${videoId}:${difficulty}:${index}`

  const batchComplete = (responses: Record<number, string>) => {
    Object.entries(responses).forEach(([idx, resp]) => {
      onComplete(makeKey(Number(idx)), resp)
    })
  }

  const items = difficulty === 'easy' ? exercises.easy
    : difficulty === 'medium' ? exercises.medium.sentences
    : exercises.hard
  const allKeys = items.map((_, i) => makeKey(i))
  const allDone = allKeys.every(k => isCompleted(k))

  const handleRedo = () => {
    onRedo(allKeys)
  }

  if (allDone) {
    return (
      <div className="lc-card">
        <div className="lc-completed-section">
          <div className="lc-completed-badge">Completed</div>
          <button className="btn btn-outline" onClick={handleRedo}>Redo Exercise</button>
        </div>
      </div>
    )
  }

  if (difficulty === 'easy') {
    const completedKeys: Record<number, string | null> = {}
    exercises.easy.forEach((_, i) => {
      const key = makeKey(i)
      if (isCompleted(key)) completedKeys[i] = getResponse(key)
    })
    return <MultipleChoiceCard
      questions={exercises.easy}
      completedKeys={completedKeys}
      onComplete={batchComplete}
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
      onComplete={batchComplete}
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
    onComplete={batchComplete}
  />
}
