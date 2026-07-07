"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Track = { title: string; artist: string; art?: string; url: string };

const THUMB_H = 112; // keep in sync with .sp-thumb height
const PAD_TOP = 20;
const PAD_BOTTOM = 20;

export default function ScrollPlayer() {
  const router = useRouter();
  const pathname = usePathname();
  const [track, setTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState<{ hm: string; ampm: string } | null>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  // spotify: what's playing
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/spotify/now");
        const data = await res.json();
        if (!alive) return;
        setTrack(data?.track ?? null);
        setPlaying(data?.playing === true);
      } catch {
        if (alive) setTrack(null);
      }
    };
    load();
    const id = setInterval(load, 30_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // visitor's local time, like a system clock
  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
      setTime({
        hm: `${get("hour")}:${get("minute")}`,
        ampm: get("dayPeriod").toUpperCase(),
      });
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  // scrollbar mechanics: position the thumb, allow dragging it
  useEffect(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;

    const metrics = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const range = window.innerHeight - PAD_TOP - PAD_BOTTOM - THUMB_H;
      return { max, range };
    };

    let raf = 0;
    const position = () => {
      raf = 0;
      const { max, range } = metrics();
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      thumb.style.transform = `translateY(${PAD_TOP + p * range}px)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(position);
    };

    position();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);

    // drag to scroll; a still tap opens the music page
    let dragging = false;
    let startY = 0;
    let startScroll = 0;
    let moved = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      startY = e.clientY;
      startScroll = window.scrollY;
      moved = 0;
      thumb.setPointerCapture(e.pointerId);
      thumb.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dy = e.clientY - startY;
      moved = Math.max(moved, Math.abs(dy));
      const { max, range } = metrics();
      if (max > 0 && range > 0) {
        window.scrollTo({ top: startScroll + (dy / range) * max });
      }
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      thumb.releasePointerCapture(e.pointerId);
      thumb.style.cursor = "grab";
      if (moved < 4 && !window.location.pathname.startsWith("/music")) {
        router.push("/music");
      }
    };

    thumb.addEventListener("pointerdown", onDown);
    thumb.addEventListener("pointermove", onMove);
    thumb.addEventListener("pointerup", onUp);
    thumb.addEventListener("pointercancel", onUp);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      thumb.removeEventListener("pointerdown", onDown);
      thumb.removeEventListener("pointermove", onMove);
      thumb.removeEventListener("pointerup", onUp);
      thumb.removeEventListener("pointercancel", onUp);
    };
    // re-measure when the route (and thus page height) changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="sp-track" aria-hidden>
      <div
        ref={thumbRef}
        className="sp-thumb"
        title={track ? `${track.title} — ${track.artist}` : undefined}
      >
        <span className="sp-art" data-playing={playing || undefined}>
          {track?.art ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={track.art} alt="" draggable={false} />
          ) : (
            <svg viewBox="0 0 16 16" width="9" height="9" aria-hidden>
              <path
                d="M6 13.5a2 2 0 1 1-1.2-1.83V4.2L13 2.5v8.5a2 2 0 1 1-1.2-1.83V5.1L6 6.2z"
                fill="rgba(255,255,255,0.8)"
              />
            </svg>
          )}
        </span>
        {time && (
          <span className="sp-time">
            {time.hm}
            <em>{time.ampm}</em>
          </span>
        )}
      </div>
    </div>
  );
}
