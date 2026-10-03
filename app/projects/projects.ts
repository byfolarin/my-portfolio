// Edit this file to manage the projects shown on the homepage.
// Add a screenshot by dropping an image in /public/projects and setting
// `image: "/projects/name.png"` — until then a tinted placeholder shows.
// `tint` is the project's brand color, used for the placeholder wash.
// `metric` is the headline number shown beside the name — keep it to
// publicly sourced figures (source noted next to each).
// `draft: true` marks placeholder copy: it still shows on the homepage,
// but the ask assistant ignores it until the real details are in.

export type Project = {
  slug: string;
  name: string;
  summary: string;
  role: string;
  period: string;
  industry: string;
  metric?: string;
  description: string;
  topics: string[];
  href?: string;
  image?: string;
  video?: string;
  tint: string;
  draft?: boolean;
};

export const projects: Project[] = [
  {
    slug: "hinstantt",
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
    tint: "#004b87",
  },
  {
    slug: "gravv",
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
    tint: "#077155",
  },
  {
    slug: "kredete-mobile",
    name: "Kredete Mobile",
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
    name: "Selah",
    summary: "A calm church app and the website that introduces it",
    role: "Founding Designer",
    period: "2025",
    industry: "Faith & Community",
    description:
      "A calm church app bringing scripture, sermons, and community into one focused experience, designed end to end with quiet typography — and a marketing site that carries the same thoughtful pace into a clear introduction.",
    topics: ["Product Design", "Mobile App", "Web Design"],
    tint: "#8a6d3b",
  },
  {
    // TODO: replace placeholder copy, then remove `draft`
    slug: "newstips",
    name: "Newstips",
    summary: "One-line summary to come",
    role: "Role to come",
    period: "Year",
    industry: "Industry to come",
    description:
      "Placeholder — describe what Newstips is, the problem it solves, and the design decisions you led.",
    topics: ["Tag", "Tag", "Tag"],
    tint: "#3f4a5a",
    draft: true,
  },
];
