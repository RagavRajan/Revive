import { useState } from 'react'
import { useCreativeAerobics } from '../../hooks/useCreativeAerobics'
import { useSpeedReading } from '../../hooks/useSpeedReading'
import { useMaximizeMemory } from '../../hooks/useMaximizeMemory'
import { TOTAL_DAYS as CA_TOTAL } from '../../data/creativeAerobics'
import { TOTAL_DAYS as SR_TOTAL } from '../../data/speedReading'
import { TOTAL_DAYS as MM_TOTAL } from '../../data/maximizeMemory'
import { CreativeAerobicsView } from './CreativeAerobicsView'
import { SpeedReadingView } from './SpeedReadingView'
import { MaximizeMemoryView } from './MaximizeMemoryView'

type ActiveSkill = null | 'creative-aerobics' | 'speed-reading' | 'maximize-memory'

function ProgressRing({ completed, total }: { completed: number; total: number }) {
  const pct = Math.round((completed / total) * 100)
  return (
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
      <span className="skill-ring-text">{completed}/{total}</span>
    </div>
  )
}

export function SkillsView() {
  const [activeSkill, setActiveSkill] = useState<ActiveSkill>(null)
  const { completedCount: caCompleted } = useCreativeAerobics()
  const { completedCount: srCompleted } = useSpeedReading()
  const { completedCount: mmCompleted } = useMaximizeMemory()

  if (activeSkill === 'creative-aerobics') {
    return <CreativeAerobicsView onBack={() => setActiveSkill(null)} />
  }
  if (activeSkill === 'speed-reading') {
    return <SpeedReadingView onBack={() => setActiveSkill(null)} />
  }
  if (activeSkill === 'maximize-memory') {
    return <MaximizeMemoryView onBack={() => setActiveSkill(null)} />
  }

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
          <ProgressRing completed={caCompleted} total={CA_TOTAL} />
        </button>

        <button className="skill-card" onClick={() => setActiveSkill('speed-reading')}>
          <div className="skill-icon">&#128218;</div>
          <div className="skill-info">
            <div className="skill-name">Speed Reading</div>
            <div className="skill-desc">30-day reading mastery program</div>
          </div>
          <ProgressRing completed={srCompleted} total={SR_TOTAL} />
        </button>

        <button className="skill-card" onClick={() => setActiveSkill('maximize-memory')}>
          <div className="skill-icon">&#129504;</div>
          <div className="skill-info">
            <div className="skill-name">Maximize Your Memory</div>
            <div className="skill-desc">45-day memory mastery program</div>
          </div>
          <ProgressRing completed={mmCompleted} total={MM_TOTAL} />
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
