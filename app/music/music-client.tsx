"use client";

import { useEffect, useState } from "react";

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

export default function MusicClient() {
  const [now, setNow] = useState<NowState>({ status: "loading" });
  const [top, setTop] = useState<Track[] | null>(null);

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

  return (
    <>
      <section className="music-now">
        <h3>{now.status === "ready" && now.playing ? "Now playing" : "Last played"}</h3>
        {now.status === "loading" ? (
          <div className="music-now-row">
            <div className="music-art music-art-skeleton" />
            <div className="music-titles">
              <span className="music-skeleton-line" style={{ width: "9rem" }} />
              <span className="music-skeleton-line" style={{ width: "6rem" }} />
            </div>
          </div>
        ) : now.status === "ready" ? (
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
          <p className="music-empty">Nothing on right now.</p>
        )}
      </section>

      <section className="music-top">
        <h3>On repeat</h3>
        {top === null ? (
          <ul className="music-list">
            {Array.from({ length: 5 }, (_, i) => (
              <li key={i} className="music-row">
                <span className="music-index">{i + 1}</span>
                <div className="music-art-sm music-art-skeleton" />
                <div className="music-titles">
                  <span
                    className="music-skeleton-line"
                    style={{ width: `${8 + (i % 3) * 2}rem` }}
                  />
                </div>
              </li>
            ))}
          </ul>
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
