import { useTheme } from '../context/ThemeContext'
import { SidebarMenuButton } from './Sidebar'

const MODES = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'interview', label: 'Interview' },
  { id: 'practice', label: 'Practice' },
]

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[1.125rem] w-[1.125rem]" aria-hidden>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[1.125rem] w-[1.125rem]" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Header({
  mode,
  onModeChange,
  interviewActive = false,
  interviewAwaitingAnswer = false,
  onOpenSidebar,
  sidebarExpanded = false,
}) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header
      className="flex shrink-0 flex-col"
      style={{
        borderBottom: '1px solid var(--border-primary)',
        backgroundColor: 'var(--bg-surface)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex h-14 items-center justify-between gap-3 px-4 sm:gap-6 sm:px-5">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {onOpenSidebar && (
            <SidebarMenuButton onClick={onOpenSidebar} expanded={sidebarExpanded} />
          )}
          <div
            className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-xl p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              boxShadow: 'inset 0 1px 3px var(--shadow-soft)',
              border: '1px solid var(--border-secondary)',
            }}
            role="group"
            aria-label="Chat mode"
          >
            {MODES.map((m) => {
              const active = mode === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onModeChange(m.id)}
                  className="rounded-lg px-3.5 py-1.5 text-sm font-medium"
                  style={
                    active
                      ? {
                          background: `linear-gradient(to bottom, var(--mode-active-from), var(--mode-active-to))`,
                          color: '#fff',
                          fontWeight: 600,
                          boxShadow: `0 4px 12px var(--shadow-medium)`,
                          border: `1px solid var(--mode-active-ring)`,
                        }
                      : {
                          color: 'var(--text-secondary)',
                          background: 'transparent',
                          border: '1px solid transparent',
                        }
                  }
                >
                  {m.label}
                </button>
              )
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{
            border: '1px solid var(--border-primary)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
          }}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      {interviewActive && (
        <div
          className="px-5 py-2 text-center text-xs font-medium"
          role="status"
          style={{
            borderTop: `1px solid var(--interview-border)`,
            backgroundColor: 'var(--interview-bg)',
            color: 'var(--interview-text)',
          }}
        >
          Interview mode active
          {interviewAwaitingAnswer ? ' · Waiting for your answer' : ' · Ask or reply to get a question'}
        </div>
      )}
    </header>
  )
}
