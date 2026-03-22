function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[1.125rem] w-[1.125rem] translate-x-px"
      aria-hidden
    >
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
  )
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = 'Message DSA Mentor AI…',
  centered = false,
}) {
  function handleSubmit(e) {
    e.preventDefault()
    if (!disabled) onSend()
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!disabled) onSend()
    }
  }

  const sendDisabled = disabled || !value.trim()

  return (
    <div
      className={`shrink-0 px-4 sm:px-5 ${centered ? 'pb-4 pt-0' : 'pb-6 pt-4'}`}
      style={
        centered
          ? {}
          : {
              borderTop: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-surface)',
              backdropFilter: 'blur(12px)',
              boxShadow: `0 -10px 40px -14px var(--shadow-soft)`,
            }
      }
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-3xl items-end gap-3 rounded-[1.75rem] py-3 pl-5 pr-3"
        style={{
          border: '1px solid var(--border-input)',
          backgroundColor: 'var(--bg-input)',
          boxShadow: `0 12px 48px -12px var(--shadow-medium)`,
        }}
      >
        <textarea
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="max-h-40 min-h-[48px] flex-1 resize-none bg-transparent py-2.5 text-[0.9375rem] font-normal leading-relaxed outline-none disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            color: 'var(--text-primary)',
          }}
        />
        <button
          type="submit"
          disabled={sendDisabled}
          className="mb-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-35"
          style={{
            background: `linear-gradient(to bottom, var(--gradient-btn-from), var(--gradient-btn-to))`,
            color: 'var(--text-inverse)',
            boxShadow: `0 4px 12px var(--shadow-soft)`,
          }}
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  )
}
