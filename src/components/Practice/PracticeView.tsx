import { useState } from 'react'
import { useListeningComprehension } from '../../hooks/useListeningComprehension'
import { ListeningComprehensionView } from './ListeningComprehensionView'

type ActiveCategory = null | 'listening-comprehension'

function ProgressRing({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  return (
    <div className="practice-progress-ring">
      <svg viewBox="0 0 36 36">
        <path
          className="practice-ring-bg"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="practice-ring-fill"
          strokeDasharray={`${pct}, 100`}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <span className="practice-ring-text">{completed}/{total}</span>
    </div>
  )
}

export function PracticeView() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>(null)
  const { completedCount: lcCompleted, totalQuestions: lcTotal } = useListeningComprehension()

  if (activeCategory === 'listening-comprehension') {
    return <ListeningComprehensionView onBack={() => setActiveCategory(null)} />
  }

  return (
    <div className="practice-hub">
      <h2 className="practice-title">Practice</h2>

      <div className="practice-grid">
        <button className="practice-card" onClick={() => setActiveCategory('listening-comprehension')}>
          <div className="practice-icon">&#127911;</div>
          <div className="practice-info">
            <div className="practice-name">Listening Comprehension</div>
            <div className="practice-desc">Comprehension exercises from video content</div>
          </div>
          <ProgressRing completed={lcCompleted} total={lcTotal} />
        </button>
      </div>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
  .practice-hub {
    padding: 16px;
    max-width: 600px;
    margin: 0 auto;
  }
  .practice-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 20px;
  }
  .practice-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .practice-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition);
    text-align: left;
    width: 100%;
  }
  .practice-card:hover {
    border-color: var(--color-primary);
    background: var(--color-surface-hover);
  }
  .practice-icon {
    font-size: 1.5rem;
    line-height: 1;
    flex-shrink: 0;
  }
  .practice-info {
    flex: 1;
    min-width: 0;
  }
  .practice-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-text);
  }
  .practice-desc {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    margin-top: 2px;
  }
  .practice-progress-ring {
    position: relative;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
  }
  .practice-progress-ring svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  .practice-ring-bg {
    fill: none;
    stroke: var(--color-border);
    stroke-width: 3;
  }
  .practice-ring-fill {
    fill: none;
    stroke: var(--color-primary);
    stroke-width: 3;
    stroke-linecap: round;
  }
  .practice-ring-text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    font-weight: 700;
    color: var(--color-text-muted);
  }
`
