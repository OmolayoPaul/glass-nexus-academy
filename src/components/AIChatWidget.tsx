import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, type FormEvent } from "react";

const SUGGESTIONS = [
  "Which course should I take?",
  "How much does Python cost?",
  "Do you offer online classes?",
  "I want to enrol",
];

const transport = new DefaultChatTransport({ api: "/api/chat" });

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport,
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || status === "submitted" || status === "streaming") return;
    void sendMessage({ text: trimmed });
    setInput("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const busy = status === "submitted" || status === "streaming";

  return (
    <>
      <button
        className="ai-fab"
        aria-label={open ? "Close assistant" : "Open Nexa assistant"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="ai-ring" aria-hidden="true" />
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="ai-panel" role="dialog" aria-label="Nexa AI assistant">
          <div className="ai-header">
            <div className="ai-avatar">N</div>
            <div>
              <div className="ai-title">Nexa · AI Course Advisor</div>
              <div className="ai-status">Online · replies instantly</div>
            </div>
            <button className="ai-close" aria-label="Close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="ai-messages" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="ai-msg assistant">
                <div className="ai-bubble">
                  Hi 👋 I'm Nexa, your AI course advisor at Glass Nexus Academy. Ask me about courses, prices, schedules — or tell me your goal and I'll recommend a track.
                </div>
              </div>
            )}

            {messages.map((m) => {
              const textParts = m.parts.filter((p): p is { type: "text"; text: string } => p.type === "text");
              const toolParts = m.parts.filter((p) => p.type.startsWith("tool-"));
              const text = textParts.map((p) => p.text).join("");
              return (
                <div key={m.id} className={`ai-msg ${m.role}`}>
                  {text && <div className="ai-bubble">{text}</div>}
                  {toolParts.map((p, i) => {
                    const anyP = p as { type: string; state?: string };
                    if (anyP.type === "tool-save_lead") {
                      const state = anyP.state;
                      if (state === "input-streaming" || state === "input-available") {
                        return <div className="ai-tool" key={i}>📝 Saving your details…</div>;
                      }
                      if (state === "output-available") {
                        return <div className="ai-tool" key={i}>✅ Lead saved — an advisor will reach out shortly.</div>;
                      }
                    }
                    return null;
                  })}
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
            <div className="ai-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="ai-chip" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          )}

          <form className="ai-composer" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about courses, pricing, schedules…"
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
      )}
    </>
  );
}
