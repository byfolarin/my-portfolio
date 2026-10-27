// Edit this file to manage the projects shown on the homepage.
// Add a screenshot by dropping an image in /public/projects and setting
// `image: "/projects/name.png"` — until then a tinted placeholder shows.
// `tint` is the project's brand color, used for the placeholder wash.
// `metric` is the headline number shown beside the name — keep it to
// publicly sourced figures (source noted next to each).
// `draft: true` marks placeholder copy: it still shows on the homepage,
// but the ask assistant ignores it until the real details are in.

export type CaseSection = {
  // short label for the sidebar and the section's mono heading
  label: string;
  // optional lead line, shown large beside the first section
  title?: string;
  body: string;
};

export type Project = {
  slug: string;
  name: string;
  // case study subtitle, shown grey under the name
  tagline?: string;
  sections?: CaseSection[];
  summary: string;
  role: string;
  period: string;
  industry: string;
  metric?: string;
  description: string;
  topics: string[];
  href?: string;
  image?: string;
  imageLabel?: string;
  // extra screens shown beside the main image in the homepage strip
  gallery?: { src: string; label: string }[];
  video?: string;
  tint: string;
  draft?: boolean;
};

export const projects: Project[] = [
  {
    slug: "hinstantt",
    tagline: "One system for the finance team",
    sections: [
      { label: "Challenge", title: "Bringing a finance OS into one language", body: "Hinstantt is a finance OS for global operators: payments, corporate cards, expenses, travel, treasury and accounting on one platform, across 60+ markets. With that much surface area, every module needed to look and behave like part of the same product." },
      { label: "Design system", body: "I built HDS, a complete light-theme design system with clear foundations, reusable components and practical guidance for everyday delivery, so new modules start consistent instead of drifting apart." },
      { label: "Product", body: "The system carries across the product: Budgets shows what each team can spend and whether it is on pace; Travel brings trips, approvals and policy into one view; Subscriptions finds every tool the company pays for from card and bill payments; Team shows who can do what, and who is away." },
      { label: "Communication", body: "I organized vendor onboarding into a clearer sequence for teams inviting, reviewing and managing vendors, and redesigned 127 transactional emails into one coherent communication system with aligned structure, hierarchy, states and visual language." },
      { label: "Outcome", body: "Hinstantt reports more than 10,000 businesses and $12B+ in annual volume running through the platform across 60+ markets." },
    ],
    name: "Hinstantt",
    summary: "Design system and core flows for a third-party risk platform",
    role: "Product Designer",
    period: "2025 — 2026",
    industry: "Third-Party Risk",
    // hinstantt.com: "10,000+ businesses, $12B+ in annual volume", 60+ markets
    metric: "$12B+ annual volume",
    description:
      "Product design for Hinstantt's third-party risk management platform. I built HDS, a complete design system with clear foundations and reusable components, organized vendor onboarding into a clearer sequence, and redesigned 127 transactional emails into one coherent communication system.",
    topics: ["Design Systems", "Product Design", "Enterprise UX"],
    image: "/projects/hinstantt-budgets.jpg",
    imageLabel: "Budgets",
    gallery: [
      { src: "/projects/hinstantt-travel.jpg", label: "Travel" },
      { src: "/projects/hinstantt-subscriptions.jpg", label: "Subscriptions" },
      { src: "/projects/hinstantt-team.jpg", label: "Team" },
    ],
    tint: "#004b87",
  },
  {
    slug: "gravv",
    tagline: "Stablecoin infrastructure that feels dependable",
    sections: [
      { label: "Challenge", title: "Making payment infrastructure feel trustworthy", body: "Gravv connects banks, blockchain networks and local payout rails so businesses can move money in real time with stablecoins. A platform like that has to feel calm and dependable before anyone integrates with it." },
      { label: "Identity", body: "I built the identity around a distinctive deep green and a direct, dependable visual language suited to modern payment infrastructure." },
      { label: "Developer docs", body: "I redesigned the developer documentation to shorten the path from discovery to first payment, keeping implementation guidance and essential context together on the page." },
      { label: "Outcome", body: "Gravv has processed more than $3B in annualised volume for over 1,000 businesses across 100+ countries, and was acquired by Kredete in September 2026." },
    ],
    name: "Gravv",
    summary: "Identity and developer docs for a USDC payments platform",
    role: "Brand & Product Designer",
    period: "2026",
    industry: "Payments",
    // Kredete acquisition coverage, Sep 2026: $3B+ annualised volume,
    // 1,000+ businesses, 100+ countries
    metric: "$3B+ processed",
    description:
      "The identity for a USDC payments platform, built around a distinctive deep green and a direct, dependable visual language — and developer documentation redesigned to shorten the path from discovery to first payment.",
    topics: ["Brand Design", "Developer Experience", "Payments"],
    image: "/projects/gravv-payment-links.jpg",
    imageLabel: "Payment links",
    gallery: [
      { src: "/projects/gravv-overview.jpg", label: "Overview" },
      { src: "/projects/gravv-transactions.jpg", label: "Transactions" },
      { src: "/projects/gravv-wallets.jpg", label: "Wallets" },
      { src: "/projects/gravv-team.jpg", label: "Team" },
    ],
    tint: "#077155",
  },
  {
    slug: "kredete-mobile",
    tagline: "Credit and money, across borders",
    sections: [
      { label: "Challenge", title: "Making complex financial actions feel clear", body: "Kredete helps Africans build credit and move money across borders. Both are high-stakes, multi-step actions, and the product has to make them feel clear and safe for people sending money home." },
      { label: "Product", body: "I lead product design for the mobile experience, from core journeys through the details that make complex financial actions feel clear: transfers, FX, and the credit-building flows that sit alongside them." },
      { label: "Outcome", body: "Kredete has remitted more than $500M for over 700,000 monthly users, and raised a $22M Series A in September 2025." },
    ],
    name: "Kredete",
    summary: "Mobile app for building credit and moving money across borders",
    role: "Design Director",
    period: "2024 — Present",
    industry: "Fintech",
    // Series A coverage, Sep 2025: $500M remitted, 700,000+ monthly users
    metric: "$500M+ remitted",
    description:
      "The mobile experience for a fintech helping Africans build credit and move money across borders. I lead the product design from core journeys through the details that make complex financial actions feel clear.",
    topics: ["Mobile Product", "Credit Building", "Fintech"],
    href: "https://kredete.com",
    video: "/projects/kredete.mp4",
    tint: "#1f4fd8",
  },
  {
    slug: "blockstale",
    tagline: "West Africa's first Bitcoin ATM",
    sections: [
      { label: "Challenge", title: "Bitcoin for everyday cash users", body: "Blockstale put a Bitcoin teller machine in Lagos for people paying with cash, many of them new to crypto and some unable to read. The machine had to be usable by anyone who walked up to it." },
      { label: "Accessibility", body: "I led a team of four developers and four designers to ship accessibility features, including language selection across 14 local and 27 foreign languages for non-literate users." },
      { label: "Outcome", body: "Payment task time on the ATM dropped from 12 minutes to 2, an 88% improvement, and the accessibility feature reached a 52% adoption rate." },
    ],
    name: "Blockstale",
    summary: "A cash-to-crypto kiosk designed for everyday, non-technical users",
    role: "Senior Product Designer",
    period: "2018 — 2021",
    industry: "Crypto Hardware",
    // press coverage, Apr 2020 (first in Nigeria); West Africa's first per Folarin
    metric: "West Africa's first Bitcoin ATM",
    description:
      "Design lead on West Africa's first automated Bitcoin teller machine. I led a team of four developers and four designers, cut payment task time from 12 minutes to 2, and shipped language selection across 14 local and 27 foreign languages for non-literate users.",
    topics: ["Hardware UX", "Accessibility", "Crypto"],
    tint: "#c27a1a",
  },
  {
    slug: "selah",
    tagline: "Scripture, sermons and community",
    sections: [
      { label: "Challenge", title: "A church app that slows you down", body: "Selah brings scripture, sermons and community into one focused experience. It had to feel calm for members and practical for the people running a church." },
      { label: "App", body: "I designed the member app end to end with quiet typography and an interface intended to slow you down, and a marketing site that carries the same thoughtful pace." },
      { label: "Church admin", body: "Behind it, the admin gives a church one place to run its community: a dashboard of members and services, events and services, groups, testimonies, and messages across email, SMS and church chat." },
    ],
    name: "Selah",
    summary: "A calm church app and the website that introduces it",
    role: "Founding Designer",
    period: "2025",
    industry: "Faith & Community",
    description:
      "A calm church app bringing scripture, sermons, and community into one focused experience, designed end to end with quiet typography — and a marketing site that carries the same thoughtful pace into a clear introduction.",
    topics: ["Product Design", "Mobile App", "Web Design"],
    image: "/projects/selah-admin-dashboard.jpg",
    imageLabel: "Church admin dashboard",
    gallery: [
      { src: "/projects/selah-admin-events.jpg", label: "Events & services" },
      { src: "/projects/selah-admin-messages.jpg", label: "Messages" },
      { src: "/projects/selah-admin-groups.jpg", label: "Groups" },
    ],
    tint: "#8a6d3b",
  },
  {
    slug: "type-studio",
    tagline: "Building Kredete's typefaces from scratch",
    sections: [
      { label: "Challenge", title: "A typeface built inside its own tool", body: "Kredete, Hinstantt and Gravv need their own Sans, Serif and Mono families. Rather than design them in a black box, I am building an open-source, browser-based tool to draw, space, preview and export them." },
      { label: "Tool", body: "Shared settings such as heights, stem thickness and curve squareness drive recipes that draw each letter, and any point can still be adjusted by hand. Letters are previewed live inside real product screens." },
      { label: "Validation", body: "Before export, technical checks catch broken or self-intersecting outlines, missing characters and spacing issues, and the tool builds an installable TTF." },
      { label: "Status", body: "Kredete Sans Regular is in progress, with the full A–Z, figures, punctuation and ₦ $ € £ planned for release in December 2026." },
    ],
    name: "Type Studio",
    summary: "A browser-based workspace for designing Kredete's typefaces",
    role: "Design Director",
    period: "2026",
    industry: "Type Design",
    description:
      "An open-source tool for drawing, spacing and exporting typefaces, built to make Kredete Sans — the first of a Sans, Serif and Mono family for Kredete, Hinstantt and Gravv. Letters are previewed live inside real product screens, and Kredete Sans Regular is set for release in December 2026.",
    topics: ["Type Design", "Design Tools", "Brand"],
    image: "/projects/type-studio-editor-o.jpg",
    imageLabel: "Glyph editor",
    gallery: [
      { src: "/projects/type-studio-editor-n.jpg", label: "Drawing the n" },
      { src: "/projects/type-studio-dark.jpg", label: "Dark mode" },
      { src: "/projects/type-studio-export.jpg", label: "Validation & export" },
    ],
    // Kredete purple, as used in the Type Studio interface
    tint: "#5b17a6",
  },
];
