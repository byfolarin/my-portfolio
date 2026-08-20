"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
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

function MetricCharts() {
  return (
    <div className="metric-charts">
      <figure className="metric-chart metric-chart-wide">
        <figcaption>
          <span>01 · Trend</span>
          <strong>Activation over time</strong>
          <small>Illustrative data · replace with verified values</small>
          <p>
            Track whether more users reach the product&rsquo;s first meaningful
            value moment after the redesigned journey is introduced.
          </p>
        </figcaption>
        <svg viewBox="0 0 760 260" role="img" aria-label="Placeholder activation line chart">
          <g className="metric-grid">
            <path d="M40 35H730M40 95H730M40 155H730M40 215H730" />
            <path d="M40 25V225M178 25V225M316 25V225M454 25V225M592 25V225M730 25V225" />
          </g>
          <path className="metric-area" d="M40 195C110 190 124 158 178 166S270 137 316 145 404 108 454 115 545 68 592 83 678 44 730 52V225H40Z" />
          <path className="metric-line" d="M40 195C110 190 124 158 178 166S270 137 316 145 404 108 454 115 545 68 592 83 678 44 730 52" />
          <g className="metric-points">
            <circle cx="40" cy="195" r="4" /><circle cx="178" cy="166" r="4" />
            <circle cx="316" cy="145" r="4" /><circle cx="454" cy="115" r="4" />
            <circle cx="592" cy="83" r="4" /><circle cx="730" cy="52" r="4" />
          </g>
        </svg>
      </figure>

      <figure className="metric-chart">
        <figcaption>
          <span>02 · Funnel</span>
          <strong>Journey completion</strong>
          <small>Entry → value moment</small>
          <p>
            Identify where users lose momentum across the core flow and which
            step creates the strongest opportunity for improvement.
          </p>
        </figcaption>
        <div className="metric-funnel" aria-label="Placeholder journey funnel">
          {[100, 82, 64, 51].map((width, index) => (
            <div key={width} style={{ width: `${width}%` }}>
              <span>0{index + 1}</span><i />
            </div>
          ))}
        </div>
      </figure>

      <figure className="metric-chart metric-chart-radial">
        <figcaption>
          <span>03 · Goal</span>
          <strong>Quality signal</strong>
          <small>Current against target</small>
          <p>
            Compare the current experience against an agreed quality threshold
            covering confidence, usability, or successful completion.
          </p>
        </figcaption>
        <svg viewBox="0 0 260 260" role="img" aria-label="Placeholder radial goal chart">
          <circle className="metric-ring-base" cx="130" cy="130" r="88" />
          <circle className="metric-ring-value" cx="130" cy="130" r="88" pathLength="100" />
          <path className="metric-ring-target" d="M130 31V48" />
          <text x="130" y="124" textAnchor="middle">—</text>
          <text className="metric-ring-label" x="130" y="150" textAnchor="middle">TARGET</text>
        </svg>
      </figure>

      <figure className="metric-chart">
        <figcaption>
          <span>04 · Distribution</span>
          <strong>Time on task</strong>
          <small>Before and after comparison</small>
          <p>
            Look beyond the average to understand whether the redesign reduces
            effort consistently across both fast and struggling users.
          </p>
        </figcaption>
        <svg viewBox="0 0 360 235" role="img" aria-label="Placeholder task-time distribution chart">
          <g className="metric-grid"><path d="M25 195H340M25 40V195" /></g>
          <path className="metric-distribution-a" d="M30 193C74 191 84 161 111 126S161 69 194 107 232 179 337 193" />
          <path className="metric-distribution-b" d="M30 193C115 191 136 166 160 129S201 71 228 120 267 184 337 193" />
          <circle className="metric-point-a" cx="151" cy="83" r="4" />
          <circle className="metric-point-b" cx="215" cy="94" r="4" />
        </svg>
      </figure>

      <figure className="metric-chart">
        <figcaption>
          <span>05 · Cohort</span>
          <strong>Repeat behavior</strong>
          <small>Relative strength by period</small>
          <p>
            Follow returning behavior by cohort to separate a short-term launch
            effect from sustained product value.
          </p>
        </figcaption>
        <div className="metric-heatmap" aria-label="Placeholder cohort heatmap">
          {[92,75,61,48,35,88,72,58,44,31,82,68,54,40,27,77,63,49,36,23].map((value, index) => (
            <i key={index} style={{ "--heat": `${value}%` } as React.CSSProperties} />
          ))}
        </div>
      </figure>

      <figure className="metric-chart metric-chart-wide">
        <figcaption>
          <span>06 · Comparison</span>
          <strong>Product health signals</strong>
          <small>Baseline and current period</small>
          <p>
            Review outcome and guardrail measures together so improvement in one
            area does not hide added friction elsewhere.
          </p>
        </figcaption>
        <div className="metric-bars" aria-label="Placeholder product-health comparison chart">
          {["Activation", "Completion", "Trust", "Repeat use"].map((label, index) => (
            <div key={label}>
              <span>{label}</span>
              <div><i style={{ width: `${[42,58,65,35][index]}%` }} /><b style={{ width: `${[71,83,79,62][index]}%` }} /></div>
            </div>
          ))}
        </div>
      </figure>
    </div>
  );
}

