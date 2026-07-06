"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CdCanvas = dynamic(() => import("./cd-canvas"), {
  ssr: false,
  loading: () => <div className="cd-canvas" aria-hidden />,
});

type Track = {
  title: string;
  artist: string;
  album?: string;
  art?: string;
  url: string;
};

type NowState =
  | { status: "loading" }
  | { status: "unconfigured" }
  | { status: "idle" }
  | { status: "ready"; playing: boolean; track: Track };

const GRID_SIZE = 8;

export default function MusicClient() {
  const [now, setNow] = useState<NowState>({ status: "loading" });
  const [top, setTop] = useState<Track[] | null>(null);
  const [view, setView] = useState<"player" | "list">("player");
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;

    const loadNow = async () => {
      try {
        const res = await fetch("/api/spotify/now");
        const data = await res.json();
        if (!alive) return;
        if (data.configured === false) setNow({ status: "unconfigured" });
        else if (data.track)
          setNow({ status: "ready", playing: data.playing, track: data.track });
        else setNow({ status: "idle" });
      } catch {
        if (alive) setNow({ status: "idle" });
      }
    };

    const loadTop = async () => {
      try {
        const res = await fetch("/api/spotify/top");
        const data = await res.json();
        if (alive) setTop(data.tracks ?? []);
      } catch {
        if (alive) setTop([]);
      }
    };

    loadNow();
    loadTop();
    const id = setInterval(loadNow, 30_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  if (now.status === "unconfigured") {
    return (
      <p className="music-empty">
        Spotify isn&rsquo;t connected yet — check back soon.
      </p>
    );
  }

  const gridTracks = (top ?? []).slice(0, GRID_SIZE);
  const nowTrack = now.status === "ready" ? now.track : null;

  // what the CD is showing: an explicit selection, else whatever's playing
  const shown =
    selected !== null && gridTracks[selected]
      ? gridTracks[selected]
      : (nowTrack ?? gridTracks[0]);

  const shownIndex = shown
    ? gridTracks.findIndex((t) => t.url === shown.url)
    : -1;

  const spinning =
    now.status === "ready" && now.playing && shown?.url === now.track.url;

  const step = (dir: 1 | -1) => {
    if (gridTracks.length === 0) return;
    const from = shownIndex >= 0 ? shownIndex : 0;
    setSelected((from + dir + gridTracks.length) % gridTracks.length);
  };

  return (
    <div className="music-stage">
      <div className="music-viewbar">
        <button
          type="button"
          className="pill pill-ghost"
          onClick={() => setView(view === "player" ? "list" : "player")}
        >
          {view === "player" ? "View list" : "View player"}
        </button>
      </div>

      {view === "player" ? (
        <div className="player">
          {shown && (
            <a
              className="pill"
              href={shown.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden>
                <circle cx="12" cy="12" r="12" fill="#1db954" />
                <path
                  d="M6.8 9.7c3.4-1 7.7-.8 10.6 1M7.4 12.6c2.9-.85 6.4-.6 8.9.85M8 15.4c2.4-.7 5.1-.45 7.2.7"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              Open in Spotify
            </a>
          )}

          <CdCanvas art={shown?.art} spinning={spinning} />

          <div className="player-meta">
            {now.status === "loading" && !shown ? (
              <>
                <span className="music-skeleton-line" style={{ width: "5rem", margin: "0 auto" }} />
                <span className="music-skeleton-line" style={{ width: "8rem", margin: "0.5rem auto 0" }} />
              </>
            ) : shown ? (
              <>
                <p>{shown.artist}</p>
                <h2>
                  {shown.title}
                  {spinning && (
                    <span className="music-eq" aria-label="Playing">
                      <i />
                      <i />
                      <i />
                    </span>
                  )}
                </h2>
              </>
            ) : (
              <p>Nothing to show yet.</p>
            )}
          </div>

          <div className="player-controls">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous"
              disabled={gridTracks.length === 0}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
                <path d="M3.5 2.5v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M13.5 3.2v9.6L6 8z" fill="currentColor" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href={shown?.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Play in Spotify"
              className="player-play"
            >
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
                <path d="M4.5 2.8v10.4L13 8z" fill="currentColor" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next"
              disabled={gridTracks.length === 0}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
                <path d="M12.5 2.5v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2.5 3.2v9.6L10 8z" fill="currentColor" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="player-grid">
            {(top === null ? Array.from({ length: GRID_SIZE }) : gridTracks).map(
              (track, i) => {
                const t = track as Track | undefined;
                return t ? (
                  <button
                    key={t.url}
                    type="button"
                    data-active={i === shownIndex || undefined}
                    onClick={() => setSelected(i)}
                    aria-label={`${t.title} — ${t.artist}`}
                  >
                    {t.art ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.art} alt="" />
                    ) : (
                      <span />
                    )}
                  </button>
                ) : (
                  <button key={i} type="button" disabled>
                    <span className="music-art-skeleton" />
                  </button>
                );
              }
            )}
          </div>
        </div>
      ) : (
        <ListView now={now} top={top} />
      )}
    </div>
  );
}

function ListView({ now, top }: { now: NowState; top: Track[] | null }) {
  return (
    <>
      <section className="music-now">
        <h3>
          {now.status === "ready" && now.playing ? "Now playing" : "Last played"}
        </h3>
        {now.status === "ready" ? (
          <a
            className="music-now-row"
            href={now.track.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {now.track.art ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="music-art" src={now.track.art} alt="" />
            ) : (
              <div className="music-art" />
            )}
            <div className="music-titles">
              <h2>{now.track.title}</h2>
              <p>{now.track.artist}</p>
            </div>
            {now.playing && (
              <span className="music-eq" aria-label="Playing">
                <i />
                <i />
                <i />
              </span>
            )}
          </a>
        ) : (
          <p className="music-empty">
            {now.status === "loading" ? "Loading…" : "Nothing on right now."}
          </p>
        )}
      </section>

      <section className="music-top">
        <h3>On repeat</h3>
        {top === null ? (
          <p className="music-empty">Loading…</p>
        ) : top.length === 0 ? (
          <p className="music-empty">Nothing to show yet.</p>
        ) : (
          <ul className="music-list">
            {top.map((track, i) => (
              <li key={track.url}>
                <a
                  className="music-row"
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="music-index">{i + 1}</span>
                  {track.art ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="music-art-sm" src={track.art} alt="" />
                  ) : (
                    <div className="music-art-sm" />
                  )}
                  <div className="music-titles">
                    <h2>{track.title}</h2>
                    <p>{track.artist}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
