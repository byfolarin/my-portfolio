import type { Metadata } from "next";
import Clock from "../clock";
import { books } from "./books";
import ReadingGrid from "./grid";
import BackLink from "../back-link";

export const metadata: Metadata = {
  title: "Reading — Folarin Folarin",
  description: "Books I'm reading, and re-reading.",
};

export default function Reading() {
  return (
    <div className="homepage">
      <article className="article">
        <header>
          <BackLink href="/" label="Folarin Folarin" />
          <h1>Reading</h1>
          <time>
            {books.length} books · Updated Jul 4, 2026
          </time>
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
