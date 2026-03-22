# DSA Mentor AI

Focused chat UI for **Data Structures & Algorithms** and **technical interview prep**. Choose a **mode** (Beginner / Interview / Practice mock interview) and chat with a model constrained by a strict system prompt.

## Features

| Feature | Details |
|---------|---------|
| **ChatGPT-style landing page** | Centered greeting, 3 suggestion cards, and a centered chat input. Transitions to the conversation view on first message. |
| **Light / Dark theme** | Toggle via the sun/moon button in the header. Preference is saved in `localStorage`. |
| **Mode selector** | Beginner (simple explanations), Interview (concise optimal answers), Practice (mock-interview ask → answer → evaluate loop). |
| **Chat history** | Stored in `localStorage`. Recent chats listed in the sidebar. |
| **Profile widget** | Placeholder profile section at the bottom of the sidebar (no auth required). |
| **Markdown rendering** | Assistant replies rendered with `react-markdown` + syntax-highlighted code blocks via `rehype-highlight`. |
| **Responsive design** | Works across desktop, tablet, and mobile. Sidebar collapses into a drawer on small screens. |

## Knowledge base & scope

This product does **not** use a separate vector database or uploaded files. The "knowledge base" is **explicit and enforced in code**:

| Layer | What it does |
|-------|--------------|
| **System prompt** (`src/lib/systemPrompt.js`) | Restricts the assistant to DSA/interview content, defines mode behavior, and (in Practice) runs the mock-interview flow. |
| **Modes** | Beginner = explanations; Interview = concise optimal answers; Practice = ask → answer → evaluate loop. |

**Scope statement:** *Answers are scoped by a fixed system prompt plus the selected mode — not by arbitrary web crawl. Out-of-scope questions get a standard refusal line.*

## Run locally

```bash
npm install
# add .env — see .env.example
npm run dev
```

`VITE_GROQ_API_KEY` is required for real replies (see `.env.example`).

## Deploy (e.g. Vercel)

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com) (framework: **Vite**).
3. Add environment variable **`VITE_GROQ_API_KEY`** in the Vercel project settings.
4. Deploy. `vercel.json` includes a SPA **rewrite** so client-side routing keeps working.

## Project structure

```
src/
├── api/groq.js              # Groq API client
├── components/
│   ├── ChatInput.jsx         # Message input with send button
│   ├── ChatMessages.jsx      # Scrollable message list
│   ├── Header.jsx            # Mode selector + theme toggle
│   ├── Sidebar.jsx           # Chat history + profile widget
│   ├── SuggestedPrompts.jsx  # Landing cards & inline prompts
│   └── chat/
│       └── MessageBubble.jsx # User/assistant message bubble
├── constants/chat.js         # Shared constants
├── context/ThemeContext.jsx   # Light/dark theme (React context)
├── layout/AppLayout.jsx      # Sidebar + main area layout
├── lib/
│   ├── chatStorage.js        # localStorage read/write
│   └── systemPrompt.js       # System prompt builder
├── pages/ChatPage.jsx        # Main page (landing ↔ chat view)
├── App.jsx
├── main.jsx
└── index.css                 # CSS custom properties for theming
```

## Stack

React (Vite), Tailwind CSS v4, Groq API (`llama-3.1-8b-instant`), `react-markdown` + `rehype-highlight`, localStorage for chat & theme persistence.
