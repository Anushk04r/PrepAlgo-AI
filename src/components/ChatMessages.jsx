import { useEffect, useRef } from 'react'
import MessageBubble from './chat/MessageBubble'

export default function ChatMessages({ messages, isLoading = false }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const empty = !messages || messages.length === 0

  return (
    <div
      ref={scrollRef}
      className="min-h-0 flex-1 overflow-y-auto"
      role="log"
      aria-label="Chat messages"
      aria-busy={isLoading}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-8 sm:px-5">
        {empty ? (
          <div className="flex min-h-[min(50vh,24rem)] flex-col items-center justify-center gap-4 px-6 text-center">
            <div
              className="rounded-2xl px-8 py-10"
              style={{
                border: '1px dashed var(--border-primary)',
                backgroundColor: 'var(--bg-landing-card)',
                boxShadow: `inset 0 2px 6px var(--shadow-soft)`,
              }}
            >
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                No messages in this chat yet
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                Use the box below to ask a question, or pick a suggested prompt. Your conversation will appear here.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble key={index} role={msg.role} content={msg.content} />
          ))
        )}
      </div>
    </div>
  )
}
