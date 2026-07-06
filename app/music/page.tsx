import type { Metadata } from "next";
import Link from "next/link";
import Clock from "../clock";
import MusicClient from "./music-client";

export const metadata: Metadata = {
  title: "Music — Folarin Folarin",
  description: "What I'm listening to, live from Spotify.",
};

export default function Music() {
  return (
    <div className="homepage">
      <article className="article">
        <header>
          <Link className="back-link" href="/">
            ← Folarin Folarin
          </Link>
          <h1>Music</h1>
          <time>Live from Spotify</time>
        </header>
        <p>
          What&rsquo;s in my ears while I work — playing now, and the songs
          I can&rsquo;t leave alone lately.
        </p>
      </article>

      <MusicClient />

      <footer className="footer">
        <div className="footer-inner">
          <Clock />
        </div>
      </footer>
    </div>
  );
}
