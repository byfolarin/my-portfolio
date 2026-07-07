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

  // the spotlight blooms out of the trigger pill at the bottom center
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const panel = overlay.querySelector(".ask-panel");
    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => gsap.set(overlay, { display: "none" }),
    });
    tl.set(overlay, { display: "flex" })
      .fromTo(
        overlay,
        { clipPath: "circle(0% at 50% calc(100% - 2.5rem))" },
        {
          clipPath: "circle(142% at 50% calc(100% - 2.5rem))",
          duration: 0.5,
          ease: "power3.inOut",
        }
      )
      .fromTo(
        panel,
        { y: 26, scale: 0.96, autoAlpha: 0 },
        { y: 0, scale: 1, autoAlpha: 1, duration: 0.45, ease: "power3.out" },
        "-=0.24"
      )
      .fromTo(
        overlay.querySelectorAll(".ask-stagger"),
        { y: 12, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out", stagger: 0.05 },
        "-=0.28"
      );
    tlRef.current = tl;
    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  const setSpotlight = (next: boolean) => {
    setOpen(next);
    const tl = tlRef.current;
    const overlay = overlayRef.current;
    if (!tl || !overlay) return;
    if (reduceMotion()) {
      gsap.set(overlay, { display: next ? "flex" : "none", clipPath: "none" });
      gsap.set(overlay.querySelectorAll(".ask-panel, .ask-stagger"), {
        clearProps: "all",
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
          setSpotlight(!o);
          return !o;
        });
      }
      if (e.key === "Escape") setSpotlight(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 220);
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
        onClick={() => setSpotlight(true)}
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
          if (e.target === e.currentTarget) setSpotlight(false);
        }}
      >
        <div className="ask-panel">
          <div className="ask-head ask-stagger">
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
              <kbd>esc</kbd>
            </span>
          </div>

          {thread.length > 0 && (
            <div className="ask-thread">
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

          {thread.length === 0 && (
            <div className="ask-suggestions">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="pill pill-ghost ask-stagger"
                  onClick={() => ask(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <p className="ask-footnote ask-stagger">
            Answered by AI · may be imperfect
          </p>
        </div>
      </div>
    </>
  );
}
