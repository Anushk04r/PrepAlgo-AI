import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { TYPING_PLACEHOLDER } from '../../constants/chat'

const markdownComponents = {
  pre({ children }) {
    return (
      <pre
        className="my-4 overflow-x-auto rounded-xl p-4 text-[0.8125rem] leading-relaxed first:mt-0 last:mb-0 [&>code.hljs]:bg-transparent [&>code.hljs]:p-0"
        style={{
          border: '1px solid var(--border-primary)',
          backgroundColor: 'var(--bg-code-block)',
          boxShadow: `inset 0 1px 4px var(--shadow-soft)`,
        }}
      >
        {children}
      </pre>
    )
  },
  code({ className, children, ...props }) {
    const text = flattenText(children)
    const multiline = text.includes('\n')
    const isBlock = multiline || /hljs|language-/.test(className || '')

    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }

    return (
      <code
        className="rounded-md px-1.5 py-0.5 text-[0.9em] font-normal"
        style={{
          backgroundColor: 'var(--bg-code-inline)',
          color: 'var(--text-code)',
          border: '1px solid var(--border-secondary)',
        }}
        {...props}
      >
        {children}
      </code>
    )
  },
}

function flattenText(node) {
  if (node == null) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(flattenText).join('')
  if (typeof node === 'object' && 'props' in node && node.props?.children != null) {
    return flattenText(node.props.children)
  }
  return ''
}

function AssistantMarkdown({ content }) {
  return (
    <div className="prose max-w-none text-[0.9375rem] leading-relaxed prose-headings:mb-2 prose-headings:mt-5 prose-headings:font-semibold prose-headings:tracking-tight first:prose-headings:mt-0 prose-p:my-3 prose-p:leading-relaxed prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-strong:font-semibold prose-hr:my-4 prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent"
      style={{
        color: 'var(--text-primary)',
        '--tw-prose-headings': 'var(--text-primary)',
        '--tw-prose-body': 'var(--text-primary)',
        '--tw-prose-bold': 'var(--text-primary)',
        '--tw-prose-links': 'var(--text-accent)',
        '--tw-prose-quotes': 'var(--text-secondary)',
        '--tw-prose-quote-borders': 'var(--border-hover)',
        '--tw-prose-hr': 'var(--border-primary)',
        '--tw-prose-bullets': 'var(--text-tertiary)',
        '--tw-prose-counters': 'var(--text-tertiary)',
      }}
    >
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

/**
 * @param {{ role: 'user' | 'assistant'; content: string }} props
 */
export default function MessageBubble({ role, content }) {
  const isUser = role === 'user'
  const isTyping = role === 'assistant' && content === TYPING_PLACEHOLDER

  const rowClass = isUser ? 'justify-end' : 'justify-start'

  if (isUser) {
    return (
      <div className={`flex w-full ${rowClass}`}>
        <div
          className="max-w-[min(92%,44rem)] rounded-2xl rounded-br-lg px-5 py-4 text-[0.9375rem] font-normal leading-[1.7] tracking-[0.01em]"
          style={{
            backgroundColor: 'var(--bg-bubble-user)',
            color: '#fff',
            boxShadow: `0 4px 14px var(--shadow-soft)`,
          }}
        >
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex w-full ${rowClass}`}>
      <div
        className={`max-w-[min(92%,44rem)] rounded-2xl rounded-bl-lg px-5 py-4 text-[0.9375rem] font-normal tracking-[0.01em] ${
          isTyping ? 'italic leading-[1.7]' : 'leading-normal'
        }`}
        style={{
          border: '1px solid var(--border-primary)',
          backgroundColor: 'var(--bg-bubble-assistant)',
          color: isTyping ? 'var(--text-tertiary)' : 'var(--text-primary)',
          boxShadow: `0 2px 8px var(--shadow-soft)`,
        }}
      >
        {isTyping ? content : <AssistantMarkdown content={content} />}
      </div>
    </div>
  )
}
