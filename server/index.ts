import dotenv from 'dotenv'
dotenv.config({ override: false })
import express from 'express'
import cors from 'cors'
import { YoutubeTranscript } from 'youtube-transcript'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const anthropic = new Anthropic()

// --- Helpers ---

function extractVideoId(url: string): { platform: 'youtube' | 'vimeo'; id: string } | null {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) return { platform: 'youtube', id: ytMatch[1] }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return { platform: 'vimeo', id: vimeoMatch[1] }

  return null
}


function estimateDuration(transcript: string): number {
  const words = transcript.split(/\s+/).length
  return Math.round(words / 150) // ~150 words per minute spoken
}

function getQuestionCounts(durationMinutes: number): { easy: number; medium: number; hard: number } {
  if (durationMinutes < 10) return { easy: 2, medium: 2, hard: 2 }
  if (durationMinutes <= 30) return { easy: 4, medium: 4, hard: 4 }
  return { easy: 6, medium: 6, hard: 6 }
}

function buildPrompt(transcript: string, title: string, counts: { easy: number; medium: number; hard: number }): string {
  return `## Transcript
${transcript}

## Video Title
${title}

## Instructions
Generate exactly ${counts.easy} Easy, ${counts.medium} Medium, and ${counts.hard} Hard questions based on this transcript.

### Easy (Multiple Choice)
Each question tests factual recall from the transcript.
Format per question: { "question": "...", "options": ["A", "B", "C", "D"], "correctIndex": 0-3 }
- Questions should test specific facts, names, numbers, or events mentioned
- All 4 options should be plausible; only one correct
- Distribute correct answers across indices (don't always use 0)

### Medium (Fill-in-the-Blank)
Tests understanding of key vocabulary or concepts in context.
Format: { "sentences": [{ "text": "sentence with ___ blank", "answer": "correct word" }], "wordBank": ["word1", "word2", ...] }
- The blank (___) replaces a key term from the transcript
- Word bank includes ALL correct answers plus ${Math.max(2, Math.floor(counts.medium * 0.5))} distractors
- Each sentence should be self-contained

### Hard (Match Pairs)
Tests ability to connect concepts, arguments, or cause-effect relationships.
Format: { "pairs": [{ "left": "concept/cause", "right": "definition/effect" }] }
- Left side: concept, term, speaker claim, or cause
- Right side: matching definition, evidence, effect, or counterpoint
- Pairs should require genuine comprehension, not just keyword matching

### Article
Rewrite the transcript as a well-structured, readable article. Use markdown-style headings (## for sections) to break it into logical topics. Clean up filler words, false starts, and spoken artifacts. Preserve all key information and terminology. Keep it concise but complete.

## Output
Return ONLY a JSON object with this exact schema, no markdown fences:
{
  "title": "descriptive title for the video",
  "article": "## Section Heading\\n\\nParagraph text...\\n\\n## Next Section\\n\\nMore text...",
  "easy": [{ "question": "...", "options": ["...", "...", "...", "..."], "correctIndex": 0 }],
  "medium": { "sentences": [{ "text": "...", "answer": "..." }], "wordBank": ["..."] },
  "hard": [{ "left": "...", "right": "..." }]
}`
}

async function generateQuestions(transcript: string, title: string, durationMinutes: number) {
  const counts = getQuestionCounts(durationMinutes)

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 4096,
    system: 'You are a listening comprehension test designer. Given a video transcript, generate comprehension questions at three difficulty levels. Return ONLY valid JSON, no markdown code fences, no extra text.',
    messages: [{ role: 'user', content: buildPrompt(transcript, title, counts) }],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  // Strip markdown fences if present
  const cleaned = text.replace(/^```(?:json)?\n?/gm, '').replace(/\n?```$/gm, '').trim()
  const parsed = JSON.parse(cleaned)

  return {
    title: parsed.title || title,
    article: parsed.article || '',
    exercises: {
      easy: parsed.easy,
      medium: {
        sentences: parsed.medium.sentences,
        wordBank: parsed.medium.wordBank,
      },
      hard: parsed.hard,
    },
  }
}

// --- Routes ---

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/generate', async (req, res) => {
  try {
    const { url } = req.body
    if (!url) {
      res.status(400).json({ error: 'URL is required' })
      return
    }

    const videoInfo = extractVideoId(url)
    if (!videoInfo) {
      res.status(400).json({ error: 'Unsupported URL. Provide a YouTube or Vimeo link.' })
      return
    }

    // Extract transcript
    let transcript: string
    let title = ''
    try {
      const items = await YoutubeTranscript.fetchTranscript(videoInfo.id)
      transcript = items.map(i => i.text).join(' ')
      title = `Video ${videoInfo.id}`
    } catch {
      res.status(422).json({
        error: 'Could not extract transcript. Captions may not be available.',
        needsManualTranscript: true,
      })
      return
    }

    const durationMinutes = estimateDuration(transcript)
    const result = await generateQuestions(transcript, title, durationMinutes)

    res.json({
      video: {
        url,
        title: result.title,
        durationMinutes,
        transcript: result.article || transcript,
        exercises: result.exercises,
        createdAt: Date.now(),
      },
    })
  } catch (err) {
    console.error('Generate error:', err)
    res.status(500).json({ error: 'Failed to generate questions' })
  }
})

app.post('/generate-from-transcript', async (req, res) => {
  try {
    const { url, transcript, title } = req.body
    if (!transcript) {
      res.status(400).json({ error: 'Transcript is required' })
      return
    }

    const durationMinutes = estimateDuration(transcript)
    const result = await generateQuestions(transcript, title || 'Untitled', durationMinutes)

    res.json({
      video: {
        url: url || '',
        title: result.title,
        durationMinutes,
        transcript: result.article || transcript,
        exercises: result.exercises,
        createdAt: Date.now(),
      },
    })
  } catch (err) {
    console.error('Generate from transcript error:', err)
    res.status(500).json({ error: 'Failed to generate questions' })
  }
})

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`)
})
