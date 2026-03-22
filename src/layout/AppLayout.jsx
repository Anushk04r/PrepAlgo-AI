export default function AppLayout({ sidebar, children }) {
  return (
    <div
      className="flex h-full min-h-0 w-full"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {sidebar}
      <main
        className="flex min-h-0 min-w-0 flex-1 flex-col"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {children}
      </main>
    </div>
  )
}
