export const CHATS_STORAGE_KEY = 'dsa-mentor-chats-v1'

function isValidChat(c) {
  return (
    c &&
    typeof c.id === 'string' &&
    Array.isArray(c.messages) &&
    c.messages.every((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
  )
}

export function normalizeChat(c) {
  return {
    id: c.id,
    title: typeof c.title === 'string' ? c.title : 'New chat',
    messages: Array.isArray(c.messages) ? c.messages : [],
    updatedAt: typeof c.updatedAt === 'number' ? c.updatedAt : Date.now(),
  }
}

export function loadStoredChats() {
  try {
    const raw = localStorage.getItem(CHATS_STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!Array.isArray(data)) return null
    const valid = data.filter(isValidChat).map(normalizeChat)
    return valid.length > 0 ? valid : null
  } catch {
    return null
  }
}

export function saveChatsToStorage(chats) {
  try {
    localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(chats))
  } catch {
    /* ignore quota / private mode */
  }
}
