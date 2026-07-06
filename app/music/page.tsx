import type { Metadata } from "next";
import Clock from "../clock";
import MusicClient from "./music-client";
import BackLink from "../back-link";

export const metadata: Metadata = {
  title: "Music — Folarin Folarin",
  description: "What I'm listening to, live from Spotify.",
};

export default function Music() {
  return (
    <div className="homepage">
      <article className="article">
        <header>
          <BackLink href="/" label="Folarin Folarin" />
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
