"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Track = { title: string; artist: string; art?: string; url: string };
type State = { playing: boolean; track: Track } | null;

export default function NowPlayingWidget() {
  const pathname = usePathname();
  const [state, setState] = useState<State>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/spotify/now");
        const data = await res.json();
        if (!alive) return;
        setState(data?.track ? { playing: data.playing, track: data.track } : null);
      } catch {
        if (alive) setState(null);
      }
    };
    load();
    const id = setInterval(load, 30_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // the music page already is the widget, writ large
  if (pathname.startsWith("/music") || !state) return null;

  return (
    <Link
      className="np-widget"
      href="/music"
      aria-label={`${state.playing ? "Now playing" : "Last played"}: ${state.track.title} by ${state.track.artist}`}
    >
      {state.track.art ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={state.track.art} alt="" />
      ) : (
        <span className="np-widget-art" />
      )}
      <span className="np-widget-title">{state.track.title}</span>
      {state.playing ? (
        <span className="music-eq np-widget-eq" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      ) : (
        <svg
          className="np-widget-note"
          viewBox="0 0 16 16"
          width="11"
          height="11"
          aria-hidden
        >
          <path
            d="M6 13.5a2 2 0 1 1-1.2-1.83V4.2L13 2.5v8.5a2 2 0 1 1-1.2-1.83V5.1L6 6.2z"
            fill="currentColor"
          />
        </svg>
      )}
    </Link>
  );
}
