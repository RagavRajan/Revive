import { useState } from 'react'
import type {
  CAExercise, WordHuntExercise, ConsonantWordsExercise,
  ReverseWordsExercise, WordTransformExercise, HomophonesExercise,
  CreativePromptExercise, CAMethodExercise,
} from '../../types/think'

interface CardProps<T extends CAExercise> {
  exercise: T
  onComplete: (response: string) => void
}

function ItemList({ items, onRemove }: { items: string[]; onRemove: (i: number) => void }) {
  if (items.length === 0) return null
  return (
    <div className="ca-items">
      {items.map((item, i) => (
        <div key={i} className="ca-item">
          <span>{item}</span>
          <button className="ca-item-x" onClick={() => onRemove(i)}>&times;</button>
        </div>
      ))}
    </div>
  )
}

function ProgressBar({ current, target }: { current: number; target: number }) {
  const pct = Math.min((current / target) * 100, 100)
  return (
    <div className="ca-progress">
      <div className="ca-progress-bar" style={{ width: `${pct}%` }} />
      <span className="ca-progress-label">{current}/{target}</span>
    </div>
  )
}

function ErrorMsg({ msg }: { msg: string | null }) {
  if (!msg) return null
  return <div className="ca-error">{msg}</div>
}

function letterFrequency(word: string): Record<string, number> {
  const freq: Record<string, number> = {}
  for (const ch of word.toLowerCase()) freq[ch] = (freq[ch] || 0) + 1
  return freq
}

function validateWordHunt(word: string, sourceWord: string, minLetters: number, existing: string[]): string | null {
  if (word.length < minLetters) return `Word must be at least ${minLetters} letters`
  if (!/^[a-z]+$/.test(word)) return 'Letters only — no numbers or symbols'
  if (existing.includes(word)) return 'Already added'
  const available = letterFrequency(sourceWord)
  const needed = letterFrequency(word)
  for (const [ch, count] of Object.entries(needed)) {
    if ((available[ch] || 0) < count) return `"${ch}" not available (or used too many times)`
  }
  return null
}

function validateConsonantWord(word: string, consonants: string[]): string | null {
  if (word.length < 3) return 'Word must be at least 3 letters'
  if (!/^[a-z]+$/.test(word)) return 'Letters only'
  const lower = word.toLowerCase()
  for (const c of consonants) {
    if (!lower.includes(c.toLowerCase())) return `Missing required letter "${c}"`
  }
  return null
}

function validateReversePair(w1: string, w2: string, minLetters: number): string | null {
  if (w1.length < minLetters) return `Word must be at least ${minLetters} letters`
  if (w2.length < minLetters) return `Reversed must be at least ${minLetters} letters`
  if (!/^[a-z]+$/.test(w1) || !/^[a-z]+$/.test(w2)) return 'Letters only'
  if (w1 === w2) return 'Words must be different'
  if (w1 !== w2.split('').reverse().join('')) return `"${w2}" is not "${w1}" spelled backwards`
  return null
}

function WordHuntCard({ exercise, onComplete }: CardProps<WordHuntExercise>) {
  const [items, setItems] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const add = () => {
    const word = input.trim().toLowerCase()
    if (!word) return
    const err = validateWordHunt(word, exercise.sourceWord, exercise.minLetters, items)
    if (err) { setError(err); return }
    setError(null)
    setItems([...items, word])
    setInput('')
  }

  return (
    <div className="ca-card">
      <div className="ca-source">Source word: <strong>{exercise.sourceWord.toUpperCase()}</strong></div>
      <p className="ca-rule">Min {exercise.minLetters} letters. No proper names, slang, or foreign words.</p>
      <ProgressBar current={items.length} target={exercise.targetCount} />
      <div className="ca-input-row">
        <input value={input} onChange={e => { setInput(e.target.value); setError(null) }} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Type a word..." />
        <button className="btn btn-primary" onClick={add}>Add</button>
      </div>
      <ErrorMsg msg={error} />
      <ItemList items={items} onRemove={i => setItems(items.filter((_, idx) => idx !== i))} />
      {items.length >= exercise.targetCount && (
        <button className="btn btn-primary ca-complete" onClick={() => onComplete(items.join(', '))}>Complete Exercise</button>
      )}
    </div>
  )
}

