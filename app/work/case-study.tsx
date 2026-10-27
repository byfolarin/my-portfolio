"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Project } from "../projects/projects";
import { ProjectMedia } from "../projects/showcase";

type Shot = { src: string; label: string };

function lagosTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

function Clock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () => setTime(lagosTime());
    const first = requestAnimationFrame(tick);
    const timer = window.setInterval(tick, 15000);
    return () => {
      cancelAnimationFrame(first);
      window.clearInterval(timer);
    };
  }, []);
  return <span className="cs-clock">{time} WAT</span>;
}

// one rounded tile: a screenshot inset on the project's gradient, or an
// empty tinted tile until real imagery exists
function Tile({ shot, name, wide }: { shot?: Shot; name: string; wide?: boolean }) {
  return (
    <figure className="cs-tile" data-wide={wide || undefined}>
      {shot ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={shot.src} alt={shot.label} loading="lazy" />
      ) : (
        <span className="cs-tile-mark">{name}</span>
      )}
      <figcaption>{shot ? shot.label : "Image to come"}</figcaption>
    </figure>
  );
}

export default function CaseStudy({ project, next }: { project: Project; next: Project }) {
  const sections = project.sections ?? [{ label: "Overview", body: project.description }];
  const gallery = project.gallery ?? [];
  const [current, setCurrent] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  // the sidebar dot marks the last section whose heading has passed 40% of the screen
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let index = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < line) index = i;
      });
      setCurrent(index);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // spread the screens through the story: a pair, then a wide one, then a pair…
  const blocks: Shot[][] = [];
  for (let i = 0; i < gallery.length; ) {
    const take = blocks.length % 2 === 0 ? 2 : 1;
    blocks.push(gallery.slice(i, i + take));
    i += take;
  }
  if (blocks.length === 0) blocks.push([]);

  const meta = `${project.industry} · ${project.period}`;
  const goTo = (index: number) =>
    refs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="cs" style={{ "--tint": project.tint } as React.CSSProperties}>
      <aside className="cs-side">
        <nav className="cs-crumb" aria-label="Breadcrumb">
          <Link href="/" className="cs-logo" aria-label="Home">
            FF
          </Link>
          <Link href="/#work">Work</Link>
          <span>{project.name}</span>
        </nav>

        <header className="cs-title">
          <h1>{project.name}</h1>
          {project.tagline && <p>{project.tagline}</p>}
          <span className="cs-meta">{meta}</span>
        </header>

        <ol className="cs-index">
          {sections.map((section, i) => (
            <li key={section.label} data-current={i === current || undefined}>
              <button type="button" onClick={() => goTo(i)}>
                {section.label}
              </button>
            </li>
          ))}
        </ol>

        <div className="cs-card">
          <span>Role</span>
          <p>{project.role}</p>
          {project.metric && (
            <>
              <span>Headline</span>
              <p>{project.metric}</p>
            </>
          )}
          {project.href && (
            <a href={project.href} target="_blank" rel="noopener noreferrer">
              Visit live site ↗
            </a>
          )}
        </div>
      </aside>

      <main className="cs-main">
        <Link href="/#work" className="cs-back" aria-label="Back to all work">
          ←
        </Link>

        <figure className="cs-hero">
          <ProjectMedia project={project} />
          <Clock />
        </figure>

        {/* phones: the sidebar's title block sits under the hero instead */}
        <header className="cs-title cs-title-inline">
          <h1>{project.name}</h1>
          {project.tagline && <p>{project.tagline}</p>}
          <span className="cs-meta">{meta}</span>
        </header>

        {sections.map((section, i) => (
          <div key={section.label}>
            <section
              className="cs-section"
              ref={(el) => {
                refs.current[i] = el;
              }}
            >
              {section.title ? (
                <h2 className="cs-lead">{section.title}</h2>
              ) : (
                <h2 className="cs-label">{section.label}</h2>
              )}
              <p>{section.body}</p>
            </section>

            {blocks[i] && i < sections.length - 1 && (
              <div className="cs-mosaic" data-count={Math.max(blocks[i].length, 1)}>
                {blocks[i].length > 0 ? (
                  blocks[i].map((shot) => (
                    <Tile key={shot.src} shot={shot} name={project.name} wide={blocks[i].length === 1} />
                  ))
                ) : (
                  <>
                    <Tile name={project.name} />
                    <Tile name={project.name} />
                  </>
                )}
              </div>
            )}
          </div>
        ))}

        <Link href={`/work/${next.slug}`} className="cs-next">
          <span className="cs-label">Next up</span>
          <span className="cs-next-name">
            {next.name}
            <span>{next.tagline ?? next.summary}</span>
          </span>
          <span className="cs-next-arrow" aria-hidden>
            →
          </span>
        </Link>

        <footer className="cs-cta">
          <div>
            <p>Want to discuss a project?</p>
            <p>I&rsquo;d love to hear about your product and how I can help.</p>
          </div>
          <div className="cs-cta-links">
            <a href="mailto:hello@folarin.design">Get in touch →</a>
            <Link href="/#work">[ View all projects ]</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
