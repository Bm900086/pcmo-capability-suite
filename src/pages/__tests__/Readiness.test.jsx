/**
 * Readiness Component Tests
 * Tests for readiness label consistency with score
 * 
 * Note: These are unit tests for the label logic, not full component tests.
 * Full component tests would require React Testing Library setup.
 */

import { describe, test, expect } from 'vitest'

// Mock the readiness calculation logic
const calculateScore = (questionnaireState) => {
  let totalScore = 0
  let maxScore = 0
  let hasBlocker = false

  const isBlocker = (resultText) => {
    const lower = resultText.toLowerCase()
    return lower.includes('cannot deploy') || 
           lower.includes('update to') || 
           lower.includes('upgrade aria operations for networks') || 
           lower.includes('you cannot upgrade')
  }

  const isCaution = (resultText) => {
    return resultText.toLowerCase().includes('-- caution')
  }

  Object.values(questionnaireState).forEach(q => {
    if (isBlocker(q.result)) {
      hasBlocker = true
    } else if (isCaution(q.result)) {
      totalScore += 1
    } else {
      totalScore += 2
    }
    maxScore += 2
  })

  return hasBlocker ? 0 : (maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 100)
}

const getReadinessLabel = (score, answeredCount) => {
  // Minimal, robust change: base final "Ready" label on numeric score to avoid boolean drift.
  const isEffectively100 = Math.round(score) >= 100
  
  if (isEffectively100) {
    return 'Ready'
  } else if (answeredCount >= 6) {
    return 'Warning - Review Required'
  }
  return 'Not Ready'
}

describe('Readiness Label Consistency', () => {
  test('shows Ready when score is effectively 100%', () => {
    const answered = 5
    const total = 5
    const score = 100
    
    const label = getReadinessLabel(score, answered)
    
    expect(label).toBe('Ready')
  })

  test('shows Ready when score rounds to 100% (99.6)', () => {
    const answered = 5
    const total = 5
    const score = 99.6
    
    const label = getReadinessLabel(score, answered)
    
    // Math.round(99.6) = 100, so should be Ready
    expect(label).toBe('Ready')
  })

  test('shows Ready when score is exactly 100.0', () => {
    const answered = 5
    const total = 5
    const score = 100.0
    
    const label = getReadinessLabel(score, answered)
    
    expect(label).toBe('Ready')
  })

  test('shows Not Ready when score is below 100', () => {
    const answered = 4
    const total = 5
    const score = 80
    
    const label = getReadinessLabel(score, answered)
    
    expect(label).toBe('Not Ready')
  })

  test('shows Warning when score is between 60-99 and answered >= 6', () => {
    const answered = 6
    const total = 10
    const score = 75
    
    const label = getReadinessLabel(score, answered)
    
    expect(label).toBe('Warning - Review Required')
  })

  test('handles edge case: score 99.4 rounds down to 99', () => {
    const answered = 5
    const total = 5
    const score = 99.4
    
    const label = getReadinessLabel(score, answered)
    
    // Math.round(99.4) = 99, so should NOT be Ready
    expect(label).not.toBe('Ready')
  })

  test('handles edge case: score 100.4 rounds to 100', () => {
    const answered = 5
    const total = 5
    const score = 100.4
    
    const label = getReadinessLabel(score, answered)
    
    // Math.round(100.4) = 100, so should be Ready
    expect(label).toBe('Ready')
  })

  test('calculates score correctly for all good answers', () => {
    const questionnaireState = {
      'q1': { result: 'You can Deploy VCF 9.0' },
      'q2': { result: 'You can Deploy VCF 9.0' },
      'q3': { result: 'You can Deploy VCF 9.0' },
      'q4': { result: 'You can Deploy VCF 9.0' },
      'q5': { result: 'You can Deploy VCF 9.0' }
    }
    
    const score = calculateScore(questionnaireState)
    
    // 5 questions * 2 points each = 10 total, 10/10 = 100%
    expect(score).toBe(100)
    
    const label = getReadinessLabel(score, 5)
    expect(label).toBe('Ready')
  })

  test('calculates score correctly with blockers', () => {
    const questionnaireState = {
      'q1': { result: 'You cannot Deploy VCF 9.0' },
      'q2': { result: 'You can Deploy VCF 9.0' }
    }
    
    const score = calculateScore(questionnaireState)
    
    // Has blocker, so score should be 0
    expect(score).toBe(0)
    
    const label = getReadinessLabel(score, 2)
    expect(label).toBe('Not Ready')
  })

  test('calculates score correctly with cautions', () => {
    const questionnaireState = {
      'q1': { result: 'You can Deploy VCF 9.0 -- Caution' },
      'q2': { result: 'You can Deploy VCF 9.0' },
      'q3': { result: 'You can Deploy VCF 9.0' },
      'q4': { result: 'You can Deploy VCF 9.0' }
    }
    
    const score = calculateScore(questionnaireState)
    
    // 1 caution (1 point) + 3 good (6 points) = 7/8 = 87.5% -> 88%
    expect(score).toBe(88)
    
    const label = getReadinessLabel(score, 4)
    expect(label).toBe('Not Ready')
  })
})

