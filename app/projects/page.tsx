import type { Metadata } from "next";
import Clock from "../clock";
import { projects } from "./projects";
import BackLink from "../back-link";

export const metadata: Metadata = {
  title: "Projects — Folarin Folarin",
  description: "Selected work across fintech, design systems, and brand.",
};

function windowLabel(href: string | undefined, name: string) {
  if (href) {
    try {
      return new URL(href).host.replace(/^www\./, "");
    } catch {}
  }
  return `${name.toLowerCase().replace(/\s+/g, "")}.app`;
}

export default function Projects() {
  return (
    <div className="homepage">
      <article className="article">
        <header>
          <BackLink href="/" label="Folarin Folarin" />
          <h1>Projects</h1>
          <time>{projects.length} projects · Updated Aug 2, 2026</time>
        </header>
        <p>
          Selected work across fintech, design systems, and brand — the
          things I&rsquo;ve helped build and the teams I built them with.
        </p>
      </article>

      <section className="projects">
        {projects.map((project, i) => (
          <article key={project.slug} id={project.slug} className="project">
            <header className="project-head">
              <span className="project-index" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="project-title">
                {project.href ? (
                  <a
                    className="project-name"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.href}
                  >
                    {project.name} ↗
                  </a>
                ) : (
                  <span className="project-name">{project.name}</span>
                )}
                <p className="project-role">{project.role}</p>
              </div>
              <span className="project-period">{project.period}</span>
            </header>

            <div
              className="project-window"
              style={{ "--tint": project.tint } as React.CSSProperties}
            >
              <div className="project-media-card">
                <div className="project-media-titlebar" aria-hidden>
                  <span className="project-media-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="project-media-title">{project.name}</span>
                </div>
                <div className="project-media">
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={`${project.name} preview`}
                    />
                  ) : project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.image} alt={`${project.name} preview`} />
                  ) : (
                    <span className="project-media-mark">{project.name}</span>
                  )}
                </div>
              </div>

              <div className="project-info-card">
                <div className="project-topics">
                  <span className="project-topics-label">Topics</span>
                  {project.topics.map((topic) => (
                    <span key={topic} className="project-tag">
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="project-chrome">
                  <span className="project-chrome-btn" aria-hidden>
                    <svg viewBox="0 0 16 16" width="9" height="9" aria-hidden>
                      <path
                        d="M10 2.5 4.5 8l5.5 5.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="project-chrome-domain">
                    <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden>
                      <rect
                        x="2.5"
                        y="3.5"
                        width="11"
                        height="4.5"
                        rx="1.2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M4.5 11.5h7"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    {windowLabel(project.href, project.name)}
                  </span>
                  <span className="project-chrome-btn" aria-hidden>
                    <svg viewBox="0 0 16 16" width="10" height="10" aria-hidden>
                      <path
                        d="M13 8A5 5 0 1 1 11.4 4.3M13 2v3.2h-3.2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    className="project-chrome-btn project-chrome-more"
                    aria-hidden
                  >
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              </div>
            </div>

            <p className="project-description">{project.description}</p>
          </article>
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
