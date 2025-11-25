#!/usr/bin/env node

/**
 * Repository Scanner for Readiness Label/Score Mismatches
 * 
 * Scans the codebase for potential inconsistencies between numeric readiness scores
 * and adjacent status labels (e.g., "Not Ready" shown while score is 100%).
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx']
const PATTERNS = {
  notReady: /["']Not Ready["']|NotReady/g,
  ready: /["']Ready["']/g,
  score: /\breadinessScore\b|\bscore\b|\bpercent\b|\bpercentComplete\b|\bcompletion\b/g,
  questionsAnswered: /\bquestions answered\b|\bquestionsAnswered\b/g,
  percent100: /100\s*%|\(100%|100%\)/g
}

const issues = []

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n')
  
  let hasNotReady = false
  let hasScore = false
  let hasQuestionsAnswered = false
  let hasPercent100 = false
  let hasReady = false
  
  // Check for patterns
  if (PATTERNS.notReady.test(content)) hasNotReady = true
  if (PATTERNS.score.test(content)) hasScore = true
  if (PATTERNS.questionsAnswered.test(content)) hasQuestionsAnswered = true
  if (PATTERNS.percent100.test(content)) hasPercent100 = true
  if (PATTERNS.ready.test(content)) hasReady = true
  
  // Flag potential issues
  if ((hasNotReady || hasReady) && (hasScore || hasQuestionsAnswered || hasPercent100)) {
    // Find line numbers with these patterns
    const flaggedLines = []
    lines.forEach((line, index) => {
      const lineNum = index + 1
      const hasPattern = 
        PATTERNS.notReady.test(line) || 
        PATTERNS.ready.test(line) ||
        PATTERNS.score.test(line) ||
        PATTERNS.questionsAnswered.test(line) ||
        PATTERNS.percent100.test(line)
      
      if (hasPattern) {
        flaggedLines.push({
          line: lineNum,
          content: line.trim().substring(0, 100)
        })
      }
    })
    
    // Check for potential mismatch: "Not Ready" near 100% but only if label logic doesn't check for 100
    if (hasNotReady && hasPercent100) {
      // Check if the code properly handles 100% case
      const has100Check = /score\s*>=\s*100|readinessScore\s*>=\s*100|Math\.round.*>=.*100|isEffectively100/.test(content)
      const hasProperLogic = /score\s*>=\s*90|readinessScore\s*>=\s*90/.test(content) // 90+ is reasonable threshold
      
      if (!has100Check && !hasProperLogic) {
        issues.push({
          file: filePath,
          severity: 'high',
          type: 'potential_mismatch',
          message: 'Found "Not Ready" label near 100% score indicator without proper 100% check',
          lines: flaggedLines.slice(0, 10) // First 10 flagged lines
        })
      }
    }
    
    // Check for label logic that might not use score
    if (hasNotReady && hasScore && !content.includes('Math.round') && !content.includes('isEffectively100')) {
      // Check if label is based on something other than score
      const labelBasedOnCount = /answeredCount|answered.*>=|count.*>=/.test(content)
      const scoreBased = /score.*>=|readinessScore.*>=/.test(content)
      
      if (labelBasedOnCount && !scoreBased) {
        issues.push({
          file: filePath,
          severity: 'medium',
          type: 'label_not_score_based',
          message: 'Label appears to be based on count rather than score',
          lines: flaggedLines.slice(0, 10)
        })
      }
    }
  }
}

function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    
    // Skip node_modules, dist, build, etc.
    if (entry.name.startsWith('.') || 
        entry.name === 'node_modules' || 
        entry.name === 'dist' || 
        entry.name === 'build' ||
        entry.name === 'backups') {
      continue
    }
    
    if (entry.isDirectory()) {
      scanDirectory(fullPath)
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name)
      if (EXTENSIONS.includes(ext)) {
        scanFile(fullPath)
      }
    }
  }
}

// Main execution
console.log('🔍 Scanning repository for readiness label/score mismatches...\n')

const projectRoot = path.join(__dirname, '..')
scanDirectory(path.join(projectRoot, 'src'))

// Report results
if (issues.length === 0) {
  console.log('✅ No potential mismatches found!')
  process.exit(0)
} else {
  console.log(`⚠️  Found ${issues.length} potential issue(s):\n`)
  
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.severity.toUpperCase()}: ${issue.type}`)
    console.log(`   File: ${issue.file}`)
    console.log(`   Message: ${issue.message}`)
    if (issue.lines && issue.lines.length > 0) {
      console.log(`   Flagged lines:`)
      issue.lines.forEach(l => {
        console.log(`     Line ${l.line}: ${l.content}`)
      })
    }
    console.log()
  })
  
  // Exit with error code if high severity issues found
  const highSeverity = issues.filter(i => i.severity === 'high')
  if (highSeverity.length > 0) {
    console.log(`❌ Found ${highSeverity.length} high-severity issue(s). Please review.`)
    process.exit(1)
  } else {
    console.log('⚠️  Medium-severity issues found. Review recommended.')
    process.exit(0)
  }
}

