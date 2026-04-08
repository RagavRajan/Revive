import { useState } from 'react'
import { useSpeedReading } from '../../hooks/useSpeedReading'
import { chapters, getExercise, getChapterForDay, TOTAL_DAYS } from '../../data/speedReading'
import { SRExerciseCard } from './SRExerciseCards'

interface Props {
  onBack: () => void
}

export function SpeedReadingView({ onBack }: Props) {
  const { loading, complete, redo, isCompleted, getResponse, completedCount } = useSpeedReading()
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'read' | 'exercise'>('exercise')

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>Loading...</div>
  }

  // Day detail view
  if (selectedDay !== null) {
    const exercise = getExercise(selectedDay)
    const chapter = getChapterForDay(selectedDay)
    if (!exercise || !chapter) return null

    const completed = isCompleted(exercise.id)
    const savedResponse = getResponse(exercise.id)

    return (
      <div className="sr-detail">
        <div className="sr-detail-header">
          <button className="sr-back" onClick={() => setSelectedDay(null)}>&larr; Back</button>
          <div>
            <div className="sr-detail-day">Day {selectedDay}</div>
            <div className="sr-detail-ch">Ch {chapter.id}: {chapter.title}</div>
          </div>
        </div>

        <div className="sr-tabs">
          <button className={`sr-tab ${activeTab === 'read' ? 'sr-tab-active' : ''}`} onClick={() => setActiveTab('read')}>Read</button>
          <button className={`sr-tab ${activeTab === 'exercise' ? 'sr-tab-active' : ''}`} onClick={() => setActiveTab('exercise')}>Exercise</button>
        </div>

        <div className="sr-detail-body">
          <div style={{ display: activeTab === 'read' ? 'block' : 'none' }}>
            <h3 className="sr-reading-title">Chapter {chapter.id}: {chapter.title}</h3>
            {chapter.reading.split('\n\n').map((p, i) => <p key={i} className="sr-reading-p">{p}</p>)}
          </div>
          <div style={{ display: activeTab === 'exercise' ? 'block' : 'none' }}>
            <h3 className="sr-exercise-title">{exercise.title}</h3>
            <p className="sr-exercise-prompt">{exercise.prompt}</p>
            {completed && savedResponse ? (
              <div className="sr-completed-section">
                <div className="sr-completed-badge">Completed</div>
                <div className="sr-saved-response">{savedResponse}</div>
                <button className="btn btn-outline" onClick={() => redo(exercise.id)}>Redo Exercise</button>
              </div>
            ) : (
              <SRExerciseCard exercise={exercise} onComplete={(response) => complete(exercise.id, response)} />
            )}
          </div>
        </div>

        <style>{detailStyles}</style>
      </div>
    )
  }

  // Chapter list view
  return (
    <div className="sr-list">
      <div className="sr-list-header">
        <button className="sr-back" onClick={onBack}>&larr; Skills</button>
        <div className="sr-list-progress">{completedCount}/{TOTAL_DAYS} completed</div>
      </div>

      <h2 className="sr-list-title">Speed Reading</h2>

      <div className="sr-chapters">
        {chapters.map(ch => (
          <div key={ch.id} className="sr-chapter-card">
            <div className="sr-chapter-info">
              <span className="sr-chapter-num">Ch {ch.id}</span>
              <span className="sr-chapter-title">{ch.title}</span>
            </div>
            <div className="sr-day-circles">
              {ch.days.map(day => {
                const ex = getExercise(day)
                const done = ex ? isCompleted(ex.id) : false
                return (
                  <button
                    key={day}
                    className={`sr-day-circle ${done ? 'sr-day-done' : ''}`}
                    onClick={() => { setSelectedDay(day); setActiveTab('exercise') }}
                    title={ex?.title}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <style>{listStyles}</style>
    </div>
  )
}

const listStyles = `
  .sr-list {
    padding: 16px;
    max-width: 600px;
    margin: 0 auto;
  }
  .sr-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .sr-list-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 20px;
  }
  .sr-list-progress {
    font-size: 0.85rem;
    color: var(--color-primary);
    font-weight: 600;
  }
  .sr-chapters {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .sr-chapter-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 14px 16px;
  }
  .sr-chapter-info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  .sr-chapter-num {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--color-primary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
  .sr-chapter-title {
    font-size: 0.9rem;
    color: var(--color-text);
    font-weight: 500;
  }
  .sr-day-circles {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .sr-day-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
    background: var(--color-surface-hover);
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
    cursor: pointer;
    transition: all var(--transition);
  }
  .sr-day-circle:hover {
    border-color: var(--color-primary);
    color: var(--color-text);
  }
  .sr-day-done {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }
`

const detailStyles = `
  .sr-detail {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .sr-detail-header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }
  .sr-back {
    font-size: 0.9rem;
    color: var(--color-primary);
    white-space: nowrap;
  }
  .sr-detail-day {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text);
  }
  .sr-detail-ch {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }
  .sr-tabs {
    display: flex;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }
  .sr-tab {
    flex: 1;
    padding: 10px;
    text-align: center;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text-muted);
    border-bottom: 2px solid transparent;
    transition: all var(--transition);
  }
  .sr-tab:hover { color: var(--color-text); }
  .sr-tab-active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
  }
  .sr-detail-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
  }
  .sr-reading-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 16px;
  }
  .sr-reading-p {
    font-size: 0.9rem;
    color: var(--color-text);
    line-height: 1.7;
    margin-bottom: 14px;
    opacity: 0.9;
  }
  .sr-exercise-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 8px;
  }
  .sr-exercise-prompt {
    font-size: 0.88rem;
    color: var(--color-text);
    line-height: 1.6;
    margin-bottom: 16px;
    opacity: 0.85;
  }
  .sr-completed-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .sr-completed-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-success);
    background: var(--color-success-bg);
    padding: 6px 14px;
    border-radius: var(--radius);
    align-self: flex-start;
  }
  .sr-saved-response {
    font-size: 0.85rem;
    color: var(--color-text);
    line-height: 1.6;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 14px;
    white-space: pre-wrap;
    max-height: 300px;
    overflow-y: auto;
  }
  /* SR Exercise Card styles */
  .sr-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .sr-error {
    font-size: 0.8rem;
    color: var(--color-danger);
    padding: 6px 10px;
    background: var(--color-danger-bg);
    border-radius: var(--radius);
  }
  .sr-complete {
    align-self: stretch;
    margin-top: 8px;
  }
  /* Match pairs */
  .sr-match-progress {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-primary);
    text-align: center;
  }
  .sr-match-grid {
    display: flex;
    gap: 12px;
  }
  .sr-match-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .sr-match-item {
    padding: 8px 10px;
    font-size: 0.8rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--color-text);
    text-align: left;
    cursor: pointer;
    transition: all var(--transition);
  }
  .sr-match-item:hover:not(:disabled) {
    border-color: var(--color-primary);
  }
  .sr-match-selected {
    border-color: var(--color-primary);
    background: var(--color-primary);
    color: white;
  }
  .sr-match-target:not(:disabled) {
    border-color: var(--color-primary);
    border-style: dashed;
  }
  .sr-match-done {
    opacity: 0.5;
    background: var(--color-success-bg);
    border-color: var(--color-success);
    color: var(--color-success);
  }
  /* Vocab fill */
  .sr-wordbank {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 10px 12px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    align-items: center;
  }
  .sr-wordbank-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-text-muted);
    margin-right: 4px;
  }
  .sr-wordbank-word {
    font-size: 0.8rem;
    padding: 2px 8px;
    background: var(--color-surface-hover);
    border-radius: var(--radius);
    color: var(--color-primary);
    font-weight: 500;
  }
  .sr-fill-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .sr-fill-item {
    display: flex;
    align-items: baseline;
    gap: 6px;
    font-size: 0.85rem;
    color: var(--color-text);
    line-height: 1.6;
    padding: 6px 0;
  }
  .sr-fill-num {
    font-weight: 600;
    color: var(--color-text-muted);
    flex-shrink: 0;
  }
  .sr-fill-text {
    flex: 1;
  }
  .sr-fill-input {
    display: inline-block;
    width: 120px;
    padding: 2px 8px;
    font-size: 0.85rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--color-text);
    font-family: inherit;
    outline: none;
  }
  .sr-fill-input:focus {
    border-color: var(--color-primary);
  }
  .sr-fill-correct .sr-fill-input {
    border-color: var(--color-success);
    background: var(--color-success-bg);
  }
  .sr-fill-wrong .sr-fill-input {
    border-color: var(--color-danger);
    background: var(--color-danger-bg);
  }
  .sr-fill-answer {
    font-size: 0.75rem;
    color: var(--color-success);
    font-weight: 600;
  }
  /* Multiple choice */
  .sr-mc-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .sr-mc-question {
    padding: 10px;
    border-radius: var(--radius);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
  }
  .sr-mc-correct {
    border-color: var(--color-success);
  }
  .sr-mc-wrong {
    border-color: var(--color-danger);
  }
  .sr-mc-q {
    font-size: 0.85rem;
    color: var(--color-text);
    margin-bottom: 8px;
    line-height: 1.5;
  }
  .sr-mc-options {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .sr-mc-option {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 0.82rem;
    color: var(--color-text-muted);
    padding: 6px 8px;
    border-radius: var(--radius);
    cursor: pointer;
    transition: background var(--transition);
    line-height: 1.4;
  }
  .sr-mc-option:hover {
    background: var(--color-surface-hover);
  }
  .sr-mc-option input {
    margin-top: 2px;
    flex-shrink: 0;
  }
  .sr-mc-chosen {
    background: var(--color-surface-hover);
    color: var(--color-text);
    font-weight: 500;
  }
  .sr-mc-answer {
    background: var(--color-success-bg);
    color: var(--color-success);
    font-weight: 600;
  }
  /* Reflection */
  .sr-prompts {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .sr-prompt-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .sr-prompt-q {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.5;
  }
  .sr-textarea {
    font-family: inherit;
    font-size: 0.85rem;
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 8px 12px;
    resize: vertical;
    outline: none;
    width: 100%;
  }
  .sr-textarea:focus {
    border-color: var(--color-primary);
  }
  /* Speed log */
  .sr-guidance {
    font-size: 0.82rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    padding: 10px 12px;
    background: var(--color-surface);
    border-radius: var(--radius);
    border-left: 3px solid var(--color-primary);
  }
  .sr-speed-inputs {
    display: flex;
    gap: 12px;
    align-items: flex-end;
    flex-wrap: wrap;
  }
  .sr-speed-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .sr-speed-field label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text-muted);
  }
  .sr-speed-field input {
    width: 100px;
    padding: 6px 10px;
    font-size: 0.9rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--color-text);
    font-family: inherit;
    outline: none;
  }
  .sr-speed-field input:focus {
    border-color: var(--color-primary);
  }
  .sr-wpm-result {
    display: flex;
    align-items: baseline;
    gap: 6px;
    padding: 6px 14px;
    background: var(--color-primary);
    border-radius: var(--radius);
  }
  .sr-wpm-number {
    font-size: 1.3rem;
    font-weight: 700;
    color: white;
  }
  .sr-wpm-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: rgba(255,255,255,0.8);
    text-transform: uppercase;
  }
`
