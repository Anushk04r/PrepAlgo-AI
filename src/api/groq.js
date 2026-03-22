const GROQ_CHAT_URL = 'https://api.groq.com/openai/v1/chat/completions'
/** @see https://console.groq.com/docs/deprecations — replaces llama3-8b-8192 */
const MODEL = 'llama-3.1-8b-instant'

/**
 * @param {string} apiKey
 * @param {{ role: string; content: string }[]} messages - OpenAI-format messages (incl. system)
 */
export async function fetchGroqChatCompletion(apiKey, messages) {
  const res = await fetch(GROQ_CHAT_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(body || `Groq request failed (${res.status})`)
  }

  const data = await res.json()
  const text = data.choices?.[0]?.message?.content
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('Empty response from Groq')
  }
  return text.trim()
}
