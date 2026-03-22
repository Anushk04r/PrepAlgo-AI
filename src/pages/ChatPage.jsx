import { useEffect, useState } from 'react'
import { fetchGroqChatCompletion } from '../api/groq'
import AppLayout from '../layout/AppLayout'
import ChatInput from '../components/ChatInput'
import ChatMessages from '../components/ChatMessages'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import SuggestedPrompts from '../components/SuggestedPrompts'
import { TYPING_PLACEHOLDER } from '../constants/chat'
import { loadStoredChats, saveChatsToStorage } from '../lib/chatStorage'
import { buildSystemPrompt } from '../lib/systemPrompt'

const TYPING = TYPING_PLACEHOLDER
const API_ERROR_MESSAGE = 'Something went wrong. Please try again.'

const INITIAL_MESSAGES = []

const INTERVIEW_INITIAL = { phase: 'idle', currentQuestion: null }

function createChatId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

function createNewChat() {
  return {
    id: createChatId(),
    title: 'New chat',
    messages: [...INITIAL_MESSAGES],
    updatedAt: Date.now(),
  }
}

function titleFromMessages(messages) {
  const u = messages.find((m) => m.role === 'user')
  if (!u) return 'New chat'
  const t = u.content.trim()
  if (!t) return 'New chat'
  return t.length > 52 ? `${t.slice(0, 51)}…` : t
}

function sortByRecent(chats) {
  return [...chats].sort((a, b) => b.updatedAt - a.updatedAt)
}

function initSession() {
  const loaded = loadStoredChats()
  if (loaded && loaded.length > 0) {
    const activeId = sortByRecent(loaded)[0].id
    return { chats: loaded, activeChatId: activeId }
  }
  const first = createNewChat()
  return { chats: [first], activeChatId: first.id }
}

function messagesForApi(history) {
  return history
    .filter((m) => !(m.role === 'assistant' && m.content === TYPING))
    .map((m) => ({ role: m.role, content: m.content }))
}

function replaceTyping(messages, content) {
  const next = [...messages]
  const last = next[next.length - 1]
  if (last?.role === 'assistant' && last?.content === TYPING) {
    next[next.length - 1] = { role: 'assistant', content }
  } else {
    next.push({ role: 'assistant', content })
  }
  return next
}

function replaceTypingInChats(chats, chatId, content) {
  return chats.map((c) => {
    if (c.id !== chatId) return c
    return {
      ...c,
      messages: replaceTyping(c.messages, content),
      updatedAt: Date.now(),
    }
  })
}

/** Chat is "landing" if it only has the initial assistant greeting and no user messages yet */
function isLanding(messages) {
  if (!messages || messages.length === 0) return true
  return !messages.some((m) => m.role === 'user')
}

