const PROMPTS = [
  'Explain Binary Search',
  'Give me a DP question',
  'Ask me an interview question',
]

export default function SuggestedPrompts({ onSendPrompt, disabled = false, landing = false }) {
  if (landing) {
    return (
      <div className="flex w-full flex-col items-center gap-3 px-4 sm:flex-row sm:justify-center sm:gap-4">
        {PROMPTS.map((text) => (
          <button
            key={text}
            type="button"
            disabled={disabled}
            onClick={() => onSendPrompt(text)}
            className="w-full max-w-[280px] rounded-2xl px-5 py-4 text-center text-sm font-medium leading-snug sm:w-auto sm:flex-1"
            style={{
              border: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-landing-card)',
              color: 'var(--text-primary)',
            }}
          >
            {text}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="shrink-0 px-5 pb-3">
      <div className="mx-auto flex w-full max-w-4xl flex-wrap justify-center gap-2.5">
        {PROMPTS.map((text) => (
          <button
            key={text}
            type="button"
            disabled={disabled}
            onClick={() => onSendPrompt(text)}
            className="rounded-full px-3.5 py-2 text-xs font-medium leading-snug disabled:pointer-events-none disabled:opacity-40 sm:text-[0.8125rem]"
            style={{
              border: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-landing-card)',
              color: 'var(--text-secondary)',
            }}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  )
}
