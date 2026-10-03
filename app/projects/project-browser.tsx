"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import type { Project } from "./projects";
import { ClosingReveal, LagosClock, ProjectMedia, Reveal, ShowcaseStrip } from "./showcase";

function windowLabel(href: string | undefined, name: string) {
  if (href) {
    try {
      return new URL(href).host.replace(/^www\./, "");
    } catch {}
  }
  return `${name.toLowerCase().replace(/\s+/g, "")}.app`;
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
  const focusRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!focused) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFocused(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const focus = focusRef.current;
    // every newly opened project starts at the top of its case study
    if (focus) focus.scrollTop = 0;
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

  // the case study is an overlay — freeze the page behind it
  useEffect(() => {
    if (!focused) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [focused]);

  const openProject = (index: number) => {
    setActive(index);
    setDetailTab("case-study");
    setCaseProgress(0);
    setFocused(true);
  };

  const renderCaseStudy = () => {
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
      <div className="projects-page">
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
      </div>
    );
  };

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

      {focused && renderCaseStudy()}
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
