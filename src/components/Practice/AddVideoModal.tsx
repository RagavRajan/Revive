import { useState } from 'react'
import type { LCVideo } from '../../types/practice'

type Status = 'idle' | 'extracting' | 'generating' | 'manual' | 'import' | 'error'

interface Props {
  proxyUrl: string
  onAdd: (video: LCVideo) => void
  onClose: () => void
}

export function AddVideoModal({ proxyUrl, onAdd, onClose }: Props) {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  // Manual fallback
  const [manualTranscript, setManualTranscript] = useState('')
  const [manualTitle, setManualTitle] = useState('')
  // Import JSON
  const [importJson, setImportJson] = useState('')

  const generate = async () => {
    if (!url.trim()) return
    setStatus('extracting')
    setError('')

    try {
      const res = await fetch(`${proxyUrl}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await res.json()

      if (data.needsManualTranscript) {
        setStatus('manual')
        setError(data.error || 'Could not extract transcript.')
        return
      }

      if (!res.ok) {
        setStatus('error')
        setError(data.error || 'Failed to generate questions')
        return
      }

      const video: LCVideo = { ...data.video, id: crypto.randomUUID() }
      onAdd(video)
    } catch {
      setStatus('error')
      setError('Could not connect to proxy server')
    }
  }

  const generateFromTranscript = async () => {
    if (!manualTranscript.trim()) return
    setStatus('generating')
    setError('')

    try {
      const res = await fetch(`${proxyUrl}/generate-from-transcript`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim(),
          transcript: manualTranscript.trim(),
          title: manualTitle.trim(),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setError(data.error || 'Failed to generate questions')
        return
      }

      const video: LCVideo = { ...data.video, id: crypto.randomUUID() }
      onAdd(video)
    } catch {
      setStatus('error')
      setError('Could not connect to proxy server')
    }
  }

  const importVideo = () => {
    try {
      const parsed = JSON.parse(importJson)
      const video: LCVideo = { ...parsed, id: crypto.randomUUID() }
      if (!video.exercises || !video.transcript) {
        setError('Invalid video JSON — must have exercises and transcript fields')
        return
      }
      onAdd(video)
    } catch {
      setError('Invalid JSON')
    }
  }

  const isLoading = status === 'extracting' || status === 'generating'

  return (
    <div className="lc-modal-overlay" onClick={onClose}>
      <div className="lc-modal" onClick={e => e.stopPropagation()}>
        <div className="lc-modal-header">
          <h3>Add Video</h3>
          <button className="lc-modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="lc-modal-body">
          {status !== 'import' && (
            <>
              <label className="lc-modal-label">Video URL</label>
              <input
                className="lc-modal-input"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                disabled={isLoading}
              />
            </>
          )}

          {status === 'manual' && (
            <>
              <div className="lc-modal-warn">{error}</div>
              <label className="lc-modal-label">Title</label>
              <input
                className="lc-modal-input"
                value={manualTitle}
                onChange={e => setManualTitle(e.target.value)}
                placeholder="Video title"
              />
              <label className="lc-modal-label">Paste transcript</label>
              <textarea
                className="lc-modal-textarea"
                value={manualTranscript}
                onChange={e => setManualTranscript(e.target.value)}
                placeholder="Paste the video transcript here..."
                rows={8}
              />
              <button
                className="btn btn-primary lc-modal-btn"
                onClick={generateFromTranscript}
                disabled={!manualTranscript.trim()}
              >
                Generate Questions
              </button>
            </>
          )}

          {status === 'import' && (
            <>
              <label className="lc-modal-label">Paste video JSON</label>
              <textarea
                className="lc-modal-textarea"
                value={importJson}
                onChange={e => { setImportJson(e.target.value); setError('') }}
                placeholder='Paste the full video JSON object here...'
                rows={10}
              />
              {error && <div className="lc-modal-error">{error}</div>}
              <button
                className="btn btn-primary lc-modal-btn"
                onClick={importVideo}
                disabled={!importJson.trim()}
              >
                Import
              </button>
              <button className="btn btn-outline lc-modal-btn" onClick={() => { setStatus('idle'); setError('') }}>
                Back
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="lc-modal-error">{error}</div>
              <button
                className="btn btn-primary lc-modal-btn"
                onClick={generate}
                disabled={!url.trim()}
              >
                Retry
              </button>
              <button
                className="btn btn-outline lc-modal-btn"
                onClick={() => setStatus('manual')}
              >
                Enter transcript manually
              </button>
            </>
          )}

          {isLoading && (
            <div className="lc-modal-loading">
              <div className="lc-spinner" />
              <span>{status === 'extracting' ? 'Extracting transcript...' : 'Generating questions...'}</span>
            </div>
          )}

          {status === 'idle' && (
            <>
              <button
                className="btn btn-primary lc-modal-btn"
                onClick={generate}
                disabled={!url.trim()}
              >
                Generate
              </button>
              <button
                className="btn btn-outline lc-modal-btn"
                onClick={() => setStatus('import')}
              >
                Import JSON
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
