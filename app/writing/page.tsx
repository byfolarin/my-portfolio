import type { Metadata } from "next";
import Link from "next/link";
import Clock from "../clock";
import BackLink from "../back-link";
import { writings } from "./writings";

export const metadata: Metadata = {
  title: "Writings — Folarin Folarin",
  description: "Essays on design, craft, and building things — bound and shelved.",
};

export default function Writing() {
  return (
    <div className="homepage">
      <article className="article">
        <header>
          <BackLink href="/" label="Folarin Folarin" />
          <h1>Writings</h1>
          <time>{writings.length} essays · bound &amp; shelved</time>
        </header>
        <p>
          Essays on design, craft, and building things. Each one is bound
          like a little book — pull one off the shelf.
        </p>
      </article>

      <section className="shelf-section">
        <div className="shelf">
          {writings.map((w, i) => (
            <Link
              key={w.slug}
              href={`/writing/${w.slug}`}
              className="spine"
              style={
                {
                  "--spine-bg": w.spine.bg,
                  "--spine-fg": w.spine.fg,
                  height: `${w.height}rem`,
                  width: `${w.thick}rem`,
                  animationDelay: `${i * 0.07}s`,
                } as React.CSSProperties
              }
            >
              <span className="spine-title">{w.title}</span>
              <span className="spine-year">{w.date.slice(-2)}</span>
            </Link>
          ))}
          <span className="spine spine-ghost" aria-hidden>
            <span className="spine-title">more soon</span>
          </span>
        </div>
        <div className="shelf-board" />
      </section>

      <section className="writing-list">
        {writings.map((w, i) => (
          <Link key={w.slug} href={`/writing/${w.slug}`} className="writing-row">
            <div className="writing-row-main">
              <h2>{w.title}</h2>
              <p>{w.excerpt}</p>
            </div>
            <time>
              {w.date} · {w.minutes} min
            </time>
          </Link>
        ))}
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <Clock />
        </div>
      </footer>
    </div>
  );
}
