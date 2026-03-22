const sectionX = 'px-4'

function sortByRecent(chats) {
  return [...chats].sort((a, b) => b.updatedAt - a.updatedAt)
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path
        fillRule="evenodd"
        d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function ProfileWidget() {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-3 py-2.5"
      style={{ backgroundColor: 'var(--profile-bg)' }}
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
        style={{ background: 'var(--profile-avatar-bg)' }}
      >
        U
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="truncate text-sm font-medium leading-tight"
          style={{ color: 'var(--profile-name)' }}
        >
          User
        </p>
        <p
          className="truncate text-xs leading-tight"
          style={{ color: 'var(--profile-sub)' }}
        >
          Free Plan
        </p>
      </div>
    </div>
  )
}

export default function Sidebar({
  chats = [],
  activeChatId,
  onSelectChat,
  onNewChat,
  mobileOpen = false,
  onCloseMobile,
}) {
  const recent = sortByRecent(chats).slice(0, 5)

  function handleSelect(id) {
    onSelectChat(id)
    onCloseMobile?.()
  }

  function handleNew() {
    onNewChat()
    onCloseMobile?.()
  }

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'var(--bg-overlay)', backdropFilter: 'blur(2px)' }}
          aria-label="Close menu"
          onClick={onCloseMobile}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[260px] shrink-0 flex-col md:relative md:z-0 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{
          borderRight: '1px solid var(--border-primary)',
          backgroundColor: 'var(--bg-surface-alt)',
          boxShadow: '6px 0 28px -10px var(--shadow-medium)',
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Top — branding + new chat */}
        <div
          className={`flex flex-col gap-3.5 py-5 ${sectionX}`}
          style={{ borderBottom: '1px solid var(--border-secondary)' }}
        >
          <div className="flex items-start justify-between gap-2 md:block">
            <div className="min-w-0 flex-1">
              <h1
                className="text-[1.0625rem] font-semibold tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                PrepAlgo AI
              </h1>
              <p
                className="mt-1 text-xs leading-snug"
                style={{ color: 'var(--text-tertiary)' }}
              >
                DSA & interview prep · scoped assistant
              </p>
            </div>
            <button
              type="button"
              onClick={onCloseMobile}
              className="shrink-0 rounded-lg p-2 md:hidden"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Close sidebar"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>
          <button
            type="button"
            onClick={handleNew}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium"
            style={{
              border: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-surface-hover)',
              color: 'var(--text-primary)',
              boxShadow: `0 1px 4px var(--shadow-soft)`,
            }}
          >
            <span className="text-base leading-none font-medium" aria-hidden>
              +
            </span>
            New Chat
          </button>
        </div>

        {/* Chat list */}
        <div className={`min-h-0 flex-1 overflow-y-auto py-5 ${sectionX}`}>
          <p
            className="mb-3.5 pl-0.5 text-[10px] font-normal uppercase tracking-[0.14em]"
            style={{ color: 'var(--text-muted)' }}
          >
            Recent Chats
          </p>
          {recent.length === 0 ? (
            <p className="px-3 text-sm" style={{ color: 'var(--text-tertiary)' }}>
              No chats yet — start one with New Chat
            </p>
          ) : (
            <ul className="flex flex-col gap-0.5">
              {recent.map((chat) => {
                const active = chat.id === activeChatId
                return (
                  <li key={chat.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(chat.id)}
                      className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-normal leading-snug"
                      style={
                        active
                          ? {
                              backgroundColor: 'var(--bg-surface-hover)',
                              color: 'var(--text-primary)',
                              boxShadow: `0 4px 12px var(--shadow-soft)`,
                              border: '1px solid var(--border-primary)',
                            }
                          : {
                              color: 'var(--text-secondary)',
                              background: 'transparent',
                              border: '1px solid transparent',
                            }
                      }
                    >
                      <span className="line-clamp-2">{chat.title}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Profile at bottom */}
        <div
          className={`py-4 ${sectionX}`}
          style={{ borderTop: '1px solid var(--border-secondary)' }}
        >
          <ProfileWidget />
        </div>
      </aside>
    </>
  )
}

export function SidebarMenuButton({ onClick, expanded = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="-ml-1 shrink-0 rounded-lg p-2 md:hidden"
      style={{ color: 'var(--text-secondary)' }}
      aria-label="Open chat history and navigation"
      aria-expanded={expanded}
    >
      <MenuIcon />
    </button>
  )
}
