import type { Metadata } from "next";
import Clock from "../clock";
import BackLink from "../back-link";
import AskClient from "./ask-client";

export const metadata: Metadata = {
  title: "Ask — Folarin Folarin",
  description: "Ask anything about Folarin — answered by AI.",
};

export default function Ask() {
  return (
    <div className="homepage">
      <article className="article">
        <header>
          <BackLink href="/" label="Folarin Folarin" />
          <h1>Ask</h1>
          <time>Answered by AI</time>
        </header>
        <p>
          Curious about my work, my reading, or how to reach me? Ask away —
          an AI that knows this site answers instantly.
        </p>
      </article>

      <AskClient />

      <footer className="footer">
        <div className="footer-inner">
          <Clock />
        </div>
      </footer>
    </div>
  );
}
