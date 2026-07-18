import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

export function CourseTutor({ slug, courseName }: { slug: string; courseName: string }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/tutor", body: { slug } }),
    [slug],
  );

  const { messages, sendMessage, status } = useChat({ id: `tutor-${slug}`, transport });

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, status]);

  const busy = status === "submitted" || status === "streaming";

  const suggestions = [
    "Summarise week 1 for me",
    "What projects will I build?",
    "What jobs can I get after this?",
    "How is the certification issued?",
  ];

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    void sendMessage({ text: trimmed });
    setInput("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="tutor-card">
      <div className="tutor-head">
        <div className="ai-avatar">N</div>
        <div>
          <div className="ai-title">Nexa Tutor · {courseName}</div>
          <div className="ai-status">Ask anything about this course</div>
        </div>
      </div>

      <div className="tutor-messages" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="ai-msg assistant">
            <div className="ai-bubble">
              Hi 👋 I'm your AI tutor for {courseName}. Ask about the weekly curriculum, projects, careers, certification, or anything you're unsure about.
            </div>
          </div>
        )}
        {messages.map((m) => {
          const text = m.parts
            .filter((p): p is { type: "text"; text: string } => p.type === "text")
            .map((p) => p.text)
            .join("");
          return (
            <div key={m.id} className={`ai-msg ${m.role}`}>
              {text && <div className="ai-bubble">{text}</div>}
            </div>
          );
        })}
        {busy && messages[messages.length - 1]?.role === "user" && (
          <div className="ai-msg assistant">
            <div className="ai-typing"><span /><span /><span /></div>
          </div>
        )}
      </div>

      {messages.length === 0 && (
        <div className="ai-suggestions" style={{ padding: "0 1rem 0.75rem" }}>
          {suggestions.map((s) => (
            <button key={s} type="button" className="ai-chip" onClick={() => send(s)}>{s}</button>
          ))}
        </div>
      )}

      <form className="ai-composer" onSubmit={onSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about ${courseName}…`}
          disabled={busy}
        />
        <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13" />
            <path d="M22 2l-7 20-4-9-9-4z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
