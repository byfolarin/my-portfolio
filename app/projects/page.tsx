import type { Metadata } from "next";
import Link from "next/link";
import Clock from "../clock";
import { projects } from "./projects";

export const metadata: Metadata = {
  title: "Projects — Folarin Folarin",
  description: "Selected work across fintech, design systems, and brand.",
};

export default function Projects() {
  return (
    <div className="homepage">
      <article className="article">
        <header>
          <Link className="back-link" href="/">
            ← Folarin Folarin
          </Link>
          <h1>Projects</h1>
          <time>
            {projects.length} projects · Updated Jul 6, 2026
          </time>
        </header>
        <p>
          Selected work across fintech, design systems, and brand — the
          things I&rsquo;ve helped build and the teams I built them with.
        </p>
      </article>

      <section className="projects">
        {projects.map((project) => (
          <article key={project.slug} id={project.slug} className="project">
            <header>
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
              <span className="project-period">{project.period}</span>
            </header>
            <p className="project-role">{project.role}</p>
            <div
              className="project-media"
              style={{ "--tint": project.tint } as React.CSSProperties}
            >
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
