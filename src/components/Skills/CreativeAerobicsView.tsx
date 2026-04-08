import { useState } from 'react'
import { useCreativeAerobics } from '../../hooks/useCreativeAerobics'
import { chapters, getExercise, getChapterForDay, TOTAL_DAYS } from '../../data/creativeAerobics'
import { ExerciseCard } from './ExerciseCards'

interface Props {
  onBack: () => void
}

export function CreativeAerobicsView({ onBack }: Props) {
  const { loading, complete, redo, isCompleted, getResponse, completedCount } = useCreativeAerobics()
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
      <div className="ca-detail">
        <div className="ca-detail-header">
          <button className="ca-back" onClick={() => setSelectedDay(null)}>&larr; Back</button>
          <div>
            <div className="ca-detail-day">Day {selectedDay}</div>
            <div className="ca-detail-ch">Ch {chapter.id}: {chapter.title}</div>
          </div>
        </div>

        <div className="ca-tabs">
          <button className={`ca-tab ${activeTab === 'read' ? 'ca-tab-active' : ''}`} onClick={() => setActiveTab('read')}>Read</button>
          <button className={`ca-tab ${activeTab === 'exercise' ? 'ca-tab-active' : ''}`} onClick={() => setActiveTab('exercise')}>Exercise</button>
        </div>

        <div className="ca-detail-body">
          <div className="ca-reading" style={{ display: activeTab === 'read' ? 'block' : 'none' }}>
            <h3 className="ca-reading-title">Chapter {chapter.id}: {chapter.title}</h3>
            {chapter.reading.split('\n\n').map((p, i) => <p key={i} className="ca-reading-p">{p}</p>)}
          </div>
          <div className="ca-exercise" style={{ display: activeTab === 'exercise' ? 'block' : 'none' }}>
            <h3 className="ca-exercise-title">{exercise.title}</h3>
            <p className="ca-exercise-prompt">{exercise.prompt}</p>
            {completed && savedResponse ? (
              <div className="ca-completed-section">
                <div className="ca-completed-badge">Completed</div>
                <div className="ca-saved-response">{savedResponse}</div>
                <button className="btn btn-outline" onClick={() => redo(exercise.id)}>Redo Exercise</button>
              </div>
            ) : (
              <ExerciseCard exercise={exercise} onComplete={(response) => complete(exercise.id, response)} />
            )}
          </div>
        </div>

        <style>{detailStyles}</style>
      </div>
    )
  }

  // Chapter list view
  return (
    <div className="ca-list">
      <div className="ca-list-header">
        <button className="ca-back" onClick={onBack}>&larr; Skills</button>
        <div className="ca-list-progress">{completedCount}/{TOTAL_DAYS} completed</div>
      </div>

      <h2 className="ca-list-title">Creative Aerobics</h2>

      <div className="ca-chapters">
        {chapters.map(ch => (
          <div key={ch.id} className="ca-chapter-card">
            <div className="ca-chapter-info">
              <span className="ca-chapter-num">Ch {ch.id}</span>
              <span className="ca-chapter-title">{ch.title}</span>
            </div>
            <div className="ca-day-circles">
              {ch.days.map(day => {
                const ex = getExercise(day)
                const done = ex ? isCompleted(ex.id) : false
                return (
                  <button
                    key={day}
                    className={`ca-day-circle ${done ? 'ca-day-done' : ''}`}
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
  .ca-list {
    padding: 16px;
    max-width: 600px;
    margin: 0 auto;
  }
  .ca-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .ca-list-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 20px;
  }
  .ca-list-progress {
    font-size: 0.85rem;
    color: var(--color-primary);
    font-weight: 600;
  }
  .ca-chapters {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ca-chapter-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 14px 16px;
  }
  .ca-chapter-info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  .ca-chapter-num {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--color-primary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
  .ca-chapter-title {
    font-size: 0.9rem;
    color: var(--color-text);
    font-weight: 500;
  }
  .ca-day-circles {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .ca-day-circle {
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
  .ca-day-circle:hover {
    border-color: var(--color-primary);
    color: var(--color-text);
  }
  .ca-day-done {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }
`

const detailStyles = `
  .ca-detail {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .ca-detail-header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }
  .ca-back {
    font-size: 0.9rem;
    color: var(--color-primary);
    white-space: nowrap;
  }
  .ca-detail-day {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text);
  }
  .ca-detail-ch {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }
  .ca-tabs {
    display: flex;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }
  .ca-tab {
    flex: 1;
    padding: 10px;
    text-align: center;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text-muted);
    border-bottom: 2px solid transparent;
    transition: all var(--transition);
  }
  .ca-tab:hover {
    color: var(--color-text);
  }
  .ca-tab-active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
  }
  .ca-detail-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
  }
  /* Reading */
  .ca-reading-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 16px;
  }
  .ca-reading-p {
    font-size: 0.9rem;
    color: var(--color-text);
    line-height: 1.7;
    margin-bottom: 14px;
    opacity: 0.9;
  }
  /* Exercise */
  .ca-exercise-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 8px;
  }
  .ca-exercise-prompt {
    font-size: 0.88rem;
    color: var(--color-text);
    line-height: 1.6;
    margin-bottom: 16px;
    opacity: 0.85;
  }
  /* Completed */
  .ca-completed-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .ca-completed-badge {
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
  .ca-saved-response {
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
  /* Card shared styles */
  .ca-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .ca-source {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    padding: 8px 12px;
    background: var(--color-surface);
    border-radius: var(--radius);
    border: 1px solid var(--color-border);
  }
  .ca-source strong {
    color: var(--color-primary);
    letter-spacing: 1px;
  }
  .ca-rule {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    line-height: 1.5;
  }
  .ca-rules {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 12px;
    background: var(--color-surface);
    border-radius: var(--radius);
    border: 1px solid var(--color-border);
  }
  .ca-progress {
    position: relative;
    height: 24px;
    background: var(--color-surface);
    border-radius: 12px;
    border: 1px solid var(--color-border);
    overflow: hidden;
  }
  .ca-progress-bar {
    height: 100%;
    background: var(--color-primary);
    border-radius: 12px;
    transition: width 300ms ease;
    opacity: 0.7;
  }
  .ca-progress-label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-text);
  }
  .ca-input-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .ca-input-row input {
    flex: 1;
    min-width: 0;
  }
  .ca-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    max-height: 200px;
    overflow-y: auto;
  }
  .ca-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 4px 10px;
    font-size: 0.8rem;
    color: var(--color-text);
  }
  .ca-item-x {
    font-size: 1rem;
    color: var(--color-text-muted);
    line-height: 1;
    cursor: pointer;
  }
  .ca-item-x:hover {
    color: var(--color-danger);
  }
  .ca-complete {
    align-self: stretch;
    margin-top: 8px;
  }
  /* Creative prompts */
  .ca-prompts {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .ca-prompt-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .ca-prompt-q {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text);
  }
  .ca-prompt-item textarea {
    font-family: inherit;
    font-size: 0.85rem;
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 8px 12px;
    resize: vertical;
    outline: none;
  }
  .ca-prompt-item textarea:focus {
    border-color: var(--color-primary);
  }
  /* CA Exercise */
  .ca-guidance {
    font-size: 0.82rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    padding: 10px 12px;
    background: var(--color-surface);
    border-radius: var(--radius);
    border-left: 3px solid var(--color-primary);
  }
  .ca-suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .ca-chip {
    font-size: 0.75rem;
    padding: 4px 12px;
    border-radius: 20px;
    background: var(--color-surface-hover);
    color: var(--color-text-muted);
    border: 1px solid var(--color-border);
    cursor: pointer;
    transition: all var(--transition);
  }
  .ca-chip:hover {
    border-color: var(--color-primary);
    color: var(--color-text);
  }
  .ca-textarea {
    font-family: inherit;
    font-size: 0.85rem;
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 12px;
    resize: vertical;
    outline: none;
    width: 100%;
    min-height: 200px;
  }
  .ca-textarea:focus {
    border-color: var(--color-primary);
  }
  .ca-tips {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 12px;
    background: var(--color-surface);
    border-radius: var(--radius);
    border: 1px solid var(--color-border);
  }
  .ca-error {
    font-size: 0.8rem;
    color: var(--color-danger);
    padding: 6px 10px;
    background: var(--color-danger-bg);
    border-radius: var(--radius);
  }
`
