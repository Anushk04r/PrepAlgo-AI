const MODE_LABELS = {
  beginner: 'Beginner',
  interview: 'Interview',
  practice: 'Practice',
}

const SHARED = `You are a strict DSA interview assistant.

Rules:
- ONLY answer questions related to Data Structures and Algorithms.
- If user asks anything else, reply: 'I can only help with DSA and interview-related questions.'

Always include (when giving technical guidance, not when you are only asking a single interview question):
- Approach
- Time and space complexity
- Edge cases`

const MODE_HINTS = {
  beginner: 'Mode — Beginner: Explain in simple terms with examples.',
  interview: 'Mode — Interview: Give concise and optimal answers.',
  practice: 'Mode — Practice: Give hints only; do not provide a full solution immediately unless the MOCK INTERVIEW instructions say otherwise.',
}

/**
 * @param {string} mode
 * @param {string} topic
 * @param {{ phase: 'idle' | 'awaiting_answer'; currentQuestion: string | null } | null} practiceInterview — only used when mode is "practice"
 */
export function buildSystemPrompt(mode, topic, practiceInterview) {
  const modeLabel = MODE_LABELS[mode] ?? mode
  const modeHint = MODE_HINTS[mode] ?? ''

  let body = `${SHARED}

${modeHint}`

  if (mode === 'practice' && practiceInterview) {
    if (practiceInterview.phase === 'idle') {
      body += `

MOCK INTERVIEW — STEP 1 (ask a question):
- You are conducting a mock DSA interview for topic: ${topic}.
- Do NOT answer the user's message with a full solution or long tutorial.
- Respond by asking ONE clear, bounded DSA interview question they can answer in text (difficulty appropriate to the topic).
- You may add one short acknowledging sentence, then the question. Do not reveal the solution or optimal answer.`
    } else {
      const q = practiceInterview.currentQuestion
      body += q
        ? `

MOCK INTERVIEW — STEP 2 (evaluate their answer):
- You previously asked this interview question (verbatim context for you):
---
${q}
---
- The user's latest message is their attempt at an answer.
- Evaluate it: reasoning, correctness, time/space complexity, edge cases, and what they did well or should improve.
- Give constructive feedback. Do NOT ask a new interview question in this reply.`
        : `

MOCK INTERVIEW — STEP 2 (evaluate their answer):
- Use the conversation above: your last assistant message was the interview question; the user's latest message is their answer.
- Evaluate it: reasoning, correctness, time/space complexity, edge cases, and constructive feedback.
- Do NOT ask a new interview question in this reply.`
    }
  }

  return `Topic focus: ${topic}. Current mode: ${modeLabel}.

${body}`
}
