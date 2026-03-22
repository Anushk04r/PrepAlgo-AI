# PrepAlgo AI

PrepAlgo AI is an intelligent, AI-powered DSA interview assistant designed to help developers master Data Structures and Algorithms through a structured, interactive, and feedback-driven experience. Unlike generic chatbots, PrepAlgo AI is engineered with a specialized pedagogical approach to guide users from conceptual understanding to interview readiness.

---

## 💡 The Core Idea

Mastering DSA isn't just about finding the solution—it's about understanding the "why" and "how." **PrepAlgo AI** solves the problem of passive learning by acting as a mentor rather than just an answer engine. It focuses on the intuition behind algorithms, time/space complexity analysis, and realistic interview simulation, ensuring users are prepared for the rigors of technical interviews at top-tier companies.

---

## 🚀 Key Features

### 🎓 Mode-Based Learning System
PrepAlgo AI adapts its behavior based on your current goal. You can toggle between three specialized modes via the header:
- **Beginner Mode:** Focuses on clear, step-by-step explanations. It uses analogies and detailed walkthroughs to help you grasp fundamental concepts without feeling overwhelmed.
- **Interview Mode:** Provides concise, optimal solutions and professional-grade explanations. This mode is designed to show you how a top-tier candidate should communicate their thoughts and code during a real interview.
- **Practice Mode:** Our signature "guided discovery" mode. The AI acts as a patient coach, providing subtle hints and directional nudges instead of full solutions, forcing you to think through the logic yourself.

### 🎭 Mock Interview Simulation
A standout feature where the AI takes the driver's seat. In Practice Mode, PrepAlgo AI doesn't just wait for questions—it **asks** them. It conducts a realistic technical interview, evaluates your approach, critiques your time/space complexity, and provides constructive feedback on how to improve your performance.

### 🌓 Premium ChatGPT-like UI
Experience a world-class interface that feels alive:
- **Responsive Landing Page:** A clean, centered ChatGPT-style landing area with quick-action suggestion cards.
- **Fluid UI Transitions:** Seamlessly moves from a landing state to an active conversation view.
- **Light/Dark Mode:** A polished theme system with a dedicated toggle button, allowing for a comfortable coding environment in any lighting.

### 📜 Persistent Chat History
No login? No problem. PrepAlgo AI uses advanced `localStorage` management to persist your last **5 conversations**. Your progress, code snippets, and interview feedbacks are saved locally on your device, ready for you to pick up exactly where you left off.

### 💻 Rich Markdown & Code Rendering
All technical explanations and code blocks are rendered with precision. Using `react-markdown` and `rehype-highlight`, syntax highlighting is applied across multiple languages, making code snippets as readable as they would be in your IDE.

---

## 🛠️ Tech Stack

- **Frontend:** React 19 (Vite)
- **Styling:** Tailwind CSS v4 (with CSS Variable-based theming)
- **AI Engine:** Groq API (Inference on LLaMA 3.1 8B)
- **Content Parsing:** React Markdown + Rehype Highlight
- **Persistence:** LocalStorage API

---

## 🧠 How It Works

### The System Prompt Architecture
PrepAlgo AI is grounded by a strict system prompt that ensures it never strays from the DSA domain. It is programmed to:
1.  **Refuse** out-of-scope questions.
2.  **Enforce** complexity analysis in every technical response.
3.  **Validate** edge cases for every algorithm discussed.

### Dynamic Behavior Injection
Depending on the selected mode, the application dynamically injects different behavioral sets into the Groq API calls. This enables the "Ask-Evaluate" loop in Practice mode versus the "Explain-Implement" loop in Beginner mode, all within the same conversation thread.

---

## ⚙️ Setup Instructions

### 1. Clone & Install
```bash
git clone https://github.com/your-username/AlgoMentor-AI.git
cd AlgoMentor-AI
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```
Add your Groq API key (get one at [console.groq.com](https://console.groq.com)):
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```

---

## 🔮 Future Improvements
- [ ] **Voice Interview Mode:** Integrate Speech-to-Text and Text-to-Speech for realistic verbal practice.
- [ ] **Code Execution Sandbox:** Allow users to run and test their code snippets directly within the chat.
- [ ] **Difficulty Levels:** Adjustable difficulty (Easy, Medium, Hard) to match LeetCode standards.
- [ ] **Topic Progress Tracking:** A dashboard to visualize which DSA areas you've mastered.

---

## 🤝 Contributing
Contributions are welcome! If you have ideas for new pedagogical modes or UI enhancements, feel free to open an issue or submit a pull request.
