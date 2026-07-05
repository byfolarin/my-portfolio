import type { Metadata } from "next";
import Link from "next/link";
import Clock from "../clock";

export const metadata: Metadata = {
  title: "Writings — Folarin Folarin",
  description: "Notes on design, craft, and building things.",
};

export default function Writing() {
  return (
    <div className="homepage">
      <article className="article">
        <header>
          <Link className="back-link" href="/">
            ← Folarin Folarin
          </Link>
          <h1>Writings</h1>
          <time>Coming soon</time>
        </header>
        <p>
          Notes on design, craft, and building things — I&rsquo;m still
          writing the first one. In the meantime, see what I&rsquo;m{" "}
          <Link className="basic-link" href="/reading">
            reading
          </Link>
          .
        </p>
      </article>

      <footer className="footer">
        <div className="footer-inner">
          <Clock />
        </div>
      </footer>
    </div>
  );
}