export default function ChatPage() {
  const [{ chats, activeChatId }, setSession] = useState(initSession)
  const [mode, setMode] = useState('beginner')
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [interviewState, setInterviewState] = useState(INTERVIEW_INITIAL)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const activeChat = chats.find((c) => c.id === activeChatId)
  const messages = activeChat?.messages ?? INITIAL_MESSAGES
  const showLanding = isLanding(messages)

  useEffect(() => {
    saveChatsToStorage(chats)
  }, [chats])

  useEffect(() => {
    if (mode !== 'practice') {
      setInterviewState(INTERVIEW_INITIAL)
    }
  }, [mode])

  useEffect(() => {
    setInterviewState(INTERVIEW_INITIAL)
  }, [activeChatId])

  function resetInterviewFlow() {
    setInterviewState(INTERVIEW_INITIAL)
  }

  function handleNewChat() {
    const nc = createNewChat()
    setSession((s) => ({
      chats: [nc, ...s.chats],
      activeChatId: nc.id,
    }))
    setDraft('')
    setIsLoading(false)
    resetInterviewFlow()
  }

  function handleSelectChat(id) {
    setSession((s) => ({ ...s, activeChatId: id }))
    setDraft('')
    setIsLoading(false)
    resetInterviewFlow()
  }

  function sendFromInput() {
    void submitMessage(draft)
  }

  async function submitMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const requestChatId = activeChatId
    const chat = chats.find((c) => c.id === requestChatId)
    if (!chat) return

    const requestMode = mode
    const phaseAtSend = interviewState.phase
    const questionAtSend = interviewState.currentQuestion

    const userMessage = { role: 'user', content: trimmed }
    const historyForRequest = [...chat.messages, userMessage]

    setDraft('')
    setIsLoading(true)

    setSession((s) => ({
      ...s,
      chats: s.chats.map((c) =>
        c.id === requestChatId
          ? {
              ...c,
              messages: [...c.messages, userMessage, { role: 'assistant', content: TYPING }],
              title: titleFromMessages([...c.messages, userMessage]),
              updatedAt: Date.now(),
            }
          : c
      ),
    }))

    const apiKey = import.meta.env.VITE_GROQ_API_KEY?.trim()

    if (!apiKey) {
      setSession((s) => ({
        ...s,
        chats: replaceTypingInChats(s.chats, requestChatId, API_ERROR_MESSAGE),
      }))
      setIsLoading(false)
      return
    }

    const practiceInterview =
      requestMode === 'practice'
        ? {
            phase: phaseAtSend,
            currentQuestion: questionAtSend,
          }
        : null

    const systemContent = buildSystemPrompt(requestMode, 'General DSA', practiceInterview)
    const apiMessages = [
      { role: 'system', content: systemContent },
      ...messagesForApi(historyForRequest),
    ]

    try {
      const reply = await fetchGroqChatCompletion(apiKey, apiMessages)
      setSession((s) => ({
        ...s,
        chats: replaceTypingInChats(s.chats, requestChatId, reply),
      }))
      if (requestMode === 'practice') {
        setInterviewState(
          phaseAtSend === 'idle'
            ? { phase: 'awaiting_answer', currentQuestion: reply }
            : INTERVIEW_INITIAL
        )
      }
    } catch {
      setSession((s) => ({
        ...s,
        chats: replaceTypingInChats(s.chats, requestChatId, API_ERROR_MESSAGE),
      }))
    } finally {
      setIsLoading(false)
    }
  }

  // ─── Landing Page View ──────────────────────────────
  if (showLanding) {
    return (
      <AppLayout
        sidebar={
          <Sidebar
            chats={chats}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            mobileOpen={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />
        }
      >
        <Header
          mode={mode}
          onModeChange={setMode}
          interviewActive={mode === 'practice'}
          interviewAwaitingAnswer={mode === 'practice' && interviewState.phase === 'awaiting_answer'}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
          sidebarExpanded={mobileSidebarOpen}
        />

        {/* Centered landing content */}
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-8">
          <div className="flex w-full max-w-3xl flex-col items-center gap-8">
            {/* Greeting */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl sm:h-20 sm:w-20 sm:text-4xl"
                style={{
                  background: 'var(--profile-avatar-bg)',
                  boxShadow: `0 8px 32px var(--shadow-medium)`,
                }}
              >
                🤖
              </div>
              <h2
                className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
                style={{ color: 'var(--text-primary)' }}
              >
                Hi, I'm PrepAlgo AI 👋
              </h2>
              <p
                className="max-w-md text-base sm:text-lg"
                style={{ color: 'var(--text-secondary)' }}
              >
                How can I help you today?
              </p>
            </div>

            {/* Suggestion cards */}
            <SuggestedPrompts
              landing
              disabled={isLoading}
              onSendPrompt={(prompt) => void submitMessage(prompt)}
            />

            {/* Centered input */}
            <div className="w-full max-w-3xl">
              <ChatInput
                value={draft}
                onChange={setDraft}
                onSend={sendFromInput}
                disabled={isLoading}
                centered
              />
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  // ─── Normal Chat View ──────────────────────────────
  return (
    <AppLayout
      sidebar={
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />
      }
    >
      <Header
        mode={mode}
        onModeChange={setMode}
        interviewActive={mode === 'practice'}
        interviewAwaitingAnswer={mode === 'practice' && interviewState.phase === 'awaiting_answer'}
        onOpenSidebar={() => setMobileSidebarOpen(true)}
        sidebarExpanded={mobileSidebarOpen}
      />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput
        value={draft}
        onChange={setDraft}
        onSend={sendFromInput}
        disabled={isLoading}
      />
    </AppLayout>
  )
}
