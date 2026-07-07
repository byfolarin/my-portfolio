"use client";

import { useRef, useState } from "react";

const suggestions = [
  "What does Folarin do?",
  "What's he reading right now?",
  "What projects has he shipped?",
  "How do I get in touch?",
];

type Status = "idle" | "thinking" | "streaming" | "unconfigured" | "error";

export default function AskClient() {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const abortRef = useRef<AbortController | null>(null);

  const ask = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || status === "thinking" || status === "streaming") return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setAsked(trimmed);
    setQuestion("");
    setAnswer("");
    setStatus("thinking");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
        signal: controller.signal,
      });

      if (res.status === 503) {
        setStatus("unconfigured");
        return;
      }
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        setAnswer(data?.error ?? "Something went wrong — try again.");
        setStatus("error");
        return;
      }

      setStatus("streaming");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setAnswer(text);
      }
      setStatus("idle");
    } catch {
      if (!controller.signal.aborted) {
        setAnswer("Something went wrong — try again.");
        setStatus("error");
      }
    }
  };

  const busy = status === "thinking" || status === "streaming";

  return (
    <div className="ask">
      <form
        className="ask-form"
        onSubmit={(e) => {
          e.preventDefault();
          ask(question);
        }}
      >
        <input
          type="text"
          value={question}
          maxLength={300}
          placeholder="Ask anything about Folarin…"
          onChange={(e) => setQuestion(e.target.value)}
          aria-label="Your question"
        />
        <button type="submit" aria-label="Ask" disabled={busy || !question.trim()}>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
            <path
              d="M8 13V3.5M3.8 7.2 8 3l4.2 4.2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      </form>

      {!asked && (
        <div className="ask-suggestions">
          {suggestions.map((s) => (
            <button key={s} type="button" className="pill pill-ghost" onClick={() => ask(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {asked && (
        <div className="ask-thread">
          <p className="ask-question">{asked}</p>
          {status === "thinking" ? (
            <p className="ask-answer ask-pulse">Thinking…</p>
          ) : status === "unconfigured" ? (
            <p className="ask-answer">
              The assistant isn&rsquo;t connected yet — check back soon, or just{" "}
              <a className="basic-link" href="mailto:folarin@kredete.com">
                email Folarin
              </a>
              .
            </p>
          ) : (
            <p className="ask-answer">{answer}</p>
          )}
        </div>
      )}
    </div>
  );
}
