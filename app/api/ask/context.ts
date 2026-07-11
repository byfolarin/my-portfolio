// ============================================================
// YOUR PERSONAL CONTEXT FOR THE AI ASSISTANT
// ============================================================
// Everything between the backticks is given to the AI on every
// question, alongside what the site already knows (bio,
// projects, reading list, experience, contact). Edit freely in
// plain text, then have Claude deploy (or push + `npx vercel
// --prod`). Avoid backtick characters inside the text.
// ============================================================

export const personalContext = `
PROFESSIONAL ROLE & COMPANIES:
- Director of Product Design at Kredete — leads product design at Kredete, a global fintech building AI-powered, stablecoin-based cross-border money movement infrastructure. The portfolio spans three products: Kredete, Hinstantt, and Gravv.
- Founder of Selah — runs Selah as a separate private startup: a church management and public directory platform. Design work there has included the Church Information settings page, using Instrument Serif and DM Sans.
- Dual postgraduate student — simultaneously pursuing an MBA at Rome Business School and an MSc at the University of Valencia, alongside his full-time role.

KREDETE PRODUCT DESIGN WORK:
- Kredete v5 spec & Home redesign — spec critique and a Home screen redesign built around a five-tab navigation (Home, Send, Discover, Card, Lifestyle), a nine-zone architecture, and the Prael AI assistant.
- Subscription tier system — designed Kredete's Free/Pro/Premium tiers featuring Prael.
- Unified auth flow — a single-email-entry flow that silently routes to sign-in or sign-up based on account existence, including edge cases for social/email account collisions.
- Transfer & FX experiences — iterated the USD-to-NGN transfer UI with a compact inline FX display beneath the amount entry; designed AI Agent transfer flows (K2K, international, ACH/Wire urgency detection, insufficient balance routing, ambiguous recipient disambiguation); worked on FX & Corridors analytics.
- Prediction markets feature — a prediction markets UX modeled on Kalshi's patterns: buy/sell flow, open orders with partial fill badges and fill progress indicators.
- K.ai travel booking — a conversational travel booking interface using the Duffel API for flight results, with PIN verification, developed around his GITEX Morocco context.
- Design operations tracker — a single-file HTML app for Kredete's design team: Kanban board, Lifecycle pipeline view, a Design Studio tab for AI-assisted spec generation, role-based access for five roles, and a 14-day sprint model.

HINSTANTT & GRAVV WORK:
- Hinstantt Expenses module — US-only, USD-only corporate expense management with approval workflows and receipt upload; also a dark-themed payments tab UI.
- Hinstantt travel booking prototype — fare matrix layout, policy compliance tags, approval routing, and trip ID confirmation.
- Gravv interfaces — a dual-currency USD/KES conversion input prototype, plus a live rates widget and card payment form using Space Grotesk/Syne in a dark purple/cyan palette.

TOOLING & WORKFLOW:
- Claude Code power user — set it up from scratch, connected Figma via the Dev Mode MCP Server, and explored Google Docs write access via MCP.
- Figma MCP workarounds — investigated the comments API gap in the official Figma MCP and set up a third-party MCP server to fill it.
- Blender MCP exploration — working through setup of Blender connectors with Claude Desktop.
- Automation & prototyping — has used Playwright to screenshot multi-step web flows, and builds AI-assisted design tooling.

PERSONAL PROJECTS & INTERESTS:
- Programmatic CV redesign — built with Node.js/docx, rendered to PDF via LibreOffice, with a strict three-column grid, plus a matching website version.
- Nigeria-specific data products — built a Nigeria weather/solar dashboard, grounded in the insight that Nigeria's longitude span creates real solar time differences between western and eastern cities.
- Design research & benchmarking — produced a Mobbin research guide styled as a design publication article, and has benchmarked fintech UIs against Revolut, Monzo, and Karat — including scoring Kredete's mobile homepage against Revolut.
- iOS platform work — has written Live Activity/Dynamic Island specs for Kredete's onboarding flow.

WORKING STYLE & PREFERENCES:
- Consistently prefers lean, space-efficient UI, direct iterative feedback, and demo-mode simplicity over complex authentication in internal tools.
- Strong interest in design tooling, AI-assisted workflows, and building locally relevant data products.

NOTE ON TITLES: His current title is Director of Product Design at Kredete (the site may say Lead Product Designer in places — Director is correct). Hinstantt and Gravv are products within Kredete's portfolio that he designs for, and Selah is his own startup.
`.trim();
