"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// uneven stops read as real loading rather than a linear tween
const STOPS = [0, 24, 61, 87, 100];
const ROLL = 0.48;
// each stop holds long enough to be read before the next roll
const GAP = 0.72;
// two laps of 0–9 so a reel can always roll forward (9 → 0 goes via the second lap)
const DIGITS = Array.from({ length: 20 }, (_, i) => i % 10);
const STEP = 100 / DIGITS.length;

function lagosTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

// counter loader: an odometer runs 000 → 100 over a measuring ruler, then the
// panel wipes up into the page. Plays on every full load, not on in-site navigation.
export default function Intro({ projectsCount }: { projectsCount: number }) {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // CSS already hides the loader for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const html = document.documentElement;
    (root.querySelector(".intro-clock") as HTMLElement).textContent = lagosTime();
    const slots = Array.from(root.querySelectorAll<HTMLElement>(".intro-slot"));
    const reels = slots.map((s) => s.firstElementChild as HTMLElement);
    const fill = root.querySelector(".intro-ruler-fill");
    const page = document.querySelector<HTMLElement>(".page");

    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const progress = { v: 0 };
    const shown = [0, 0, 0];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          html.style.overflow = prevOverflow;
          setDone(true);
        },
      });

      tl.from(".intro-meta, .intro-mark, .intro-ruler", {
        opacity: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: "power2.out",
      });
      tl.from(".intro-slot", { yPercent: 100, duration: 0.7, stagger: 0.06, ease: "power4.out" }, 0.1);

      // each stop rolls the reels like an odometer; the ruler follows continuously
      STOPS.slice(1).forEach((value, i) => {
        const start = 0.8 + i * GAP;
        const digits = String(value).padStart(3, "0").split("").map(Number);
        reels.forEach((reel, j) => {
          const from = shown[j];
          const to = digits[j];
          if (to === from) return;
          shown[j] = to;
          // wrap onto the second lap, then quietly snap back to the first
          tl.fromTo(
            reel,
            { yPercent: -from * STEP },
            {
              yPercent: -(to > from ? to : to + 10) * STEP,
              duration: ROLL,
              ease: "power3.inOut",
              immediateRender: false,
              onComplete: () => gsap.set(reel, { yPercent: -to * STEP }),
            },
            start,
          );
        });
        tl.call(
          () => {
            slots[0].classList.toggle("is-lead", value < 100);
            slots[1].classList.toggle("is-lead", value < 10);
          },
          undefined,
          start + 0.1,
        );
        tl.to(
          progress,
          {
            v: value,
            duration: ROLL,
            ease: "power3.inOut",
            onUpdate: () => gsap.set(fill, { scaleX: progress.v / 100 }),
          },
          start,
        );
      });

      // exit: digits lift out of their mask, then the panel wipes up
      tl.addLabel("exit", "+=0.35");
      tl.to(".intro-slot", { yPercent: -100, duration: 0.55, stagger: 0.05, ease: "power3.in" }, "exit");
      tl.to(".intro-meta, .intro-mark, .intro-ruler", { opacity: 0, duration: 0.35 }, "exit");
      tl.to(root, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power4.inOut" }, "exit+=0.4");
      if (page) {
        // opacity only: a transform on .page would re-anchor its fixed children
        tl.fromTo(
          page,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out", clearProps: "opacity" },
          "exit+=0.7",
        );
      }

      const hurry = () => tl.timeScale(3);
      window.addEventListener("pointerdown", hurry, { once: true });
      window.addEventListener("keydown", hurry, { once: true });
      return () => {
        window.removeEventListener("pointerdown", hurry);
        window.removeEventListener("keydown", hurry);
      };
    }, root);

    return () => {
      ctx.revert();
      html.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="intro" aria-hidden>
      <i className="intro-mark intro-mark-tl" />
      <i className="intro-mark intro-mark-tr" />
      <i className="intro-mark intro-mark-bl" />
      <i className="intro-mark intro-mark-br" />

      <div className="intro-meta intro-meta-top">
        <span>Folarin Folarin</span>
        <span className="intro-meta-mid">Senior Product Designer</span>
        <span>Portfolio — {new Date().getFullYear()}</span>
      </div>

      <div className="intro-foot">
        <div className="intro-ruler">
          <i className="intro-ruler-fill" />
          {Array.from({ length: 11 }, (_, i) => (
            <i key={i} className="intro-tick" style={{ left: `${i * 10}%` }} />
          ))}
        </div>
        <div className="intro-row">
          <p className="intro-count">
            {[0, 1, 2].map((slot) => (
              <span key={slot} className={`intro-slot${slot < 2 ? " is-lead" : ""}`}>
                <span className="intro-reel">
                  {DIGITS.map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </span>
              </span>
            ))}
          </p>
          <div className="intro-meta intro-meta-side">
            <span>
              Lagos, NG — <span className="intro-clock" />
            </span>
            <span>Selected work · {String(projectsCount).padStart(2, "0")} projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}
