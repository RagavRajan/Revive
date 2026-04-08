import { useState } from 'react'
import { useCreativeAerobics } from '../../hooks/useCreativeAerobics'
import { TOTAL_DAYS } from '../../data/creativeAerobics'
import { CreativeAerobicsView } from './CreativeAerobicsView'

type ActiveSkill = null | 'creative-aerobics'

export function SkillsView() {
  const [activeSkill, setActiveSkill] = useState<ActiveSkill>(null)
  const { completedCount } = useCreativeAerobics()

  if (activeSkill === 'creative-aerobics') {
    return <CreativeAerobicsView onBack={() => setActiveSkill(null)} />
  }

  const pct = Math.round((completedCount / TOTAL_DAYS) * 100)

  return (
    <div className="skills-hub">
      <h2 className="skills-title">Skills</h2>

      <div className="skills-grid">
        <button className="skill-card" onClick={() => setActiveSkill('creative-aerobics')}>
          <div className="skill-icon">&#9998;</div>
          <div className="skill-info">
            <div className="skill-name">Creative Aerobics</div>
            <div className="skill-desc">30-day creative thinking program</div>
          </div>
          <div className="skill-progress-ring">
            <svg viewBox="0 0 36 36">
              <path
                className="skill-ring-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="skill-ring-fill"
                strokeDasharray={`${pct}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="skill-ring-text">{completedCount}/{TOTAL_DAYS}</span>
          </div>
        </button>
      </div>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
  .skills-hub {
    padding: 16px;
    max-width: 600px;
    margin: 0 auto;
  }
  .skills-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 20px;
  }
  .skills-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .skill-card {
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
  .skill-card:hover {
    border-color: var(--color-primary);
    background: var(--color-surface-hover);
  }
  .skill-icon {
    font-size: 1.5rem;
    line-height: 1;
    flex-shrink: 0;
  }
  .skill-info {
    flex: 1;
    min-width: 0;
  }
  .skill-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-text);
  }
  .skill-desc {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    margin-top: 2px;
  }
  .skill-progress-ring {
    position: relative;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
  }
  .skill-progress-ring svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  .skill-ring-bg {
    fill: none;
    stroke: var(--color-border);
    stroke-width: 3;
  }
  .skill-ring-fill {
    fill: none;
    stroke: var(--color-primary);
    stroke-width: 3;
    stroke-linecap: round;
  }
  .skill-ring-text {
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
