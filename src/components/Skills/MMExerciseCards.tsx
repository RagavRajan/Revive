import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import type {
  MMExercise, MMMatchPairsExercise, MMMultipleChoiceExercise,
  MMReflectionExercise, MMSpeedLogExercise, TimedRecallExercise, SequenceInputExercise,
} from '../../types/maximizeMemory'

interface CardProps<T extends MMExercise> {
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

// === Match Pairs ===
function MatchPairsCard({ exercise, onComplete }: CardProps<MMMatchPairsExercise>) {
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
    <div className="mm-card">
      <div className="mm-match-progress">{Object.keys(matched).length}/{exercise.pairs.length} matched</div>
      {error && <div className="mm-error">{error}</div>}
      <div className="mm-match-grid">
        <div className="mm-match-col">
          {exercise.pairs.map((p, i) => (
            <button key={i} className={`mm-match-item ${matched[i] !== undefined ? 'mm-match-done' : ''} ${selectedLeft === i ? 'mm-match-selected' : ''}`}
              onClick={() => matched[i] === undefined && setSelectedLeft(i)} disabled={matched[i] !== undefined}>{p.left}</button>
          ))}
        </div>
        <div className="mm-match-col">
          {shuffledRight.map((r, i) => (
            <button key={i} className={`mm-match-item ${matchedRightIdxs.has(i) ? 'mm-match-done' : ''} ${selectedLeft !== null && !matchedRightIdxs.has(i) ? 'mm-match-target' : ''}`}
              onClick={() => !matchedRightIdxs.has(i) && tryMatch(i)} disabled={matchedRightIdxs.has(i)}>{r}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

// === Multiple Choice ===
function MultipleChoiceCard({ exercise, onComplete }: CardProps<MMMultipleChoiceExercise>) {
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
    <div className="mm-card">
      <div className="mm-mc-list">
        {exercise.questions.map((q, qi) => (
          <div key={qi} className={`mm-mc-question ${checked ? (results[qi] ? 'mm-mc-correct' : 'mm-mc-wrong') : ''}`}>
            <div className="mm-mc-q">{qi + 1}. {q.question}</div>
            <div className="mm-mc-options">
              {q.options.map((opt, oi) => (
                <label key={oi} className={`mm-mc-option ${answers[qi] === oi ? 'mm-mc-chosen' : ''} ${checked && oi === q.correctIndex ? 'mm-mc-answer' : ''}`}>
                  <input type="radio" name={`q${qi}`} checked={answers[qi] === oi}
                    onChange={() => { const next = [...answers]; next[qi] = oi; setAnswers(next); setChecked(false) }} />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {checked && !allCorrect && <div className="mm-error">{score}/{exercise.questions.length} correct — the correct answers are highlighted</div>}
      {allAnswered && (
        <button className="btn btn-primary mm-complete" onClick={check}>
          {checked && allCorrect ? 'Complete Exercise' : 'Check Answers'}
        </button>
      )}
    </div>
  )
}

// === Reflection ===
function ReflectionCard({ exercise, onComplete }: CardProps<MMReflectionExercise>) {
  const [answers, setAnswers] = useState<string[]>(exercise.questions.map(() => ''))
  const allFilled = answers.every(a => a.trim().length >= 10)

  return (
    <div className="mm-card">
      <div className="mm-prompts">
        {exercise.questions.map((q, i) => (
          <div key={i} className="mm-prompt-item">
            <label className="mm-prompt-q">{i + 1}. {q}</label>
            <textarea value={answers[i]} onChange={e => { const next = [...answers]; next[i] = e.target.value; setAnswers(next) }}
              rows={3} placeholder="Your response..." className="mm-textarea" />
          </div>
        ))}
      </div>
      {allFilled && (
        <button className="btn btn-primary mm-complete" onClick={() => onComplete(exercise.questions.map((q, i) => `${q}\n${answers[i]}`).join('\n\n'))}>Complete Exercise</button>
      )}
    </div>
  )
}

// === Speed Log (with optional passage + timer) ===
function SpeedLogCard({ exercise, onComplete }: CardProps<MMSpeedLogExercise>) {
  const hasPassage = !!exercise.passage
  const [phase, setPhase] = useState<'intro' | 'reading' | 'done'>('intro')
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [wordsRead, setWordsRead] = useState('')
  const [timeMinutes, setTimeMinutes] = useState('5')
  const [answers, setAnswers] = useState<(number | null)[]>(exercise.comprehensionQuestions.map(() => null))
  const [checked, setChecked] = useState(false)

  const stopTimer = useCallback(() => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null } }, [])
  useEffect(() => () => stopTimer(), [stopTimer])

  const startReading = () => { setElapsed(0); setPhase('reading'); timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000) }
  const finishReading = () => { stopTimer(); setTimeMinutes((elapsed / 60).toFixed(2)); if (exercise.passageWordCount) setWordsRead(String(exercise.passageWordCount)); setPhase('done') }
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  const wpm = wordsRead && timeMinutes ? Math.round(Number(wordsRead) / Number(timeMinutes)) : 0
  const results = answers.map((a, i) => a === exercise.comprehensionQuestions[i].correctIndex)
  const allCorrect = results.every(Boolean)
  const score = results.filter(Boolean).length
  const allAnswered = answers.every(a => a !== null)
  const hasSpeed = Number(wordsRead) > 0 && Number(timeMinutes) > 0

  const check = () => { setChecked(true); if (allCorrect && hasSpeed) onComplete(`WPM: ${wpm} (${wordsRead} words in ${timeMinutes} min)\nComprehension: ${score}/${exercise.comprehensionQuestions.length}`) }

  if (hasPassage && phase === 'intro') {
    return (
      <div className="mm-card">
        <div className="mm-guidance">{exercise.instructions}</div>
        {exercise.passageWordCount && <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: 8 }}>Passage length: {exercise.passageWordCount.toLocaleString()} words</div>}
        <button className="btn btn-primary mm-complete" onClick={startReading}>Start Reading</button>
      </div>
    )
  }

  if (hasPassage && phase === 'reading') {
    return (
      <div className="mm-card">
        <div className="mm-timer-bar">
          <span className="mm-timer-clock">{formatTime(elapsed)}</span>
          <button className="btn btn-primary" onClick={finishReading} style={{ fontSize: '0.8rem', padding: '4px 14px' }}>Stop Timer</button>
        </div>
        <div style={{ lineHeight: 1.8 }}>
          {exercise.passage!.split('\n\n').map((p, i) => <p key={i} className="mm-reading-p">{p}</p>)}
        </div>
      </div>
    )
  }

  return (
    <div className="mm-card">
      {!hasPassage && <div className="mm-guidance">{exercise.instructions}</div>}
      <div className="mm-speed-inputs">
        <div className="mm-speed-field"><label>Words read:</label><input type="number" value={wordsRead} onChange={e => setWordsRead(e.target.value)} placeholder="e.g. 1250" /></div>
        <div className="mm-speed-field"><label>Time (min):</label><input type="number" value={timeMinutes} onChange={e => setTimeMinutes(e.target.value)} placeholder="5" /></div>
        {hasSpeed && <div className="mm-wpm-result"><span className="mm-wpm-number">{wpm}</span><span className="mm-wpm-label">WPM</span></div>}
      </div>
      <div className="mm-mc-list" style={{ marginTop: 16 }}>
        <div className="mm-mc-q" style={{ fontWeight: 600, marginBottom: 8 }}>Comprehension Check</div>
        {exercise.comprehensionQuestions.map((q, qi) => (
          <div key={qi} className={`mm-mc-question ${checked ? (results[qi] ? 'mm-mc-correct' : 'mm-mc-wrong') : ''}`}>
            <div className="mm-mc-q">{qi + 1}. {q.question}</div>
            <div className="mm-mc-options">
              {q.options.map((opt, oi) => (
                <label key={oi} className={`mm-mc-option ${answers[qi] === oi ? 'mm-mc-chosen' : ''} ${checked && oi === q.correctIndex ? 'mm-mc-answer' : ''}`}>
                  <input type="radio" name={`sq${qi}`} checked={answers[qi] === oi}
                    onChange={() => { const next = [...answers]; next[qi] = oi; setAnswers(next); setChecked(false) }} />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {checked && !allCorrect && <div className="mm-error">{score}/{exercise.comprehensionQuestions.length} correct — correct answers highlighted</div>}
      {allAnswered && hasSpeed && (
        <button className="btn btn-primary mm-complete" onClick={check}>{checked && allCorrect ? 'Complete Exercise' : 'Check Answers'}</button>
      )}
    </div>
  )
}

// === Timed Recall (NEW) ===
function TimedRecallCard({ exercise, onComplete }: CardProps<TimedRecallExercise>) {
  const [phase, setPhase] = useState<'intro' | 'study' | 'recall' | 'results'>('intro')
  const [countdown, setCountdown] = useState(exercise.studySeconds)
  const [userAnswers, setUserAnswers] = useState<string[]>(exercise.items.map(() => ''))
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  const startStudy = () => {
    setCountdown(exercise.studySeconds)
    setPhase('study')
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          timerRef.current = null
          setPhase('recall')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const submitRecall = () => setPhase('results')

  const score = exercise.items.filter((item, i) =>
    userAnswers[i].trim().toLowerCase() === item.toLowerCase()
  ).length

  const completeExercise = () => {
    onComplete(`Score: ${score}/${exercise.items.length}\n` +
      exercise.items.map((item, i) => {
        const correct = userAnswers[i].trim().toLowerCase() === item.toLowerCase()
        return `${i + 1}. ${correct ? '✓' : '✗'} Expected: "${item}" | Your answer: "${userAnswers[i].trim()}"`
      }).join('\n'))
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  if (phase === 'intro') {
    return (
      <div className="mm-card">
        <div className="mm-guidance">{exercise.instructions}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          {exercise.items.length} items to memorize in {exercise.studySeconds} seconds
        </div>
        <button className="btn btn-primary mm-complete" onClick={startStudy}>Start Memorizing</button>
      </div>
    )
  }

  if (phase === 'study') {
    return (
      <div className="mm-card">
        <div className="mm-timer-bar">
          <span className="mm-timer-clock">{formatTime(countdown)}</span>
          <button className="btn btn-primary" onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setPhase('recall') }}
            style={{ fontSize: '0.8rem', padding: '4px 14px' }}>I'm Ready</button>
        </div>
        <div className="mm-recall-items">
          {exercise.items.map((item, i) => (
            <div key={i} className="mm-recall-item"><strong>{i + 1}.</strong> {item}</div>
          ))}
        </div>
      </div>
    )
  }

  if (phase === 'recall') {
    const anyFilled = userAnswers.some(a => a.trim().length > 0)
    return (
      <div className="mm-card">
        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: 8 }}>
          Time's up! Recall the {exercise.items.length} items in order:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {exercise.items.map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', width: 24 }}>{i + 1}.</span>
              <input className="mm-recall-input" value={userAnswers[i]} placeholder={`Item ${i + 1}...`}
                onChange={e => { const next = [...userAnswers]; next[i] = e.target.value; setUserAnswers(next) }} />
            </div>
          ))}
        </div>
        {anyFilled && <button className="btn btn-primary mm-complete" onClick={submitRecall}>Check Results</button>}
      </div>
    )
  }

  // Results phase
  return (
    <div className="mm-card">
      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)', textAlign: 'center', marginBottom: 12 }}>
        {score}/{exercise.items.length} correct
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {exercise.items.map((item, i) => {
          const correct = userAnswers[i].trim().toLowerCase() === item.toLowerCase()
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '4px 8px', borderRadius: 'var(--radius)',
              background: correct ? 'var(--color-success-bg)' : 'var(--color-danger-bg)' }}>
              <span style={{ fontWeight: 600, width: 24, fontSize: '0.8rem' }}>{i + 1}.</span>
              <span style={{ flex: 1, fontSize: '0.85rem' }}>
                <strong>{item}</strong>
                {!correct && <span style={{ color: 'var(--color-danger)', marginLeft: 8 }}>— you wrote: "{userAnswers[i].trim() || '(blank)'}"</span>}
              </span>
            </div>
          )
        })}
      </div>
      <button className="btn btn-primary mm-complete" onClick={completeExercise}>Complete Exercise</button>
    </div>
  )
}