function ConsonantWordsCard({ exercise, onComplete }: CardProps<ConsonantWordsExercise>) {
  const [items, setItems] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [customConsonants, setCustomConsonants] = useState('')
  const [error, setError] = useState<string | null>(null)

  const consonants = exercise.userPicksLetters
    ? customConsonants.toUpperCase().split('').filter(c => /[A-Z]/.test(c))
    : exercise.consonants

  const add = () => {
    const word = input.trim().toLowerCase()
    if (!word) return
    if (items.includes(word)) { setError('Already added'); return }
    if (consonants.length > 0) {
      const err = validateConsonantWord(word, consonants)
      if (err) { setError(err); return }
    }
    setError(null)
    setItems([...items, word])
    setInput('')
  }

  return (
    <div className="ca-card">
      {exercise.userPicksLetters ? (
        <div className="ca-input-row" style={{ marginBottom: 12 }}>
          <label>Your consonants:</label>
          <input value={customConsonants} onChange={e => setCustomConsonants(e.target.value)} placeholder="e.g. S, N, P" style={{ width: 120 }} />
        </div>
      ) : (
        <div className="ca-source">Must contain: <strong>{consonants.join(', ')}</strong></div>
      )}
      <ProgressBar current={items.length} target={exercise.targetCount} />
      <div className="ca-input-row">
        <input value={input} onChange={e => { setInput(e.target.value); setError(null) }} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Type a word..." />
        <button className="btn btn-primary" onClick={add}>Add</button>
      </div>
      <ErrorMsg msg={error} />
      <ItemList items={items} onRemove={i => setItems(items.filter((_, idx) => idx !== i))} />
      {items.length >= exercise.targetCount && (
        <button className="btn btn-primary ca-complete" onClick={() => onComplete((exercise.userPicksLetters ? `[${consonants.join(',')}] ` : '') + items.join(', '))}>Complete Exercise</button>
      )}
    </div>
  )
}

function ReverseWordsCard({ exercise, onComplete }: CardProps<ReverseWordsExercise>) {
  const [pairs, setPairs] = useState<[string, string][]>([])
  const [word1, setWord1] = useState('')
  const [word2, setWord2] = useState('')
  const [error, setError] = useState<string | null>(null)

  const add = () => {
    const w1 = word1.trim().toLowerCase()
    const w2 = word2.trim().toLowerCase()
    if (!w1 || !w2) return
    const err = validateReversePair(w1, w2, exercise.minLetters)
    if (err) { setError(err); return }
    if (pairs.some(([a]) => a === w1)) { setError('Already added'); return }
    setError(null)
    setPairs([...pairs, [w1, w2]])
    setWord1('')
    setWord2('')
  }

  return (
    <div className="ca-card">
      {exercise.addPlurals && <p className="ca-rule">Find pairs where adding "s" to both words creates new valid pairs.</p>}
      <p className="ca-rule">Min {exercise.minLetters} letters per word. The second word must be the first spelled backwards.</p>
      <ProgressBar current={pairs.length} target={exercise.targetCount} />
      <div className="ca-input-row">
        <input value={word1} onChange={e => { setWord1(e.target.value); setError(null) }} placeholder="Word" style={{ flex: 1 }} />
        <span style={{ color: 'var(--color-text-muted)' }}>=</span>
        <input value={word2} onChange={e => { setWord2(e.target.value); setError(null) }} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Reversed" style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={add}>Add</button>
      </div>
      <ErrorMsg msg={error} />
      {pairs.length > 0 && (
        <div className="ca-items">
          {pairs.map(([a, b], i) => (
            <div key={i} className="ca-item">
              <span>{a} = {b}</span>
              <button className="ca-item-x" onClick={() => setPairs(pairs.filter((_, idx) => idx !== i))}>&times;</button>
            </div>
          ))}
        </div>
      )}
      {pairs.length >= exercise.targetCount && (
        <button className="btn btn-primary ca-complete" onClick={() => onComplete(pairs.map(([a, b]) => `${a} = ${b}`).join(', '))}>Complete Exercise</button>
      )}
    </div>
  )
}

function WordTransformCard({ exercise, onComplete }: CardProps<WordTransformExercise>) {
  const [chains, setChains] = useState<string[]>([])
  const [input, setInput] = useState('')

  const add = () => {
    const chain = input.trim()
    if (chain) {
      setChains([...chains, chain])
      setInput('')
    }
  }

  return (
    <div className="ca-card">
      <div className="ca-rules">
        {exercise.rules.map((r, i) => <p key={i} className="ca-rule">{i + 1}. {r}</p>)}
      </div>
      <div className="ca-source">Example: <strong>{exercise.example}</strong></div>
      <ProgressBar current={chains.length} target={exercise.targetCount} />
      <div className="ca-input-row">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="e.g. stone → tone → one → on" style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={add}>Add</button>
      </div>
      <ItemList items={chains} onRemove={i => setChains(chains.filter((_, idx) => idx !== i))} />
      {chains.length >= exercise.targetCount && (
        <button className="btn btn-primary ca-complete" onClick={() => onComplete(chains.join('\n'))}>Complete Exercise</button>
      )}
    </div>
  )
}