export default function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const [detailTab, setDetailTab] = useState<"case-study" | "metrics">(
    "case-study",
  );
  const [caseProgress, setCaseProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const focusRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);

  // below this width the overview drops the nested scroll-snap carousel
  // for plain stacked cards — keep in sync with the CSS breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1051px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    activeRef.current = active;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const detail = detailRef.current;

    if (detail) {
      gsap.fromTo(
        detail.children,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.045,
          ease: "power3.out",
          overwrite: true,
        },
      );
    }
  }, [active]);

  useEffect(() => {
    if (!focused) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFocused(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const focus = focusRef.current;
    if (
      focus &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.fromTo(
        focus.children,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.07,
          ease: "power3.out",
        },
      );
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, focused]);

  useEffect(() => {
    if (!focused) return;
    const page = focusRef.current;
    if (!page) return;

    const updateProgress = () => {
      const distance = page.scrollHeight - page.clientHeight;
      setCaseProgress(distance > 0 ? page.scrollTop / distance : 0);
    };

    updateProgress();
    page.addEventListener("scroll", updateProgress, { passive: true });
    return () => page.removeEventListener("scroll", updateProgress);
  }, [detailTab, focused]);

  useEffect(() => {
    if (focused || !isDesktop) return;

    const stage = stageRef.current;
    if (!stage) return;
    let frame = 0;

    const selectedSection = sectionRefs.current[activeRef.current];
    if (selectedSection) {
      stage.scrollTop =
        selectedSection.offsetTop -
        (stage.clientHeight - selectedSection.offsetHeight) / 2;
    }

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
  }, [focused, isDesktop, projects.length]);

  const goTo = useCallback((index: number) => {
    const stage = stageRef.current;
    const section = sectionRefs.current[index];
    if (!stage || !section) return;

    const target =
      section.offsetTop - (stage.clientHeight - section.offsetHeight) / 2;

    activeRef.current = index;
    setActive(index);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.scrollTop = target;
      return;
    }

    gsap.killTweensOf(stage);
    stage.style.scrollSnapType = "none";
    gsap.to(stage, {
      scrollTop: target,
      duration: 0.62,
      ease: "power3.inOut",
      overwrite: "auto",
      onComplete: () => {
        stage.style.scrollSnapType = "";
      },
    });
  }, []);

  useEffect(() => {
    if (focused || !isDesktop) return;

    const stage = stageRef.current;
    const list = listRef.current;
    if (!stage || !list) return;

    let wheelTotal = 0;
    let lastMove = 0;
    let resetTimer = 0;

    const onWheel = (event: WheelEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      event.preventDefault();
      wheelTotal += event.deltaY;
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        wheelTotal = 0;
      }, 140);

      const now = performance.now();
      if (now - lastMove < 260 || Math.abs(wheelTotal) < 6) return;

      const direction = wheelTotal > 0 ? 1 : -1;
      const next = Math.max(
        0,
        Math.min(projects.length - 1, activeRef.current + direction),
      );

      wheelTotal = 0;
      if (next === activeRef.current) return;

      lastMove = now;
      goTo(next);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    list.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.clearTimeout(resetTimer);
      gsap.killTweensOf(stage);
      stage.style.scrollSnapType = "";
      stage.removeEventListener("wheel", onWheel);
      list.removeEventListener("wheel", onWheel);
    };
  }, [focused, goTo, isDesktop, projects.length]);

  const openProject = (index: number) => {
    activeRef.current = index;
    setActive(index);
    setDetailTab("case-study");
    setCaseProgress(0);
    if (focusRef.current) focusRef.current.scrollTop = 0;
    setFocused(true);
  };

  if (focused) {
    const project = projects[active];
    const progressSteps = 16;

    const seekCaseStudy = (step: number) => {
      const page = focusRef.current;
      if (!page) return;
      const target =
        (step / (progressSteps - 1)) * (page.scrollHeight - page.clientHeight);
      gsap.to(page, {
        scrollTop: target,
        duration: 0.7,
        ease: "power3.inOut",
        overwrite: true,
      });
    };

    return (
      <div className="pb pb-focused" data-focused>
        <nav className="pb-list" aria-label="Projects">
          {projects.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              className="pb-item"
              data-active={index === active || undefined}
              style={{ "--tint": item.tint } as React.CSSProperties}
              onClick={() => openProject(index)}
            >
              <span>{item.name}</span>
              <span className="pb-item-period">
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </nav>

        <div className="pb-case-progress" aria-label="Case study progress">
          {Array.from({ length: progressSteps }, (_, index) => (
            <button
              key={index}
              type="button"
              data-passed={
                index / (progressSteps - 1) <= caseProgress || undefined
              }
              data-current={
                Math.round(caseProgress * (progressSteps - 1)) === index ||
                undefined
              }
              onClick={() => seekCaseStudy(index)}
              aria-label={`Go to ${Math.round((index / (progressSteps - 1)) * 100)}%`}
            />
          ))}
        </div>

        <article
          className="pb-case"
          ref={focusRef}
          style={{ "--tint": project.tint } as React.CSSProperties}
        >
          <div className="pb-case-toolbar">
            <div className="pb-case-tabs" aria-label="Project detail sections">
              <button
                type="button"
                data-active={detailTab === "case-study" || undefined}
                onClick={() => setDetailTab("case-study")}
              >
                Case study
              </button>
              <button
                type="button"
                data-active={detailTab === "metrics" || undefined}
                onClick={() => setDetailTab("metrics")}
              >
                Metrics
              </button>
            </div>
            <button
              type="button"
              className="pb-case-back"
              onClick={() => setFocused(false)}
            >
              [ ALL PROJECTS ]
            </button>
          </div>

          <div className="pb-case-media">
            <ProjectMedia project={project} />
          </div>

          <div className="pb-case-copy">
            <p className="pb-role">
              {project.role} · {project.period}
            </p>
            <h2>{project.name}</h2>
            <p className="pb-description">{project.description}</p>
            <p className="pb-topics">
              {project.topics.map((topic) => `[ ${topic} ]`).join(" ")}
            </p>
            {project.href && (
              <a
                className="pb-visit"
                target="_blank"
                rel="noopener noreferrer"
                href={project.href}
              >
                [ VISIT {windowLabel(project.href, project.name).toUpperCase()} ↗ ]
              </a>
            )}
          </div>

          <div
            className="pb-case-content"
            data-hidden={detailTab !== "case-study" || undefined}
          >
            <section className="pb-case-section">
              <span>01 · Context and mandate</span>
              <h3>Turning product complexity into a clear direction</h3>
              <p>
                {project.name} began with a broad product opportunity and a set
                of competing user, business, and technical needs. This section
                will establish why the work mattered, the product context, and
                the decisions I was responsible for shaping as design lead.
              </p>
            </section>

            <div className="pb-case-facts">
              <div>
                <span>My role</span>
                <strong>{project.role}</strong>
              </div>
              <div>
                <span>Scope</span>
                <strong>Strategy to delivery</strong>
              </div>
              <div>
                <span>Partners</span>
                <strong>Product · Engineering · Operations</strong>
              </div>
              <div>
                <span>Timeline</span>
                <strong>{project.period}</strong>
              </div>
            </div>

            <div className="pb-case-gallery" aria-label="Project image placeholders">
              <div className="pb-case-placeholder">Project image 01</div>
              <div className="pb-case-placeholder">Project image 02</div>
            </div>

            <section className="pb-case-section pb-case-section-split">
              <div>
                <span>02 · Product diagnosis</span>
                <h3>Framing the right problem</h3>
              </div>
              <p>
                Before moving into screens, I aligned the team on the user
                problem, desired behavior, business constraints, and technical
                realities. Add the research signals, journey gaps, assumptions,
                and product risks that informed the brief here.
              </p>
            </section>

            <section className="pb-case-section pb-case-section-split">
              <div>
                <span>03 · Design strategy</span>
                <h3>Principles before pixels</h3>
              </div>
              <p>
                Document the principles used to evaluate decisions: what needed
                to feel simple, where trust had to be earned, which moments
                required progressive disclosure, and how the experience could
                scale without losing clarity.
              </p>
            </section>

            <div className="pb-case-placeholder pb-case-placeholder-wide">
              Full-width process image
            </div>

            <section className="pb-case-section pb-case-section-split">
              <div>
                <span>04 · Experience architecture</span>
                <h3>From insight to a coherent system</h3>
              </div>
              <p>
                Show how journeys, information architecture, interaction models,
                states, and reusable patterns came together. This section should
                connect individual interface decisions to the larger product
                system rather than presenting isolated screens.
              </p>
            </section>

            <div className="pb-case-gallery pb-case-gallery-three">
              <div className="pb-case-placeholder">Detail 01</div>
              <div className="pb-case-placeholder">Detail 02</div>
              <div className="pb-case-placeholder">Detail 03</div>
            </div>

            <section className="pb-case-section pb-case-section-split">
              <div>
                <span>05 · Delivery and leadership</span>
                <h3>Reducing ambiguity through execution</h3>
              </div>
              <p>
                Add how the work was brought through critique, prototyping,
                technical reviews, edge-case definition, and quality assurance.
                Highlight the decisions you drove, the tradeoffs you negotiated,
                and how you helped the wider team move with confidence.
              </p>
            </section>

            <div className="pb-case-metrics">
              <div><strong>—</strong><span>Primary product outcome</span></div>
              <div><strong>—</strong><span>User-behavior signal</span></div>
              <div><strong>—</strong><span>Delivery or quality signal</span></div>
            </div>

            <section className="pb-case-section pb-case-section-split">
              <div>
                <span>06 · Outcome and reflection</span>
                <h3>What changed—and what comes next</h3>
              </div>
              <p>
                Close with verified outcomes, what the team learned, what you
                would approach differently, and the next product questions.
                Replace the placeholders above only with measures that can be
                explained and defended.
              </p>
            </section>

            <footer className="pb-case-end">
              <span>End of project</span>
              <button type="button" onClick={() => setFocused(false)}>
                [ BACK TO ALL PROJECTS ]
              </button>
            </footer>
          </div>

          <div
            className="pb-case-metrics-panel"
            data-hidden={detailTab !== "metrics" || undefined}
          >
            <header>
              <span>Measurement framework</span>
              <h3>Evidence, not decoration</h3>
              <p>
                A visual framework for connecting design decisions on
                {` ${project.name}`} to product outcomes. Every chart is currently
                a placeholder and should be replaced with verified data.
              </p>
            </header>
            <MetricCharts />
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="pb">
      <div className="pb-case-progress" aria-label="Project overview progress">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            data-passed={index <= active || undefined}
            data-current={index === active || undefined}
            onClick={() => goTo(index)}
            aria-label={`Go to ${project.name}`}
          />
        ))}
      </div>

      <nav className="pb-list" aria-label="Projects" ref={listRef}>
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            className="pb-item"
            data-active={i === active || undefined}
            style={{ "--tint": p.tint } as React.CSSProperties}
            onClick={() => openProject(i)}
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

            {/* mobile only — each card is self-contained, no separate
                list/detail regions to scroll between (see .pb-section-detail) */}
            <div className="pb-section-detail">
              <p className="pb-section-name">{project.name}</p>
              <p className="pb-role">
                {project.role} · {project.period}
              </p>
              <p className="pb-description">{project.description}</p>
              <p className="pb-topics">
                {project.topics.map((topic) => `[ ${topic} ]`).join(" ")}
              </p>
              <button
                type="button"
                className="pb-case-view-link"
                onClick={() => openProject(i)}
              >
                [ VIEW CASE STUDY ]
              </button>
            </div>
          </section>
        ))}
      </div>

      <aside className="pb-detail" aria-live="polite" ref={detailRef}>
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
