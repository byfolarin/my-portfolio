"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const suggestions = [
  "What does Folarin do?",
  "What's he reading right now?",
  "What projects has he shipped?",
  "How do I get in touch?",
];

type Msg = { role: "user" | "assistant"; content: string };
type Status = "idle" | "thinking" | "streaming" | "unconfigured" | "error";

const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function AskWidget() {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const [question, setQuestion] = useState("");
  const [thread, setThread] = useState<Msg[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // drawer slides in from the right edge
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const panel = overlay.querySelector(".ask-side");
    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => gsap.set(overlay, { display: "none" }),
    });
    tl.set(overlay, { display: "block" })
      .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22 })
      .fromTo(
        panel,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.5, ease: "power3.out" },
        "-=0.1"
      )
      .fromTo(
        overlay.querySelectorAll(".ask-stagger"),
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out", stagger: 0.05 },
        "-=0.3"
      );
    tlRef.current = tl;
    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  const setDrawer = (next: boolean) => {
    setOpen(next);
    const tl = tlRef.current;
    const overlay = overlayRef.current;
    if (!tl || !overlay) return;
    if (reduceMotion()) {
      gsap.set(overlay, { display: next ? "block" : "none", autoAlpha: 1 });
      gsap.set(overlay.querySelectorAll(".ask-side, .ask-stagger"), {
        clearProps: "transform,opacity,visibility",
      });
      return;
    }
    if (next) tl.timeScale(1).play();
    else tl.timeScale(1.5).reverse();
  };

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          setDrawer(!o);
          return !o;
        });
      }
      if (e.key === "Escape") setDrawer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 260);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(id);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // keep the newest exchange in view as answers stream in
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [thread]);

  const ask = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || status === "thinking" || status === "streaming") return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const history = [...thread, { role: "user" as const, content: trimmed }];
    setThread(history);
    setQuestion("");
    setStatus("thinking");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (res.status === 503) {
        setStatus("unconfigured");
        return;
      }
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        setThread([
          ...history,
          {
            role: "assistant",
            content: data?.error ?? "Something went wrong — try again.",
          },
        ]);
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
        setThread([...history, { role: "assistant", content: text }]);
      }
      setStatus("idle");
    } catch {
      if (!controller.signal.aborted) {
        setThread([
          ...history,
          { role: "assistant", content: "Something went wrong — try again." },
        ]);
        setStatus("error");
      }
    }
  };

  const busy = status === "thinking" || status === "streaming";
  const waitingForFirstToken =
    status === "thinking" &&
    thread.length > 0 &&
    thread[thread.length - 1].role === "user";

  return (
    <>
      <button
        type="button"
        className="ask-trigger"
        onClick={() => setDrawer(true)}
        aria-label="Ask anything about Folarin"
      >
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden>
          <path
            d="M8 1.5 9.4 6 14 7.5 9.4 9 8 13.5 6.6 9 2 7.5 6.6 6z"
            fill="currentColor"
          />
        </svg>
        <span>Ask anything</span>
        <kbd>{isMac ? "⌘K" : "Ctrl K"}</kbd>
      </button>

      <div
        ref={overlayRef}
        className="ask-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Ask about Folarin"
        aria-hidden={!open}
        onClick={(e) => {
          if (e.target === e.currentTarget) setDrawer(false);
        }}
      >
        <aside className="ask-side">
          <div className="ask-head">
            <span className="ask-head-title">
              <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden>
                <path
                  d="M8 1.5 9.4 6 14 7.5 9.4 9 8 13.5 6.6 9 2 7.5 6.6 6z"
                  fill="currentColor"
                />
              </svg>
              Ask about Folarin
            </span>
            <span className="ask-head-hint">
              {thread.length > 0 && (
                <button
                  type="button"
                  className="ask-reset"
                  onClick={() => {
                    abortRef.current?.abort();
                    setThread([]);
                    setStatus("idle");
                    inputRef.current?.focus();
                  }}
                >
                  Start over
                </button>
              )}
              <button
                type="button"
                className="ask-close"
                aria-label="Close"
                onClick={() => setDrawer(false)}
              >
                <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden>
                  <path
                    d="M2 2l8 8M10 2l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </span>
          </div>

          <div className="ask-thread">
            {thread.length === 0 && (
              <div className="ask-empty ask-stagger">
                <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden>
                  <path
                    d="M8 1.5 9.4 6 14 7.5 9.4 9 8 13.5 6.6 9 2 7.5 6.6 6z"
                    fill="currentColor"
                  />
                </svg>
                <p>
                  Ask me anything about Folarin — his work, his shelf, or how
                  to reach him.
                </p>
              </div>
            )}
            {thread.map((m, i) =>
              m.role === "user" ? (
                <p key={i} className="ask-question">
                  {m.content}
                </p>
              ) : (
                <p key={i} className="ask-answer">
                  {m.content}
                </p>
              )
            )}
            {waitingForFirstToken && (
              <p className="ask-answer ask-pulse">Thinking…</p>
            )}
            {status === "unconfigured" && (
              <p className="ask-answer">
                The assistant isn&rsquo;t connected yet — just{" "}
                <a className="basic-link" href="mailto:folarin@kredete.com">
                  email Folarin
                </a>
                .
              </p>
            )}
            <div ref={endRef} />
          </div>

          {thread.length === 0 && (
            <div className="ask-suggestions">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="ask-chip ask-stagger"
                  onClick={() => ask(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            className="ask-form ask-stagger"
            onSubmit={(e) => {
              e.preventDefault();
              ask(question);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={question}
              maxLength={300}
              placeholder={
                thread.length ? "Ask a follow-up…" : "Ask anything about Folarin…"
              }
              onChange={(e) => setQuestion(e.target.value)}
              aria-label="Your question"
            />
            <button
              type="submit"
              aria-label="Ask"
              disabled={busy || !question.trim()}
            >
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

          <p className="ask-footnote">Answered by AI · may be imperfect</p>
        </aside>
      </div>
    </>
  );
}
