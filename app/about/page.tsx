import type { Metadata } from "next";
import Link from "next/link";
import Clock from "../clock";
import Bento from "./bento";
import { books, slugify } from "../reading/books";
import { projects } from "../projects/projects";
import BackLink from "../back-link";

export const metadata: Metadata = {
  title: "About — Folarin Folarin",
  description: "Product designer based in Lagos, Nigeria.",
};

const experience = [
  { company: "Kredete", role: "Lead Product Designer", period: "2024 — Present" },
  { company: "Hinstantt", role: "Product Designer", period: "2025 — 2026" },
  { company: "Gravv", role: "Brand & Product Designer", period: "2026" },
  { company: "Selah", role: "Founding Designer", period: "2025" },
];

export default function About() {
  return (
    <div className="homepage">
      <article className="article">
        <header>
          <BackLink href="/" label="Folarin Folarin" />
          <h1>About</h1>
          <time>Lagos, Nigeria</time>
        </header>
        <p>
          I&rsquo;m Folarin — a product designer who cares about the small
          things: type that sits right, spacing that breathes, interfaces
          that feel considered rather than assembled.
        </p>
        <p>
          Most of my work lives in fintech. At{" "}
          <a
            className="basic-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://kredete.com"
          >
            Kredete
          </a>{" "}
          I lead design for a product helping Africans build credit and move
          money across borders. Before and alongside that, I&rsquo;ve built
          design systems, redesigned email programs end to end, shaped
          brands, and designed products from first sketch to shipped — you
          can see the highlights on the{" "}
          <Link className="basic-link" href="/projects">
            projects
          </Link>{" "}
          page.
        </p>
        <p>
          Away from the screen I&rsquo;m usually{" "}
          <Link className="basic-link" href="/reading">
            reading
          </Link>{" "}
          — design classics, books about building things, and a steady diet
          of fiction and faith.
        </p>
        <p>
          The best way to reach me is{" "}
          <a className="basic-link" href="mailto:folarin@kredete.com">
            email
          </a>
          . I&rsquo;m also on{" "}
          <a
            className="basic-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/byfolarin"
          >
            GitHub
          </a>
          .
        </p>
      </article>

      <Bento
        bookTitle={books[0].title}
        bookAuthor={books[0].author}
        bookSlug={slugify(books[0].title)}
        bookCount={books.length}
        projectCount={projects.length}
      />

      <section className="experience">
        <h3>Experience</h3>
        <ul>
          {experience.map((item) => (
            <li key={item.company}>
              <span className="experience-company">{item.company}</span>
              <span className="experience-role">{item.role}</span>
              <span className="experience-period">{item.period}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <Clock />
        </div>
      </footer>
    </div>
  );
}
