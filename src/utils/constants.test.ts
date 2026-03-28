import { describe, it, expect } from 'vitest'
import { HOLIDAYS_2026, DEFAULT_DEADLINE_MINUTES } from './constants'

describe('HOLIDAYS_2026', () => {
  it('has 14 entries', () => {
    expect(Object.keys(HOLIDAYS_2026)).toHaveLength(14)
  })

  it('all keys are valid YYYY-MM-DD format', () => {
    for (const key of Object.keys(HOLIDAYS_2026)) {
      expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('all keys are in 2026', () => {
    for (const key of Object.keys(HOLIDAYS_2026)) {
      expect(key.startsWith('2026-')).toBe(true)
    }
  })

  it('all values are non-empty strings', () => {
    for (const value of Object.values(HOLIDAYS_2026)) {
      expect(typeof value).toBe('string')
      expect(value.length).toBeGreaterThan(0)
    }
  })
})

describe('DEFAULT_DEADLINE_MINUTES', () => {
  it('is 540 (9:00 AM)', () => {
    expect(DEFAULT_DEADLINE_MINUTES).toBe(540)
  })
})
