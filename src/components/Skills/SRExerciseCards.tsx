import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import type {
  SRExercise, MatchPairsExercise, VocabFillExercise,
  MultipleChoiceExercise, ReflectionExercise, SpeedLogExercise,
} from '../../types/speedReading'

interface CardProps<T extends SRExercise> {
  exercise: T
  onComplete: (response: string) => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function MatchPairsCard({ exercise, onComplete }: CardProps<MatchPairsExercise>) {
  const shuffledRight = useMemo(() => shuffle(exercise.pairs.map(p => p.right)), [exercise])
  const [matched, setMatched] = useState<Record<number, number>>({})
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const tryMatch = (rightIdx: number) => {
    if (selectedLeft === null) return
    const leftItem = exercise.pairs[selectedLeft]
    const rightItem = shuffledRight[rightIdx]
    if (leftItem.right === rightItem) {
      const next = { ...matched, [selectedLeft]: rightIdx }
      setMatched(next)
      setSelectedLeft(null)
      setError(null)
      if (Object.keys(next).length === exercise.pairs.length) {
        onComplete(exercise.pairs.map(p => `${p.left} → ${p.right}`).join('\n'))
      }
    } else {
      setError('Not a match — try again')
      setSelectedLeft(null)
    }
  }

  const matchedRightIdxs = new Set(Object.values(matched))

  return (
    <div className="sr-card">
      <div className="sr-match-progress">{Object.keys(matched).length}/{exercise.pairs.length} matched</div>
      {error && <div className="sr-error">{error}</div>}
      <div className="sr-match-grid">
        <div className="sr-match-col">
          {exercise.pairs.map((p, i) => (
            <button
              key={i}
              className={`sr-match-item ${matched[i] !== undefined ? 'sr-match-done' : ''} ${selectedLeft === i ? 'sr-match-selected' : ''}`}
              onClick={() => matched[i] === undefined && setSelectedLeft(i)}
              disabled={matched[i] !== undefined}
            >
              {p.left}
            </button>
          ))}
        </div>
        <div className="sr-match-col">
          {shuffledRight.map((r, i) => (
            <button
              key={i}
              className={`sr-match-item ${matchedRightIdxs.has(i) ? 'sr-match-done' : ''} ${selectedLeft !== null && !matchedRightIdxs.has(i) ? 'sr-match-target' : ''}`}
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

function VocabFillCard({ exercise, onComplete }: CardProps<VocabFillExercise>) {
  const [answers, setAnswers] = useState<string[]>(exercise.sentences.map(() => ''))
  const [checked, setChecked] = useState(false)

  const results = answers.map((a, i) => a.trim().toLowerCase() === exercise.sentences[i].answer.toLowerCase())
  const allCorrect = results.every(Boolean)
  const score = results.filter(Boolean).length

  const check = () => {
    setChecked(true)
    if (allCorrect) {
      onComplete(exercise.sentences.map((s, i) => `${s.text.replace('___', answers[i])}`).join('\n'))
    }
  }

  return (
    <div className="sr-card">
      <div className="sr-wordbank">
        <span className="sr-wordbank-label">Word bank:</span>
        {exercise.wordBank.map((w, i) => (
          <span key={i} className="sr-wordbank-word">{w}</span>
        ))}
      </div>
      <div className="sr-fill-list">
        {exercise.sentences.map((s, i) => {
          const parts = s.text.split('___')
          return (
            <div key={i} className={`sr-fill-item ${checked ? (results[i] ? 'sr-fill-correct' : 'sr-fill-wrong') : ''}`}>
              <span className="sr-fill-num">{i + 1}.</span>
              <span className="sr-fill-text">
                {parts[0]}
                <input
                  className="sr-fill-input"
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
              {checked && !results[i] && <span className="sr-fill-answer">({exercise.sentences[i].answer})</span>}
            </div>
          )
        })}
      </div>
      {checked && !allCorrect && <div className="sr-error">{score}/{exercise.sentences.length} correct — fix the highlighted answers</div>}
      <button className="btn btn-primary sr-complete" onClick={check}>
        {checked && allCorrect ? 'Complete Exercise' : 'Check Answers'}
      </button>
    </div>
  )
}

function MultipleChoiceCard({ exercise, onComplete }: CardProps<MultipleChoiceExercise>) {
  const [answers, setAnswers] = useState<(number | null)[]>(exercise.questions.map(() => null))
  const [checked, setChecked] = useState(false)

  const results = answers.map((a, i) => a === exercise.questions[i].correctIndex)
  const allCorrect = results.every(Boolean)
  const score = results.filter(Boolean).length
  const allAnswered = answers.every(a => a !== null)

  const check = () => {
    setChecked(true)
    if (allCorrect) {
      onComplete(`Score: ${score}/${exercise.questions.length}\n` + exercise.questions.map((q, i) => `${q.question} → ${q.options[answers[i]!]}`).join('\n'))
    }
  }

  return (
    <div className="sr-card">
      <div className="sr-mc-list">
        {exercise.questions.map((q, qi) => (
          <div key={qi} className={`sr-mc-question ${checked ? (results[qi] ? 'sr-mc-correct' : 'sr-mc-wrong') : ''}`}>
            <div className="sr-mc-q">{qi + 1}. {q.question}</div>
            <div className="sr-mc-options">
              {q.options.map((opt, oi) => (
                <label key={oi} className={`sr-mc-option ${answers[qi] === oi ? 'sr-mc-chosen' : ''} ${checked && oi === q.correctIndex ? 'sr-mc-answer' : ''}`}>
                  <input
                    type="radio"
                    name={`q${qi}`}
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
        ))}
      </div>
      {checked && !allCorrect && <div className="sr-error">{score}/{exercise.questions.length} correct — the correct answers are highlighted</div>}
      {allAnswered && (
        <button className="btn btn-primary sr-complete" onClick={check}>
          {checked && allCorrect ? 'Complete Exercise' : 'Check Answers'}
        </button>
      )}
    </div>
  )
}

function ReflectionCard({ exercise, onComplete }: CardProps<ReflectionExercise>) {
  const [answers, setAnswers] = useState<string[]>(exercise.questions.map(() => ''))
  const allFilled = answers.every(a => a.trim().length >= 10)

  return (
    <div className="sr-card">
      <div className="sr-prompts">
        {exercise.questions.map((q, i) => (
          <div key={i} className="sr-prompt-item">
            <label className="sr-prompt-q">{i + 1}. {q}</label>
            <textarea
              value={answers[i]}
              onChange={e => {
                const next = [...answers]
                next[i] = e.target.value
                setAnswers(next)
              }}
              rows={3}
              placeholder="Your response..."
              className="sr-textarea"
            />
          </div>
        ))}
      </div>
      {allFilled && (
        <button className="btn btn-primary sr-complete" onClick={() => onComplete(exercise.questions.map((q, i) => `${q}\n${answers[i]}`).join('\n\n'))}>Complete Exercise</button>
      )}
    </div>
  )
}

function SpeedLogCard({ exercise, onComplete }: CardProps<SpeedLogExercise>) {
  const hasPassage = !!exercise.passage
  const [phase, setPhase] = useState<'intro' | 'reading' | 'done'>('intro')
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [wordsRead, setWordsRead] = useState('')
  const [timeMinutes, setTimeMinutes] = useState('5')
  const [answers, setAnswers] = useState<(number | null)[]>(exercise.comprehensionQuestions.map(() => null))
  const [checked, setChecked] = useState(false)

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  useEffect(() => () => stopTimer(), [stopTimer])

  const startReading = () => {
    setElapsed(0)
    setPhase('reading')
    timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000)
  }

  const finishReading = () => {
    stopTimer()
    const mins = (elapsed / 60).toFixed(2)
    setTimeMinutes(mins)
    if (exercise.passageWordCount) setWordsRead(String(exercise.passageWordCount))
    setPhase('done')
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const effectiveTime = phase === 'done' && hasPassage ? timeMinutes : timeMinutes
  const wpm = wordsRead && effectiveTime ? Math.round(Number(wordsRead) / Number(effectiveTime)) : 0
  const results = answers.map((a, i) => a === exercise.comprehensionQuestions[i].correctIndex)
  const allCorrect = results.every(Boolean)
  const score = results.filter(Boolean).length
  const allAnswered = answers.every(a => a !== null)
  const hasSpeed = Number(wordsRead) > 0 && Number(effectiveTime) > 0

  const check = () => {
    setChecked(true)
    if (allCorrect && hasSpeed) {
      onComplete(`WPM: ${wpm} (${wordsRead} words in ${effectiveTime} min)\nComprehension: ${score}/${exercise.comprehensionQuestions.length}`)
    }
  }

  // Passage-based reading with timer
  if (hasPassage && phase === 'intro') {
    return (
      <div className="sr-card">
        <div className="sr-guidance">{exercise.instructions}</div>
        {exercise.passageWordCount && (
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 8 }}>
            Passage length: {exercise.passageWordCount.toLocaleString()} words
          </div>
        )}
        <button className="btn btn-primary sr-complete" onClick={startReading}>Start Reading</button>
      </div>
    )
  }

  if (hasPassage && phase === 'reading') {
    return (
      <div className="sr-card">
        <div className="sr-timer-bar">
          <span className="sr-timer-clock">{formatTime(elapsed)}</span>
          <button className="btn btn-primary" onClick={finishReading} style={{ fontSize: '0.8rem', padding: '4px 14px' }}>
            Stop Timer
          </button>
        </div>
        <div className="sr-passage">
          {exercise.passage!.split('\n\n').map((p, i) => <p key={i} className="sr-reading-p">{p}</p>)}
        </div>
        <div className="sr-timer-bar" style={{ borderTop: '1px solid var(--color-border)', borderBottom: 'none', marginTop: 12, paddingTop: 12 }}>
          <span className="sr-timer-clock">{formatTime(elapsed)}</span>
          <button className="btn btn-primary" onClick={finishReading} style={{ fontSize: '0.8rem', padding: '4px 14px' }}>
            Stop Timer
          </button>
        </div>
        <style>{`
          .sr-timer-bar {
            display: flex; align-items: center; justify-content: space-between;
            padding: 8px 0; margin-bottom: 12px;
            border-bottom: 1px solid var(--color-border);
            position: sticky; top: 0; background: var(--color-bg);
            z-index: 1;
          }
          .sr-timer-clock {
            font-size: 1.4rem; font-weight: 700; color: var(--color-primary);
            font-variant-numeric: tabular-nums;
          }
          .sr-passage { line-height: 1.8; }
        `}</style>
      </div>
    )
  }

  // Done phase (passage-based) or non-passage flow
  return (
    <div className="sr-card">
      {!hasPassage && <div className="sr-guidance">{exercise.instructions}</div>}

      <div className="sr-speed-inputs">
        <div className="sr-speed-field">
          <label>Words read:</label>
          <input type="number" value={wordsRead} onChange={e => setWordsRead(e.target.value)} placeholder="e.g. 1250" />
        </div>
        <div className="sr-speed-field">
          <label>Time (min):</label>
          <input type="number" value={timeMinutes} onChange={e => setTimeMinutes(e.target.value)} placeholder="5" />
        </div>
        {hasSpeed && (
          <div className="sr-wpm-result">
            <span className="sr-wpm-number">{wpm}</span>
            <span className="sr-wpm-label">WPM</span>
          </div>
        )}
      </div>

      <div className="sr-mc-list" style={{ marginTop: 16 }}>
        <div className="sr-mc-q" style={{ fontWeight: 600, marginBottom: 8 }}>Comprehension Check</div>
        {exercise.comprehensionQuestions.map((q, qi) => (
          <div key={qi} className={`sr-mc-question ${checked ? (results[qi] ? 'sr-mc-correct' : 'sr-mc-wrong') : ''}`}>
            <div className="sr-mc-q">{qi + 1}. {q.question}</div>
            <div className="sr-mc-options">
              {q.options.map((opt, oi) => (
                <label key={oi} className={`sr-mc-option ${answers[qi] === oi ? 'sr-mc-chosen' : ''} ${checked && oi === q.correctIndex ? 'sr-mc-answer' : ''}`}>
                  <input
                    type="radio"
                    name={`sq${qi}`}
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
        ))}
      </div>

      {checked && !allCorrect && <div className="sr-error">{score}/{exercise.comprehensionQuestions.length} correct — correct answers highlighted</div>}
      {allAnswered && hasSpeed && (
        <button className="btn btn-primary sr-complete" onClick={check}>
          {checked && allCorrect ? 'Complete Exercise' : 'Check Answers'}
        </button>
      )}
    </div>
  )
}

export function SRExerciseCard({ exercise, onComplete }: { exercise: SRExercise; onComplete: (response: string) => void }) {
  switch (exercise.type) {
    case 'matchPairs': return <MatchPairsCard exercise={exercise} onComplete={onComplete} />
    case 'vocabFill': return <VocabFillCard exercise={exercise} onComplete={onComplete} />
    case 'multipleChoice': return <MultipleChoiceCard exercise={exercise} onComplete={onComplete} />
    case 'reflection': return <ReflectionCard exercise={exercise} onComplete={onComplete} />
    case 'speedLog': return <SpeedLogCard exercise={exercise} onComplete={onComplete} />
  }
}
