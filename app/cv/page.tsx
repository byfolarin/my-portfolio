import type { Metadata } from "next";
import CVActions from "./cv-actions";

export const metadata: Metadata = {
  title: "CV — Folarin Folarin",
  description: "Product Design Director & Design Systems Lead. Lagos, Nigeria.",
};

export default function CV() {
  return (
    <div className="cv-page">
      <header className="cv-header">
        <div className="cv-hero-grid">
          <div className="cv-hero-identity">
            <div className="cv-headshot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/folarin-headshot.jpg" alt="Folarin Folarin" />
            </div>
            <div>
              <p className="cv-hero-name">FOLARIN A FOLARIN</p>
              <p className="cv-hero-role">
                Product Design Director &amp; Design Systems Lead
              </p>
              <p className="cv-hero-loc">Lagos, Nigeria</p>
            </div>
          </div>
          <div className="cv-hero-links">
            <a href="/">Website</a>
            <a href="#">LinkedIn</a>
            <a href="mailto:folarin@kredete.com">Email</a>
            <a href="#">Mobile No</a>
            <span className="cv-hero-actions">
              <CVActions />
            </span>
          </div>
        </div>
        <hr className="cv-rule" />
      </header>

      <section className="cv-block">
        <div className="cv-grid3">
          <div className="cv-label">About</div>
          <div className="cv-full">
            <p className="cv-about-text">
              Design leader who builds systems, not just screens. I direct
              product design for Kredete&rsquo;s AI-powered, stablecoin-based
              cross-border money movement platform, a global company
              operating across multiple continents. After a decade across
              fintech and hardware in Africa&rsquo;s underserved payment
              corridors, including West Africa&rsquo;s first Bitcoin ATM, I
              focus on design leadership, systems thinking, and shipping for
              markets most tools weren&rsquo;t built for. Currently pursuing
              an MBA and MSc alongside my role at Kredete.
            </p>
          </div>
        </div>
      </section>

      <section className="cv-block">
        <div className="cv-grid3">
          <div className="cv-label">Recognition</div>
          <div className="cv-split-left">
            <h4>Highlights</h4>
            <ul className="cv-bullets">
              <li>
                Design lead on West Africa&rsquo;s first Automated Bitcoin
                Teller Machine, driving a 52% adoption rate and cutting
                payment task time from 12 minutes to 2.
              </li>
              <li>
                Built and scaled Kredete&rsquo;s design function through its
                $22M Series A raise, helping the platform process over $5B in
                transfers for 5M+ active users.
              </li>
              <li>
                Designed Gravv, standalone developer infrastructure for
                building on stablecoins, which has processed over $390M in
                its first 6 months.
              </li>
            </ul>
          </div>
          <div className="cv-split-right">
            <h4>Certifications</h4>
            <ul className="cv-bullets">
              <li>
                Professional Diploma in UX Design, UX Design Institute (in
                progress)
              </li>
              <li>Human-Computer Interaction &amp; Design Specialization, IDF</li>
              <li>Google UX Design Certificate, Google</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cv-block">
        <div className="cv-grid3">
          <div className="cv-label">Education</div>
          <div className="cv-rowset">
            <div className="cv-item-row">
              <div className="cv-meta">
                <strong>MBA (in view)</strong>
              </div>
              <div className="cv-desc">
                <p>
                  Rome Business School, focused on scaling design and product
                  organizations at growth-stage fintech companies.
                </p>
              </div>
            </div>
            <div className="cv-item-row">
              <div className="cv-meta">
                <strong>MSc</strong>
              </div>
              <div className="cv-desc">
                <p>
                  University of Valencia, postgraduate study bridging design,
                  technology, and business strategy.
                </p>
              </div>
            </div>
            <div className="cv-item-row">
              <div className="cv-meta">
                <strong>Higher National Diploma</strong>
              </div>
              <div className="cv-desc">
                <p>
                  Lagos State Polytechnic (LASPOTECH), advanced diploma in
                  Communication &amp; Liberal Studies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cv-block">
        <div className="cv-grid3">
          <div className="cv-label">Experience</div>
          <div className="cv-rowset">
            <div className="cv-item-row-group">
              <div className="cv-group-head">
                <strong>Kredete</strong>
                <span className="cv-tag">Fintech · Stablecoins</span>
                <span className="cv-dates">Nov 2024 — Present</span>
              </div>

              <div className="cv-subrow">
                <div className="cv-meta">
                  <strong>Design Director, Global</strong>
                  <span className="cv-dates">Apr 2026 — Present</span>
                </div>
                <div className="cv-desc">
                  <ul className="cv-bullets">
                    <li>
                      Own product design end-to-end for Kredete&rsquo;s
                      AI-powered, stablecoin-based cross-border transfer
                      platform, plus its B2B spend-management arm Hinstantt
                      and consumer money-transfer app Gravv.
                    </li>
                    <li>
                      Lead and set the quality bar for a small team of
                      designers and PMs, covering hiring, roadmap, and design
                      system ownership.
                    </li>
                    <li>
                      Designed Kredete&rsquo;s AI Agent transfer flow: a
                      conversational interface spanning K2K, international
                      African corridors, domestic NGN, US ACH/Wire, and SEPA
                      rails.
                    </li>
                    <li>
                      Led a full v4 product critique and Home screen redesign
                      across a nine-zone architecture, and shipped a
                      subscription tier system (Free/Pro/Premium) powering
                      Kredete&rsquo;s AI assistant, Prael.
                    </li>
                    <li>
                      Built an internal design operations tool, including a
                      Kanban board, lifecycle pipeline, and AI spec
                      generation, to run design work across five product
                      surfaces on 14-day sprints.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="cv-subrow">
                <div className="cv-meta">
                  <strong>Product Design Lead</strong>
                  <span className="cv-dates">Dec 2024 — Apr 2026</span>
                </div>
                <div className="cv-desc">
                  <ul className="cv-bullets">
                    <li>
                      Led product design across Kredete&rsquo;s consumer and
                      B2B surfaces, shaping the platform&rsquo;s design
                      direction ahead of promotion to Design Director,
                      Global.
                    </li>
                    <li>
                      Partnered closely with engineering and product
                      leadership to scale design practice through
                      Kredete&rsquo;s Series A growth phase.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="cv-subrow">
                <div className="cv-meta">
                  <strong>Senior Product Designer</strong>
                  <span className="cv-dates">Nov 2024 — Dec 2024</span>
                </div>
                <div className="cv-desc">
                  <ul className="cv-bullets">
                    <li>
                      Joined Kredete as Senior Product Designer, contributing
                      to the AI-powered cross-border transfer platform before
                      being promoted to Product Design Lead within two
                      months.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="cv-item-row">
              <div className="cv-meta">
                <strong>Senior Product Designer</strong>
                <span className="cv-company">eFiat</span>
                <span className="cv-tag">Fintech · Decentralized Payments</span>
                <span className="cv-dates">Sept 2021 — Nov 2024</span>
              </div>
              <div className="cv-desc">
                <ul className="cv-bullets">
                  <li>
                    Led two teams of 8 mid-level and 4 junior designers plus
                    3 interns across 3 time zones and 2 continents to execute
                    2 SaaS systems.
                  </li>
                  <li>
                    Translated 98% of the interface to French for
                    francophone markets, driving a 40% uptick in usage.
                  </li>
                  <li>
                    Built the company&rsquo;s design system, adopted across 3
                    B2B and B2C products in 8 African countries.
                  </li>
                </ul>
              </div>
            </div>

            <div className="cv-item-row">
              <div className="cv-meta">
                <strong>Senior Product Designer (African Region)</strong>
                <span className="cv-company">Yield App</span>
                <span className="cv-tag">DeFi · Staking &amp; Lending</span>
                <span className="cv-dates">Mar 2021 — Sept 2021</span>
              </div>
              <div className="cv-desc">
                <ul className="cv-bullets">
                  <li>
                    Partnered directly with the African regional manager to
                    shape the product for the region&rsquo;s crypto market.
                  </li>
                  <li>
                    Achieved a 95% customer satisfaction rating through
                    ongoing user research and design improvements accounting
                    for cultural nuance.
                  </li>
                </ul>
              </div>
            </div>

            <div className="cv-item-row-group">
              <div className="cv-group-head">
                <strong>Blockstale</strong>
                <span className="cv-tag">Hardware · Africa&rsquo;s first Bitcoin ATM</span>
                <span className="cv-dates">Apr 2018 — Aug 2021</span>
              </div>

              <div className="cv-subrow">
                <div className="cv-meta">
                  <strong>Senior Product Designer</strong>
                  <span className="cv-dates">Apr 2020 — Aug 2021</span>
                </div>
                <div className="cv-desc">
                  <ul className="cv-bullets">
                    <li>
                      Led a team of 4 developers and 4 designers to ship an
                      accessibility feature that reached a 52% adoption rate.
                    </li>
                    <li>
                      Introduced a language-selection feature enabling
                      access for non-literate users, spanning 14 local and
                      27 foreign languages.
                    </li>
                    <li>
                      Cut customer payment task time on the ATM from 12
                      minutes to 2, an 88% improvement.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="cv-subrow">
                <div className="cv-meta">
                  <strong>Product Designer</strong>
                  <span className="cv-dates">Apr 2018 — Apr 2020</span>
                </div>
                <div className="cv-desc">
                  <ul className="cv-bullets">
                    <li>
                      Translated user stories into a live working prototype
                      while navigating an unexplored financial market.
                    </li>
                    <li>
                      Designed high-fidelity prototypes that secured 100%
                      stakeholder buy-in and resourcing from senior
                      leadership.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="cv-item-row">
              <div className="cv-meta">
                <strong>Product Designer</strong>
                <span className="cv-company">FoodRES, Inc.</span>
                <span className="cv-tag">Student Food Access Platform</span>
                <span className="cv-dates">Mar 2018 — Mar 2019</span>
              </div>
              <div className="cv-desc">
                <ul className="cv-bullets">
                  <li>
                    Designed and helped build a cross-platform service
                    connecting students to affordable food, from concept
                    through launch.
                  </li>
                </ul>
              </div>
            </div>

            <div className="cv-item-row">
              <div className="cv-meta">
                <strong>Product Designer</strong>
                <span className="cv-company">Upwork</span>
                <span className="cv-tag">Freelance</span>
                <span className="cv-dates">Jun 2015 — Jun 2016</span>
              </div>
              <div className="cv-desc">
                <ul className="cv-bullets">
                  <li>
                    Increased hourly rate by 30% over 12 months through skill
                    development and successful project outcomes.
                  </li>
                  <li>
                    Completed 20+ projects at a 4.8/5 average rating and a
                    100% client satisfaction rating.
                  </li>
                </ul>
              </div>
            </div>

            <div className="cv-item-row">
              <div className="cv-meta">
                <strong>Product Designer</strong>
                <span className="cv-company">Naijaloaded Limited</span>
                <span className="cv-tag">Entertainment Software</span>
                <span className="cv-dates">Jan 2015 — Jun 2015</span>
              </div>
              <div className="cv-desc">
                <ul className="cv-bullets">
                  <li>
                    Developed user personas and stories for a platform
                    onboarding over 6,000 African creatives.
                  </li>
                  <li>
                    Shaped new features via wireframes and contributed a
                    responsive nav bar and icon set to the design system.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cv-block">
        <div className="cv-grid3">
          <div className="cv-label">Side projects</div>
          <div className="cv-rowset">
            <div className="cv-proj-row">
              <strong>Nigeria Solar Time Dashboard</strong>
              <p>
                A weather/climate exploration correcting how mainstream apps
                treat Nigeria as one solar-time zone, despite its
                longitudinal spread.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="cv-footer">
        <p className="cv-tools">
          <strong>Preferred tech &amp; tools:</strong> Figma, Adobe Creative
          Suite, HTML5, CSS3, JavaScript, jQuery, Claude Code, Figma MCP,
          Blender
        </p>
        <p>Folarin A Folarin · Product Design Director · Lagos, Nigeria</p>
      </footer>
    </div>
  );
}
