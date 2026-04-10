import { useState } from 'react'
import { useMaximizeMemory } from '../../hooks/useMaximizeMemory'
import { chapters, getExercise, getChapterForDay, TOTAL_DAYS } from '../../data/maximizeMemory'
import { MMExerciseCard } from './MMExerciseCards'

interface Props {
  onBack: () => void
}

export function MaximizeMemoryView({ onBack }: Props) {
  const { loading, complete, redo, isCompleted, getResponse, completedCount } = useMaximizeMemory()
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
      <div className="mm-detail">
        <div className="mm-detail-header">
          <button className="mm-back" onClick={() => setSelectedDay(null)}>&larr; Back</button>
          <div>
            <div className="mm-detail-day">Day {selectedDay}</div>
            <div className="mm-detail-ch">Ch {chapter.id}: {chapter.title}</div>
          </div>
        </div>

        <div className="mm-tabs">
          <button className={`mm-tab ${activeTab === 'read' ? 'mm-tab-active' : ''}`} onClick={() => setActiveTab('read')}>Read</button>
          <button className={`mm-tab ${activeTab === 'exercise' ? 'mm-tab-active' : ''}`} onClick={() => setActiveTab('exercise')}>Exercise</button>
        </div>

        <div className="mm-detail-body">
          <div style={{ display: activeTab === 'read' ? 'block' : 'none' }}>
            <h3 className="mm-reading-title">Chapter {chapter.id}: {chapter.title}</h3>
            {chapter.reading.split('\n\n').map((p, i) => <p key={i} className="mm-reading-p">{p}</p>)}
          </div>
          <div style={{ display: activeTab === 'exercise' ? 'block' : 'none' }}>
            <h3 className="mm-exercise-title">{exercise.title}</h3>
            <p className="mm-exercise-prompt">{exercise.prompt}</p>
            {completed && savedResponse ? (
              <div className="mm-completed-section">
                <div className="mm-completed-badge">Completed</div>
                <div className="mm-saved-response">{savedResponse}</div>
                <button className="btn btn-outline" onClick={() => redo(exercise.id)}>Redo Exercise</button>
              </div>
            ) : (
              <MMExerciseCard exercise={exercise} onComplete={(response) => complete(exercise.id, response)} />
            )}
          </div>
        </div>

        <style>{detailStyles}</style>
      </div>
    )
  }

  // Chapter list view
  return (
    <div className="mm-list">
      <div className="mm-list-header">
        <button className="mm-back" onClick={onBack}>&larr; Skills</button>
        <div className="mm-list-progress">{completedCount}/{TOTAL_DAYS} completed</div>
      </div>

      <h2 className="mm-list-title">Maximize Your Memory</h2>

      <div className="mm-chapters">
        {chapters.map(ch => (
          <div key={ch.id} className="mm-chapter-card">
            <div className="mm-chapter-info">
              <span className="mm-chapter-num">Ch {ch.id}</span>
              <span className="mm-chapter-title">{ch.title}</span>
            </div>
            <div className="mm-day-circles">
              {ch.days.map(day => {
                const ex = getExercise(day)
                const done = ex ? isCompleted(ex.id) : false
                return (
                  <button
                    key={day}
                    className={`mm-day-circle ${done ? 'mm-day-done' : ''}`}
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
  .mm-list { padding: 16px; max-width: 600px; margin: 0 auto; }
  .mm-list-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .mm-list-title { font-size: 1.2rem; font-weight: 700; color: var(--color-text); margin-bottom: 20px; }
  .mm-list-progress { font-size: 0.85rem; color: var(--color-primary); font-weight: 600; }
  .mm-chapters { display: flex; flex-direction: column; gap: 10px; }
  .mm-chapter-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 14px 16px; }
  .mm-chapter-info { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .mm-chapter-num { font-size: 0.7rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; }
  .mm-chapter-title { font-size: 0.9rem; color: var(--color-text); font-weight: 500; }
  .mm-day-circles { display: flex; flex-wrap: wrap; gap: 8px; }
  .mm-day-circle { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600; background: var(--color-surface-hover); color: var(--color-text-muted); border: 1px solid var(--color-border); cursor: pointer; transition: all var(--transition); }
  .mm-day-circle:hover { border-color: var(--color-primary); color: var(--color-text); }
  .mm-day-done { background: var(--color-primary); color: white; border-color: var(--color-primary); }
`

const detailStyles = `
  .mm-detail { display: flex; flex-direction: column; height: 100%; }
  .mm-detail-header { display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-bottom: 1px solid var(--color-border); flex-shrink: 0; }
  .mm-back { font-size: 0.9rem; color: var(--color-primary); white-space: nowrap; }
  .mm-detail-day { font-size: 1rem; font-weight: 700; color: var(--color-text); }
  .mm-detail-ch { font-size: 0.75rem; color: var(--color-text-muted); }
  .mm-tabs { display: flex; border-bottom: 1px solid var(--color-border); flex-shrink: 0; }
  .mm-tab { flex: 1; padding: 10px; text-align: center; font-size: 0.85rem; font-weight: 600; color: var(--color-text-muted); border-bottom: 2px solid transparent; transition: all var(--transition); }
  .mm-tab:hover { color: var(--color-text); }
  .mm-tab-active { color: var(--color-primary); border-bottom-color: var(--color-primary); }
  .mm-detail-body { flex: 1; overflow-y: auto; padding: 16px; max-width: 600px; margin: 0 auto; width: 100%; }
  .mm-reading-title { font-size: 1.1rem; font-weight: 700; color: var(--color-text); margin-bottom: 16px; }
  .mm-reading-p { font-size: 0.9rem; color: var(--color-text); line-height: 1.7; margin-bottom: 14px; opacity: 0.9; }
  .mm-exercise-title { font-size: 1.05rem; font-weight: 700; color: var(--color-text); margin-bottom: 8px; }
  .mm-exercise-prompt { font-size: 0.88rem; color: var(--color-text); line-height: 1.6; margin-bottom: 16px; opacity: 0.85; }
  .mm-completed-section { display: flex; flex-direction: column; gap: 12px; }
  .mm-completed-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 600; color: var(--color-success); background: var(--color-success-bg); padding: 6px 14px; border-radius: var(--radius); align-self: flex-start; }
  .mm-saved-response { font-size: 0.85rem; color: var(--color-text); line-height: 1.6; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius); padding: 14px; white-space: pre-wrap; max-height: 300px; overflow-y: auto; }
  .mm-card { display: flex; flex-direction: column; gap: 12px; }
  .mm-error { font-size: 0.8rem; color: var(--color-danger); padding: 6px 10px; background: var(--color-danger-bg); border-radius: var(--radius); }
  .mm-complete { align-self: stretch; margin-top: 8px; }
  .mm-match-progress { font-size: 0.85rem; font-weight: 600; color: var(--color-primary); text-align: center; }
  .mm-match-grid { display: flex; gap: 12px; }
  .mm-match-col { flex: 1; display: flex; flex-direction: column; gap: 6px; }
  .mm-match-item { padding: 8px 10px; font-size: 0.8rem; border: 1px solid var(--color-border); border-radius: var(--radius); background: var(--color-surface); color: var(--color-text); text-align: left; cursor: pointer; transition: all var(--transition); }
  .mm-match-item:hover:not(:disabled) { border-color: var(--color-primary); }
  .mm-match-selected { border-color: var(--color-primary); background: var(--color-primary); color: white; }
  .mm-match-target:not(:disabled) { border-color: var(--color-primary); border-style: dashed; }
  .mm-match-done { opacity: 0.5; background: var(--color-success-bg); border-color: var(--color-success); color: var(--color-success); }
  .mm-mc-list { display: flex; flex-direction: column; gap: 16px; }
  .mm-mc-question { padding: 10px; border-radius: var(--radius); border: 1px solid var(--color-border); background: var(--color-surface); }
  .mm-mc-correct { border-color: var(--color-success); }
  .mm-mc-wrong { border-color: var(--color-danger); }
  .mm-mc-q { font-size: 0.85rem; color: var(--color-text); margin-bottom: 8px; line-height: 1.5; }
  .mm-mc-options { display: flex; flex-direction: column; gap: 4px; }
  .mm-mc-option { display: flex; align-items: flex-start; gap: 8px; font-size: 0.82rem; color: var(--color-text-muted); padding: 6px 8px; border-radius: var(--radius); cursor: pointer; transition: background var(--transition); line-height: 1.4; }
  .mm-mc-option:hover { background: var(--color-surface-hover); }
  .mm-mc-option input { margin-top: 2px; flex-shrink: 0; }
  .mm-mc-chosen { background: var(--color-surface-hover); color: var(--color-text); font-weight: 500; }
  .mm-mc-answer { background: var(--color-success-bg); color: var(--color-success); font-weight: 600; }
  .mm-prompts { display: flex; flex-direction: column; gap: 14px; }
  .mm-prompt-item { display: flex; flex-direction: column; gap: 6px; }
  .mm-prompt-q { font-size: 0.85rem; font-weight: 600; color: var(--color-text); line-height: 1.5; }
  .mm-textarea { font-family: inherit; font-size: 0.85rem; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); border-radius: var(--radius); padding: 8px 12px; resize: vertical; outline: none; width: 100%; }
  .mm-textarea:focus { border-color: var(--color-primary); }
  .mm-guidance { font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.6; padding: 10px 12px; background: var(--color-surface); border-radius: var(--radius); border-left: 3px solid var(--color-primary); }
  .mm-speed-inputs { display: flex; gap: 12px; align-items: flex-end; flex-wrap: wrap; }
  .mm-speed-field { display: flex; flex-direction: column; gap: 4px; }
  .mm-speed-field label { font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); }
  .mm-speed-field input { width: 100px; padding: 6px 10px; font-size: 0.9rem; border: 1px solid var(--color-border); border-radius: var(--radius); background: var(--color-surface); color: var(--color-text); font-family: inherit; outline: none; }
  .mm-speed-field input:focus { border-color: var(--color-primary); }
  .mm-wpm-result { display: flex; align-items: baseline; gap: 6px; padding: 6px 14px; background: var(--color-primary); border-radius: var(--radius); }
  .mm-wpm-number { font-size: 1.3rem; font-weight: 700; color: white; }
  .mm-wpm-label { font-size: 0.7rem; font-weight: 600; color: rgba(255,255,255,0.8); text-transform: uppercase; }
  .mm-timer-bar { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; margin-bottom: 12px; border-bottom: 1px solid var(--color-border); position: sticky; top: 0; background: var(--color-bg); z-index: 1; }
  .mm-timer-clock { font-size: 1.4rem; font-weight: 700; color: var(--color-primary); font-variant-numeric: tabular-nums; }
  .mm-recall-items { display: flex; flex-direction: column; gap: 6px; padding: 12px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius); }
  .mm-recall-item { font-size: 0.9rem; color: var(--color-text); padding: 4px 0; }
  .mm-recall-input { width: 100%; padding: 6px 10px; font-size: 0.85rem; border: 1px solid var(--color-border); border-radius: var(--radius); background: var(--color-surface); color: var(--color-text); font-family: inherit; outline: none; }
  .mm-recall-input:focus { border-color: var(--color-primary); }
  .mm-recall-correct { border-color: var(--color-success); background: var(--color-success-bg); }
  .mm-recall-wrong { border-color: var(--color-danger); background: var(--color-danger-bg); }
  .mm-recall-answer { font-size: 0.75rem; color: var(--color-success); font-weight: 600; }
  .mm-seq-list { display: flex; flex-direction: column; gap: 16px; }
  .mm-seq-item { padding: 10px; border: 1px solid var(--color-border); border-radius: var(--radius); background: var(--color-surface); }
  .mm-seq-numbers { font-size: 0.95rem; font-weight: 600; color: var(--color-text); margin-bottom: 8px; font-variant-numeric: tabular-nums; }
  .mm-seq-input { width: 80px; padding: 4px 8px; font-size: 0.9rem; border: 1px solid var(--color-border); border-radius: var(--radius); background: var(--color-surface); color: var(--color-text); font-family: inherit; outline: none; text-align: center; font-weight: 700; }
  .mm-seq-input:focus { border-color: var(--color-primary); }
  .mm-seq-correct { border-color: var(--color-success); }
  .mm-seq-wrong { border-color: var(--color-danger); }
  .mm-seq-explanation { font-size: 0.78rem; color: var(--color-text-muted); margin-top: 6px; font-style: italic; }
  .mm-chain-stats { display: flex; gap: 16px; font-size: 0.8rem; color: var(--color-text-muted); font-weight: 500; }
  .mm-chain-step { font-size: 0.78rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.5px; }
  .mm-chain-pair { display: flex; align-items: center; justify-content: center; gap: 14px; padding: 16px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
  .mm-chain-word { font-size: 1.15rem; font-weight: 700; color: var(--color-text); padding: 6px 16px; background: var(--color-surface-hover); border-radius: var(--radius); }
  .mm-chain-arrow { font-size: 1.3rem; color: var(--color-primary); font-weight: 700; }
  .mm-chain-association { font-size: 0.88rem; color: var(--color-text); line-height: 1.7; padding: 12px 14px; background: var(--color-surface); border-radius: var(--radius); border-left: 3px solid var(--color-primary); font-style: italic; }
  .mm-chain-hint { font-size: 0.78rem; color: var(--color-text-muted); text-align: center; font-style: italic; }
  .mm-chain-intro { font-size: 0.85rem; color: var(--color-primary); font-weight: 600; padding: 8px 12px; background: var(--color-surface); border-radius: var(--radius); text-align: center; }
  .mm-chain-recall-hint { font-size: 0.9rem; color: var(--color-text); line-height: 1.5; padding: 10px 12px; background: var(--color-surface); border-radius: var(--radius); }
`
