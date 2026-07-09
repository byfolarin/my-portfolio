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
          <time>{projects.length} projects · Updated Jul 6, 2026</time>
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
              <div className="project-chrome">
                <i />
                <i />
                <i />
                <span>{windowLabel(project.href, project.name)}</span>
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