// === Sequence Input (NEW) ===
function SequenceInputCard({ exercise, onComplete }: CardProps<SequenceInputExercise>) {
  const [answers, setAnswers] = useState<string[]>(exercise.sequences.map(() => ''))
  const [checked, setChecked] = useState(false)

  const results = exercise.sequences.map((seq, i) => {
    const parsed = parseInt(answers[i], 10)
    return !isNaN(parsed) && parsed === seq.answer
  })
  const allCorrect = results.every(Boolean)
  const score = results.filter(Boolean).length
  const allFilled = answers.every(a => a.trim().length > 0)

  const check = () => {
    setChecked(true)
    if (allCorrect) {
      onComplete(`Score: ${score}/${exercise.sequences.length}\n` +
        exercise.sequences.map((seq, i) => `${seq.shown.join(', ')}, ? → ${seq.answer} (${seq.explanation})`).join('\n'))
    }
  }

  return (
    <div className="mm-card">
      <div className="mm-seq-list">
        {exercise.sequences.map((seq, i) => (
          <div key={i} className={`mm-seq-item ${checked ? (results[i] ? 'mm-seq-correct' : 'mm-seq-wrong') : ''}`}>
            <div className="mm-seq-numbers">
              {i + 1}. {seq.shown.join(', ')}, {' '}
              <input className={`mm-seq-input ${checked ? (results[i] ? 'mm-seq-correct' : 'mm-seq-wrong') : ''}`}
                value={answers[i]} onChange={e => { const next = [...answers]; next[i] = e.target.value; setAnswers(next); setChecked(false) }}
                placeholder="?" />
            </div>
            {checked && !results[i] && (
              <div className="mm-seq-explanation">
                Answer: <strong>{seq.answer}</strong> — {seq.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
      {checked && !allCorrect && <div className="mm-error">{score}/{exercise.sequences.length} correct — see explanations below</div>}
      {allFilled && (
        <button className="btn btn-primary mm-complete" onClick={check}>
          {checked && allCorrect ? 'Complete Exercise' : 'Check Answers'}
        </button>
      )}
    </div>
  )
}

// === Main Export ===
export function MMExerciseCard({ exercise, onComplete }: { exercise: MMExercise; onComplete: (response: string) => void }) {
  switch (exercise.type) {
    case 'matchPairs': return <MatchPairsCard exercise={exercise} onComplete={onComplete} />
    case 'multipleChoice': return <MultipleChoiceCard exercise={exercise} onComplete={onComplete} />
    case 'reflection': return <ReflectionCard exercise={exercise} onComplete={onComplete} />
    case 'speedLog': return <SpeedLogCard exercise={exercise} onComplete={onComplete} />
    case 'timedRecall': return <TimedRecallCard exercise={exercise} onComplete={onComplete} />
    case 'sequenceInput': return <SequenceInputCard exercise={exercise} onComplete={onComplete} />
  }
}
