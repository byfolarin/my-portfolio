"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "./projects";

export function ProjectMedia({ project }: { project: Project }) {
  if (project.video) {
    return (
      <video
        src={project.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${project.name} preview`}
      />
    );
  }
  if (project.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={project.image} alt={`${project.name} preview`} />;
  }
  return <span className="pb-media-mark">{project.name}</span>;
}

// a draggable row of frames: the hero frame sits centred with neighbours
// peeking in at both edges. Mouse drags scroll it; touch scrolls natively.
export function ShowcaseStrip({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);
  const no = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const strip = stripRef.current;
    const chip = chipRef.current;
    if (!strip) return;

    const hero = strip.children[1] as HTMLElement | undefined;
    if (hero) strip.scrollLeft = hero.offsetLeft - (strip.clientWidth - hero.offsetWidth) / 2;

    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    let travel = 0;

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      dragging = true;
      travel = 0;
      startX = event.clientX;
      startLeft = strip.scrollLeft;
      strip.classList.add("is-dragging");
    };
    const onMove = (event: PointerEvent) => {
      if (chip && event.pointerType === "mouse") {
        const box = strip.getBoundingClientRect();
        chip.style.translate = `${event.clientX - box.left}px ${event.clientY - box.top}px`;
      }
      if (!dragging) return;
      const dx = event.clientX - startX;
      travel = Math.max(travel, Math.abs(dx));
      strip.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      // re-enabling snap lets the browser settle on the nearest frame
      strip.classList.remove("is-dragging");
    };
    // a drag shouldn't count as a click on the frame it ends over
    const onClick = (event: MouseEvent) => {
      if (travel > 6) {
        event.preventDefault();
        event.stopPropagation();
      }
      travel = 0;
    };

    strip.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    strip.addEventListener("click", onClick, true);
    return () => {
      strip.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      strip.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <div className="aw-strip-wrap">
      <div className="aw-strip" ref={stripRef}>
        <div className="aw-frame" aria-hidden>
          <span className="aw-frame-mark">{project.name}</span>
          <span className="aw-frame-label">Fig. {no}.3 — image to come</span>
        </div>
        <button
          type="button"
          className="aw-frame aw-frame-hero"
          onClick={onOpen}
          aria-label={`Open ${project.name} case study`}
        >
          <ProjectMedia project={project} />
          <span className="aw-frame-label">Fig. {no}.1</span>
        </button>
        <div className="aw-frame" aria-hidden>
          <span className="aw-frame-mark">{project.name}</span>
          <span className="aw-frame-label">Fig. {no}.2 — image to come</span>
        </div>
      </div>
      <span className="aw-drag" ref={chipRef} aria-hidden>
        Drag
      </span>
    </div>
  );
}

// display type whose letters rise out of a mask the first time it scrolls
// into view; words stay whole so long names break between words
export function Reveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let n = 0;
  return (
    <span ref={ref} className="reveal" data-in={seen || undefined}>
      <span className="reveal-sr">{text}</span>
      {text.split(" ").map((word, w) => (
        <span key={w} className="reveal-word" aria-hidden>
          {Array.from(word).map((ch, c) => (
            <span key={c} className="reveal-mask">
              <span style={{ "--d": `${delay + n++ * 0.03}s` } as React.CSSProperties}>{ch}</span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function lagosTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(new Date());
}

export function LagosClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const tick = () => setTime(lagosTime().toUpperCase());
    const first = requestAnimationFrame(tick);
    const timer = window.setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(first);
      window.clearInterval(timer);
    };
  }, []);
  return (
    <span>
      Local time
      <br />
      Lagos, {time}
    </span>
  );
}
