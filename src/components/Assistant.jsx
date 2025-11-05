import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User } from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Assistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I’m your portfolio AI. Ask me about projects, case studies, or pitch an idea and I’ll propose a build plan.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I couldn’t reach the assistant right now." },
      ]);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <section id="assistant" className="relative py-24 bg-black text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">AI Assistant</h2>
          <p className="mt-4 text-white/70">
            Ask about my work or share your idea—get a tailored summary or action plan sourced from the content on this site.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {messages.map((m, i) => (
              <ChatBubble key={i} role={m.role} content={m.content} />
            ))}
            {loading && <p className="text-sm text-white/60">Thinking…</p>}
          </div>
          <div className="mt-4 flex items-end gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask about projects, blog, case studies, or propose a feature…"
              rows={2}
              className="flex-1 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-indigo-400"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold disabled:opacity-60"
            >
              <Send className="h-4 w-4" /> Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-300">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-relaxed ${
          isUser ? "bg-white/10" : "bg-white/5"
        }`}
      >
        {content}
      </div>
      {isUser && (
        <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80">
          <User className="h-4 w-4" />
        </div>
      )}
    </motion.div>
  );
}
