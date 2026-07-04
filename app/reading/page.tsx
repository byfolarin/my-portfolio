import type { Metadata } from "next";
import Link from "next/link";
import Clock from "../clock";
import ReadingGrid from "./grid";

export const metadata: Metadata = {
  title: "Reading — Folarin Folarin",
  description: "Books I'm reading, and re-reading.",
};

export default function Reading() {
  return (
    <div className="homepage">
      <article className="article">
        <header>
          <Link className="back-link" href="/">
            ← Folarin Folarin
          </Link>
          <h1>Reading</h1>
          <time>Updated Jul 4, 2026</time>
        </header>
        <p>
          Books I&rsquo;m reading, re-reading, or can&rsquo;t stop thinking
          about — on design, building products, and everything in between.
        </p>
      </article>

      <section className="books">
        <ReadingGrid />
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <Clock />
        </div>
      </footer>
    </div>
  );
}
