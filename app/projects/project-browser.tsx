"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project } from "./projects";
import { ClosingReveal, LagosClock, Reveal, ShowcaseStrip } from "./showcase";

export default function ProjectBrowser({ projects }: { projects: Project[] }) {
  const router = useRouter();
  // each project has its own case study page
  const openProject = (index: number) => router.push(`/work/${projects[index].slug}`);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="aw" id="top">
      <div className="aw-columns" aria-hidden>
        {Array.from({ length: 12 }, (_, k) => (
          <i key={k} />
        ))}
      </div>
      <section className="aw-hero">
        {/* phones hide the top nav, so its name / role / location live here */}
        <div className="aw-mobile-info">
          <p>Folarin Folarin</p>
          <p>
            Design Director
            <br />
            at Kredete
          </p>
          <p>
            Based in Lagos
            <br />
            Nigeria
          </p>
        </div>

        <h1 className="aw-display">
          <Reveal text="Senior Product" />
          <span className="aw-display-row">
            <Reveal text="Designer" delay={0.2} />
            <span className="aw-display-alt">
              <Reveal text="Front-end" delay={0.45} />
              <Reveal text="engineer" delay={0.55} />
            </span>
          </span>
        </h1>

        <div className="aw-grid aw-intro">
          <span className="aw-num">01/</span>
          <div className="aw-intro-body">
            <p className="aw-lede">
              I shape products, systems, and brands with clarity from first
              idea to final detail.
            </p>
            <div className="aw-ctas">
              <a className="aw-btn aw-btn-solid" href="#work">
                <RollLabel>View selected work</RollLabel>
              </a>
              <Link className="aw-btn" href="/about">
                <RollLabel>About me</RollLabel>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="aw-work" id="work" aria-label="Selected work">
        <header className="aw-grid aw-section-head">
          <span className="aw-num">02/</span>
          <span>
            Selected
            <br />
            work
          </span>
          <span>
            {pad(projects.length)} products,
            <br />
            systems &amp; brands
          </span>
        </header>

        {projects.map((project, i) => (
          <article
            key={project.slug}
            className="aw-project"
            style={{ "--tint": project.tint } as React.CSSProperties}
          >
            <div className="aw-grid aw-headline">
              <h2 className="aw-name">
                <Reveal text={project.name} />
                {project.metric && <span className="aw-metric">({project.metric})</span>}
              </h2>
              <p className="aw-blurb">{project.summary}</p>
            </div>

            <ShowcaseStrip project={project} index={i} onOpen={() => openProject(i)} />

            <div className="aw-row">
              <div className="aw-title">
                <p className="aw-num">
                  {pad(i + 1)}/{pad(projects.length)}
                </p>
              </div>
              <p className="aw-desc">{project.description}</p>
              <div className="aw-side">
                <div className="aw-links">
                  <button type="button" className="aw-link" onClick={() => openProject(i)}>
                    Case study →
                  </button>
                  {project.href && (
                    <a
                      className="aw-link"
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live site ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <ClosingReveal>
        <div className="aw-grid aw-section-head">
          <span className="aw-num">03/</span>
          <span>
            Want to work
            <br />
            together?
          </span>
          <span>
            Send me
            <br />a message
          </span>
        </div>

        <a className="aw-mail" href="mailto:hello@folarin.design">
          <Reveal text="Hello@" />
          <Reveal text="folarin.design" delay={0.15} />
        </a>

        <div className="aw-ctas">
          <Link className="aw-btn aw-btn-solid" href="/cv">
            <RollLabel>View CV</RollLabel>
          </Link>
          <Link className="aw-btn" href="/about">
            <RollLabel>About me</RollLabel>
          </Link>
        </div>

        <footer className="aw-grid aw-foot">
          <span>
            Folarin Folarin
            <br />
            Product designer
          </span>
          <LagosClock />
          <a href="https://github.com/byfolarin" target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a href="#top">Back to top ↑</a>
        </footer>
      </ClosingReveal>

    </div>
  );
}

// button label that rolls up to a second copy on hover
function RollLabel({ children }: { children: string }) {
  return (
    <span className="aw-roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}
