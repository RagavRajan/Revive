import { useState } from 'react'
import type { LCVideo, LCDifficulty } from '../../types/practice'
import { useListeningComprehension } from '../../hooks/useListeningComprehension'
import { LCExercisePanel } from './LCExerciseCards'
import { AddVideoModal } from './AddVideoModal'

interface Props {
  onBack: () => void
}

export function ListeningComprehensionView({ onBack }: Props) {
  const {
    loading, videos, proxyAvailable, proxyUrl,
    complete, redo, isCompleted, getResponse, addVideo,
    completedCount, totalQuestions,
  } = useListeningComprehension()

  const [selectedVideo, setSelectedVideo] = useState<LCVideo | null>(null)
  const [activeTab, setActiveTab] = useState<'watch' | 'exercise'>('exercise')
  const [activeDifficulty, setActiveDifficulty] = useState<LCDifficulty>('easy')
  const [showModal, setShowModal] = useState(false)

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>Loading...</div>
  }

  // --- Detail view ---
  if (selectedVideo) {
    const videoProgress = (difficulty: LCDifficulty) => {
      const items = difficulty === 'easy' ? selectedVideo.exercises.easy
        : difficulty === 'medium' ? selectedVideo.exercises.medium.sentences
        : selectedVideo.exercises.hard
      let done = 0
      items.forEach((_, i) => {
        if (isCompleted(`${selectedVideo.id}:${difficulty}:${i}`)) done++
      })
      return { done, total: items.length }
    }

    return (
      <div className="lc-detail">
        <div className="lc-detail-header">
          <button className="lc-back" onClick={() => setSelectedVideo(null)}>&larr; Back</button>
          <div>
            <div className="lc-detail-title">{selectedVideo.title}</div>
            <div className="lc-detail-meta">{selectedVideo.durationMinutes} min</div>
          </div>
        </div>

        <div className="lc-tabs">
          <button className={`lc-tab ${activeTab === 'watch' ? 'lc-tab-active' : ''}`} onClick={() => setActiveTab('watch')}>Watch</button>
          <button className={`lc-tab ${activeTab === 'exercise' ? 'lc-tab-active' : ''}`} onClick={() => setActiveTab('exercise')}>Exercise</button>
        </div>

        <div className="lc-detail-body">
          {/* Watch tab */}
          <div style={{ display: activeTab === 'watch' ? 'block' : 'none' }}>
            {selectedVideo.url && (
              <a href={selectedVideo.url} target="_blank" rel="noopener noreferrer" className="lc-video-banner">
                <span className="lc-video-banner-icon">&#9654;</span>
                <span>{selectedVideo.url}</span>
              </a>
            )}
            <div className="lc-transcript">
              {selectedVideo.transcript.split('\n\n').map((block, i) => {
                const headingMatch = block.match(/^##\s+(.+)$/)
                if (headingMatch) {
                  return <h3 key={i} className="lc-section-heading">{headingMatch[1]}</h3>
                }
                return <p key={i} className="lc-reading-p">{block}</p>
              })}
            </div>
          </div>

          {/* Exercise tab */}
          <div style={{ display: activeTab === 'exercise' ? 'block' : 'none' }}>
            <div className="lc-difficulty-tabs">
              {(['easy', 'medium', 'hard'] as LCDifficulty[]).map(d => {
                const { done, total } = videoProgress(d)
                return (
                  <button
                    key={d}
                    className={`lc-diff-tab ${activeDifficulty === d ? 'lc-diff-active' : ''}`}
                    onClick={() => setActiveDifficulty(d)}
                  >
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                    <span className="lc-diff-count">{done}/{total}</span>
                  </button>
                )
              })}
            </div>

            <LCExercisePanel
              videoId={selectedVideo.id}
              difficulty={activeDifficulty}
              exercises={selectedVideo.exercises}
              isCompleted={isCompleted}
              getResponse={getResponse}
              onComplete={complete}
              onRedo={(keys) => keys.forEach(k => redo(k))}
            />
          </div>
        </div>

        <style>{detailStyles}</style>
      </div>
    )
  }

  // --- List view ---
  return (
    <div className="lc-list">
      <div className="lc-list-header">
        <button className="lc-back" onClick={onBack}>&larr; Practice</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="lc-list-progress">{completedCount}/{totalQuestions} completed</div>
          {proxyAvailable && (
            <button className="lc-add-btn" onClick={() => setShowModal(true)}>+</button>
          )}
        </div>
      </div>

      <h2 className="lc-list-title">Listening Comprehension</h2>

      {videos.length === 0 ? (
        <div className="lc-empty">
          <p>No videos yet.</p>
          {proxyAvailable
            ? <p>Tap + to add a YouTube or Vimeo video.</p>
            : <p>Start the proxy server to add videos.</p>
          }
        </div>
      ) : (
        <div className="lc-videos">
          {videos.map(video => {
            const total = video.exercises.easy.length + video.exercises.medium.sentences.length + video.exercises.hard.length
            let done = 0
            video.exercises.easy.forEach((_, i) => { if (isCompleted(`${video.id}:easy:${i}`)) done++ })
            video.exercises.medium.sentences.forEach((_, i) => { if (isCompleted(`${video.id}:medium:${i}`)) done++ })
            video.exercises.hard.forEach((_, i) => { if (isCompleted(`${video.id}:hard:${i}`)) done++ })

            return (
              <button key={video.id} className="lc-video-card" onClick={() => { setSelectedVideo(video); setActiveTab('exercise') }}>
                <div className="lc-video-info">
                  <div className="lc-video-title">{video.title}</div>
                  <div className="lc-video-meta">{video.durationMinutes} min</div>
                </div>
                <div className="lc-video-progress">
                  <span className={`lc-video-count ${done === total ? 'lc-video-done' : ''}`}>
                    {done}/{total}
                  </span>
                  {done === total && <span className="lc-video-check">&check;</span>}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {showModal && (
        <AddVideoModal
          proxyUrl={proxyUrl}
          onAdd={(video) => { addVideo(video); setShowModal(false) }}
          onClose={() => setShowModal(false)}
        />
      )}

      <style>{listStyles}</style>
    </div>
  )
}

const listStyles = `
  .lc-list {
    padding: 16px;
    max-width: 600px;
    margin: 0 auto;
  }
  .lc-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .lc-list-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 20px;
  }
  .lc-list-progress {
    font-size: 0.85rem;
    color: var(--color-primary);
    font-weight: 600;
  }
  .lc-back {
    font-size: 0.9rem;
    color: var(--color-primary);
    white-space: nowrap;
  }
  .lc-add-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--color-primary);
    color: white;
    font-size: 1.2rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: opacity var(--transition);
  }
  .lc-add-btn:hover { opacity: 0.85; }
  .lc-empty {
    text-align: center;
    color: var(--color-text-muted);
    padding: 40px 16px;
    font-size: 0.9rem;
    line-height: 1.6;
  }
  .lc-videos {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .lc-video-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: border-color var(--transition);
    text-align: left;
    width: 100%;
  }
  .lc-video-card:hover {
    border-color: var(--color-primary);
  }
  .lc-video-info {
    flex: 1;
    min-width: 0;
  }
  .lc-video-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--color-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .lc-video-meta {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin-top: 2px;
  }
  .lc-video-progress {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    margin-left: 12px;
  }
  .lc-video-count {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-text-muted);
  }
  .lc-video-done {
    color: var(--color-success);
  }
  .lc-video-check {
    color: var(--color-success);
    font-size: 1rem;
  }

  /* Modal styles */
  .lc-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 16px;
  }
  .lc-modal {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    width: 100%;
    max-width: 480px;
    max-height: 80vh;
    overflow-y: auto;
  }
  .lc-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid var(--color-border);
  }
  .lc-modal-header h3 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text);
  }
  .lc-modal-close {
    font-size: 1.4rem;
    color: var(--color-text-muted);
    cursor: pointer;
    line-height: 1;
  }
  .lc-modal-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .lc-modal-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-text-muted);
  }
  .lc-modal-input {
    width: 100%;
    padding: 10px 12px;
    font-size: 0.9rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--color-text);
    font-family: inherit;
    outline: none;
  }
  .lc-modal-input:focus {
    border-color: var(--color-primary);
  }
  .lc-modal-textarea {
    width: 100%;
    padding: 10px 12px;
    font-size: 0.85rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--color-text);
    font-family: inherit;
    outline: none;
    resize: vertical;
  }
  .lc-modal-textarea:focus {
    border-color: var(--color-primary);
  }
  .lc-modal-btn {
    align-self: stretch;
  }
  .lc-modal-warn {
    font-size: 0.82rem;
    color: var(--color-warning, #ff9800);
    padding: 8px 10px;
    background: rgba(255, 152, 0, 0.1);
    border-radius: var(--radius);
  }
  .lc-modal-error {
    font-size: 0.82rem;
    color: var(--color-danger);
    padding: 8px 10px;
    background: var(--color-danger-bg);
    border-radius: var(--radius);
  }
  .lc-modal-loading {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 0;
    color: var(--color-text-muted);
    font-size: 0.9rem;
  }
  .lc-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-border);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: lc-spin 0.8s linear infinite;
  }
  @keyframes lc-spin {
    to { transform: rotate(360deg); }
  }
`

const detailStyles = `
  .lc-detail {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .lc-detail-header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }
  .lc-detail-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text);
  }
  .lc-detail-meta {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }
  .lc-tabs {
    display: flex;
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;
  }
  .lc-tab {
    flex: 1;
    padding: 10px;
    text-align: center;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text-muted);
    border-bottom: 2px solid transparent;
    transition: all var(--transition);
  }
  .lc-tab:hover { color: var(--color-text); }
  .lc-tab-active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
  }
  .lc-detail-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
  }
  .lc-video-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    margin-bottom: 16px;
    text-decoration: none;
    color: var(--color-primary);
    font-size: 0.82rem;
    font-weight: 500;
    word-break: break-all;
    transition: border-color var(--transition);
  }
  .lc-video-banner:hover {
    border-color: var(--color-primary);
  }
  .lc-video-banner-icon {
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  .lc-reading-p {
    font-size: 0.9rem;
    color: var(--color-text);
    line-height: 1.7;
    margin-bottom: 14px;
    opacity: 0.9;
  }
  .lc-transcript {
    max-height: none;
  }
  .lc-section-heading {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--color-text);
    margin-top: 20px;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--color-border);
  }
  .lc-section-heading:first-child {
    margin-top: 0;
  }

  /* Difficulty sub-tabs */
  .lc-difficulty-tabs {
    display: flex;
    gap: 6px;
    margin-bottom: 16px;
  }
  .lc-diff-tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-text-muted);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all var(--transition);
  }
  .lc-diff-tab:hover {
    border-color: var(--color-primary);
    color: var(--color-text);
  }
  .lc-diff-active {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: rgba(108, 99, 255, 0.08);
  }
  .lc-diff-count {
    font-size: 0.7rem;
    font-weight: 500;
    opacity: 0.7;
  }

  /* Exercise card styles (lc- prefix) */
  .lc-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .lc-error {
    font-size: 0.8rem;
    color: var(--color-danger);
    padding: 6px 10px;
    background: var(--color-danger-bg);
    border-radius: var(--radius);
  }
  .lc-completed-inline {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-success);
    padding: 2px 8px;
    background: var(--color-success-bg);
    border-radius: var(--radius);
    display: inline-block;
  }
  .lc-check-btn {
    font-size: 0.78rem;
    padding: 4px 12px;
    align-self: flex-start;
    margin-top: 4px;
  }

  /* Multiple choice */
  .lc-mc-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .lc-mc-question {
    padding: 10px;
    border-radius: var(--radius);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
  }
  .lc-mc-correct { border-color: var(--color-success); }
  .lc-mc-wrong { border-color: var(--color-danger); }
  .lc-mc-q {
    font-size: 0.85rem;
    color: var(--color-text);
    margin-bottom: 8px;
    line-height: 1.5;
  }
  .lc-mc-options {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .lc-mc-option {
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
  .lc-mc-option:hover { background: var(--color-surface-hover); }
  .lc-mc-option input { margin-top: 2px; flex-shrink: 0; }
  .lc-mc-chosen {
    background: var(--color-surface-hover);
    color: var(--color-text);
    font-weight: 500;
  }
  .lc-mc-answer {
    background: var(--color-success-bg);
    color: var(--color-success);
    font-weight: 600;
  }

  /* Vocab fill */
  .lc-wordbank {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 10px 12px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    align-items: center;
  }
  .lc-wordbank-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-text-muted);
    margin-right: 4px;
  }
  .lc-wordbank-word {
    font-size: 0.8rem;
    padding: 2px 8px;
    background: var(--color-surface-hover);
    border-radius: var(--radius);
    color: var(--color-primary);
    font-weight: 500;
  }
  .lc-fill-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .lc-fill-item {
    display: flex;
    align-items: baseline;
    gap: 6px;
    font-size: 0.85rem;
    color: var(--color-text);
    line-height: 1.6;
    padding: 6px 0;
    flex-wrap: wrap;
  }
  .lc-fill-num {
    font-weight: 600;
    color: var(--color-text-muted);
    flex-shrink: 0;
  }
  .lc-fill-text { flex: 1; }
  .lc-fill-input {
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
  .lc-fill-input:focus { border-color: var(--color-primary); }
  .lc-fill-correct .lc-fill-input {
    border-color: var(--color-success);
    background: var(--color-success-bg);
  }
  .lc-fill-wrong .lc-fill-input {
    border-color: var(--color-danger);
    background: var(--color-danger-bg);
  }
  .lc-fill-answer {
    font-size: 0.75rem;
    color: var(--color-success);
    font-weight: 600;
  }

  /* Match pairs */
  .lc-match-progress {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-primary);
    text-align: center;
  }
  .lc-match-grid {
    display: flex;
    gap: 12px;
  }
  .lc-match-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .lc-match-item {
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
  .lc-match-item:hover:not(:disabled) {
    border-color: var(--color-primary);
  }
  .lc-match-selected {
    border-color: var(--color-primary);
    background: var(--color-primary);
    color: white;
  }
  .lc-match-target:not(:disabled) {
    border-color: var(--color-primary);
    border-style: dashed;
  }
  .lc-match-done {
    opacity: 0.5;
    background: var(--color-success-bg);
    border-color: var(--color-success);
    color: var(--color-success);
  }
`