function HomophonesCard({ exercise, onComplete }: CardProps<HomophonesExercise>) {
  const [pairs, setPairs] = useState<string[]>([])
  const [input, setInput] = useState('')

  const add = () => {
    const pair = input.trim()
    if (pair) {
      setPairs([...pairs, pair])
      setInput('')
    }
  }

  return (
    <div className="ca-card">
      <div className="ca-tips">
        {exercise.tips.map((t, i) => <p key={i} className="ca-rule">Tip: {t}</p>)}
      </div>
      <div className="ca-source">Examples: {exercise.examples.join(' | ')}</div>
      <ProgressBar current={pairs.length} target={exercise.targetCount} />
      <div className="ca-input-row">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="e.g. pear = pare" style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={add}>Add</button>
      </div>
      <ItemList items={pairs} onRemove={i => setPairs(pairs.filter((_, idx) => idx !== i))} />
      {pairs.length >= exercise.targetCount && (
        <button className="btn btn-primary ca-complete" onClick={() => onComplete(pairs.join('\n'))}>Complete Exercise</button>
      )}
    </div>
  )
}

function CreativePromptCard({ exercise, onComplete }: CardProps<CreativePromptExercise>) {
  const [answers, setAnswers] = useState<string[]>(exercise.questions.map(() => ''))

  const allFilled = answers.every(a => a.trim().length >= 5)

  return (
    <div className="ca-card">
      <div className="ca-prompts">
        {exercise.questions.map((q, i) => (
          <div key={i} className="ca-prompt-item">
            <label className="ca-prompt-q">{i + 1}. {q}</label>
            <textarea
              value={answers[i]}
              onChange={e => {
                const next = [...answers]
                next[i] = e.target.value
                setAnswers(next)
              }}
              rows={2}
              placeholder="Your answer..."
            />
          </div>
        ))}
      </div>
      {allFilled && (
        <button className="btn btn-primary ca-complete" onClick={() => onComplete(exercise.questions.map((q, i) => `${q}\n${answers[i]}`).join('\n\n'))}>Complete Exercise</button>
      )}
    </div>
  )
}

function CAExerciseCard({ exercise, onComplete }: CardProps<CAMethodExercise>) {
  const [product, setProduct] = useState('')
  const [response, setResponse] = useState('')

  const canComplete = product.trim().length >= 2 && response.trim().length >= 20

  return (
    <div className="ca-card">
      <div className="ca-guidance">{exercise.guidance}</div>
      {exercise.productSuggestions && (
        <div className="ca-suggestions">
          {exercise.productSuggestions.map((s, i) => (
            <button key={i} className="ca-chip" onClick={() => setProduct(s)}>{s}</button>
          ))}
        </div>
      )}
      <div className="ca-input-row" style={{ marginBottom: 12 }}>
        <label style={{ whiteSpace: 'nowrap' }}>Product:</label>
        <input value={product} onChange={e => setProduct(e.target.value)} placeholder="What are you working with?" style={{ flex: 1 }} />
      </div>
      <textarea
        className="ca-textarea"
        value={response}
        onChange={e => setResponse(e.target.value)}
        rows={10}
        placeholder={`Write your ${exercise.targetCount} responses here...\n\n1. \n2. \n3. `}
      />
      {canComplete && (
        <button className="btn btn-primary ca-complete" onClick={() => onComplete(`Product: ${product}\n\n${response}`)}>Complete Exercise</button>
      )}
    </div>
  )
}

export function ExerciseCard({ exercise, onComplete }: { exercise: CAExercise; onComplete: (response: string) => void }) {
  switch (exercise.type) {
    case 'wordHunt': return <WordHuntCard exercise={exercise} onComplete={onComplete} />
    case 'consonantWords': return <ConsonantWordsCard exercise={exercise} onComplete={onComplete} />
    case 'reverseWords': return <ReverseWordsCard exercise={exercise} onComplete={onComplete} />
    case 'wordTransform': return <WordTransformCard exercise={exercise} onComplete={onComplete} />
    case 'homophones': return <HomophonesCard exercise={exercise} onComplete={onComplete} />
    case 'creativePrompt': return <CreativePromptCard exercise={exercise} onComplete={onComplete} />
    case 'caExercise': return <CAExerciseCard exercise={exercise} onComplete={onComplete} />
  }
}
