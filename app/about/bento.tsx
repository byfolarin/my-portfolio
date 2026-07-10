"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Track = { title: string; artist: string; art?: string; url: string };

export default function Bento({
  bookTitle,
  bookAuthor,
  bookSlug,
  bookCount,
  projectCount,
}: {
  bookTitle: string;
  bookAuthor: string;
  bookSlug: string;
  bookCount: number;
  projectCount: number;
}) {
  const [track, setTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [angles, setAngles] = useState<{ h: number; m: number; s: number } | null>(
    null
  );

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/spotify/now");
        const data = await res.json();
        if (!alive) return;
        setTrack(data?.track ?? null);
        setPlaying(data?.playing === true);
      } catch {}
    };
    load();
    const id = setInterval(load, 30_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // analog clock on Lagos time
  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZone: "Africa/Lagos",
      }).formatToParts(new Date());
      const get = (t: string) =>
        Number(parts.find((p) => p.type === t)?.value ?? 0);
      const h = get("hour") % 12;
      const m = get("minute");
      const s = get("second");
      setAngles({
        h: h * 30 + m * 0.5,
        m: m * 6 + s * 0.1,
        s: s * 6,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bento">
      <div className="bento-tile bento-clock-tile">
        <span className="bento-label">Lagos, Nigeria</span>
        <div className="bento-clock" aria-hidden>
          <i className="bento-tick" />
          <i className="bento-tick" />
          <i className="bento-tick" />
          <i className="bento-tick" />
          {angles && (
            <>
              <span
                className="bento-hand bento-hand-h"
                style={{ transform: `rotate(${angles.h}deg)` }}
              />
              <span
                className="bento-hand bento-hand-m"
                style={{ transform: `rotate(${angles.m}deg)` }}
              />
              <span
                className="bento-hand bento-hand-s"
                style={{ transform: `rotate(${angles.s}deg)` }}
              />
            </>
          )}
          <span className="bento-pin" />
        </div>
        <span className="bento-caption">WAT · home time</span>
      </div>

      <Link href="/music" className="bento-tile bento-music-tile">
        <span className="bento-label">
          {playing ? "Now playing" : "Last played"}
        </span>
        {track ? (
          <div className="bento-music">
            {track.art ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={track.art} alt="" data-playing={playing || undefined} />
            ) : (
              <span className="bento-noart" />
            )}
            <div className="bento-music-meta">
              <strong>{track.title}</strong>
              <span>{track.artist}</span>
            </div>
          </div>
        ) : (
          <p className="bento-caption">Quiet at the moment.</p>
        )}
        {playing && (
          <span className="music-eq bento-eq" aria-hidden>
            <i />
            <i />
            <i />
          </span>
        )}
      </Link>

      <Link href={`/reading/${bookSlug}`} className="bento-tile bento-book-tile">
        <span className="bento-label">On the nightstand</span>
        <div className="bento-book">
          <span className="bento-book-cover" aria-hidden>
            <em>{bookTitle}</em>
          </span>
          <div className="bento-book-meta">
            <strong>{bookTitle}</strong>
            <span>
              {bookAuthor} · book 1 of {bookCount} this shelf
            </span>
          </div>
        </div>
      </Link>

      <div className="bento-tile bento-stats-tile">
        <div className="bento-stat">
          <strong>{bookCount}</strong>
          <span>books shelved</span>
        </div>
        <div className="bento-stat">
          <strong>{projectCount}</strong>
          <span>projects shipped</span>
        </div>
        <div className="bento-stat">
          <strong>127</strong>
          <span>emails redesigned</span>
        </div>
      </div>
    </section>
  );
}
