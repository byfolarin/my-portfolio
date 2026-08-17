import type { Metadata } from "next";
import Link from "next/link";

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
    <main className="about-split">
      <article className="about-copy">
        <header className="about-hero">
          <p>About · Lagos, Nigeria</p>
          <h1>
            I design products with precision, clarity, and care for the small
            things.
          </h1>
          <div className="about-meta">
            <time>August 17, 2026</time>
            <span>Product designer</span>
          </div>
        </header>

        <div className="about-story">
          <span>001</span>
          <div>
            <p>
              I&rsquo;m Folarin — a product designer who cares about type that
              sits right, spacing that breathes, and interfaces that feel
              considered rather than assembled.
            </p>
            <p>
              Most of my work lives in fintech. At{" "}
              <a href="https://kredete.com" target="_blank" rel="noopener noreferrer">
                Kredete
              </a>
              , I lead design for a product helping Africans build credit and
              move money across borders.
            </p>
          </div>

          <span>002</span>
          <div>
            <p className="about-pullquote">
              Good design should feel inevitable once you see it.
            </p>
            <p>
              I&rsquo;ve built design systems, redesigned email programs end to
              end, shaped brands, and taken products from first sketch to
              shipped experience. You can see that work on the{" "}
              <Link href="/projects">projects page</Link>.
            </p>
          </div>

          <span>003</span>
          <div>
            <p>
              Away from the screen I&rsquo;m usually reading — design classics,
              books about building things, and a steady diet of fiction and faith.
            </p>
            <p>
              The best way to reach me is{" "}
              <a href="mailto:folarin@kredete.com">email</a>. I&rsquo;m also on{" "}
              <a href="https://github.com/byfolarin" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              .
            </p>
          </div>
        </div>

        <section className="about-experience">
          <p className="about-section-label">004 · Experience</p>
          <ul>
            {experience.map((item) => (
              <li key={item.company}>
                <strong>{item.company}</strong>
                <span>{item.role}</span>
                <time>{item.period}</time>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <aside className="about-visual" aria-label="Design statement">
        <div className="about-poster">
          <span className="about-poster-kicker">Product designer · Lagos</span>
          <p>DESIGN</p>
          <p>WITH</p>
          <p>INTENT</p>
          <span className="about-poster-sign">Folarin</span>
        </div>
        <p className="about-copyright">© 2026 Folarin Folarin.</p>
      </aside>
    </main>
  );
}
