"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "./projects";

function windowLabel(href: string | undefined, name: string) {
  if (href) {
    try {
      return new URL(href).host.replace(/^www\./, "");
    } catch {}
  }
  return `${name.toLowerCase().replace(/\s+/g, "")}.app`;
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.video) {
    return (
      <video
        src={project.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${project.name} preview`}
      />
    );
  }
  if (project.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={project.image} alt={`${project.name} preview`} />;
  }
  return <span className="pb-media-mark">{project.name}</span>;
}

export default function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let frame = 0;
    const updateActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const stageCenter = stage.getBoundingClientRect().top + stage.clientHeight / 2;
        let closest = 0;
        let distance = Infinity;

        sectionRefs.current.forEach((section, index) => {
          if (!section) return;
          const rect = section.getBoundingClientRect();
          const nextDistance = Math.abs(rect.top + rect.height / 2 - stageCenter);
          if (nextDistance < distance) {
            closest = index;
            distance = nextDistance;
          }
        });

        setActive(closest);
      });
    };

    updateActive();
    stage.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [projects.length]);

  const goTo = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="pb">
      <nav className="pb-list" aria-label="Projects">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            className="pb-item"
            data-active={i === active || undefined}
            style={{ "--tint": p.tint } as React.CSSProperties}
            onClick={() => goTo(i)}
          >
            <span>{p.name}</span>
            <span className="pb-item-period">{String(i + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </nav>

      <div className="pb-stage" ref={stageRef}>
        {projects.map((project, i) => (
          <section
            key={project.slug}
            className="pb-section"
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            style={{ "--tint": project.tint } as React.CSSProperties}
          >
            <div className="pb-frame">
              <span className="pb-bracket pb-bracket-tl" aria-hidden />
              <span className="pb-bracket pb-bracket-tr" aria-hidden />
              <span className="pb-bracket pb-bracket-bl" aria-hidden />
              <span className="pb-bracket pb-bracket-br" aria-hidden />
              <div className="pb-media">
                <ProjectMedia project={project} />
              </div>
            </div>

          </section>
        ))}
      </div>

      <aside className="pb-detail" aria-live="polite">
        <p className="pb-role">
          {projects[active].role} · {projects[active].period}
        </p>
        <p className="pb-description">{projects[active].description}</p>
        <p className="pb-topics">
          {projects[active].topics.map((topic) => `[ ${topic} ]`).join(" ")}
        </p>
        {projects[active].href && (
          <a
            className="pb-visit"
            target="_blank"
            rel="noopener noreferrer"
            href={projects[active].href}
          >
            [ VISIT {windowLabel(projects[active].href, projects[active].name).toUpperCase()} ↗ ]
          </a>
        )}
      </aside>
    </div>
  );
}
