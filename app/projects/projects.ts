// Edit this file to manage the projects page.
// Add a screenshot by dropping an image in /public/projects and setting
// `image: "/projects/name.png"` — until then a tinted placeholder shows.
// `tint` is the project's brand color, used for the placeholder wash.

export type Project = {
  slug: string;
  name: string;
  role: string;
  period: string;
  description: string;
  topics: string[];
  href?: string;
  image?: string;
  video?: string;
  tint: string;
};

export const projects: Project[] = [
  {
    slug: "kredete-mobile",
    name: "Kredete Mobile",
    role: "Lead Product Designer",
    period: "2024 — Present",
    description:
      "The mobile experience for a fintech helping Africans build credit and move money across borders. I lead the product design from core journeys through the details that make complex financial actions feel clear.",
    topics: ["Mobile Product", "Credit Building", "Fintech"],
    href: "https://kredete.com",
    video: "/projects/kredete.mp4",
    tint: "#1f4fd8",
  },
  {
    slug: "kredete-web",
    name: "Kredete Web",
    role: "Lead Product Designer",
    period: "2024 — Present",
    description:
      "The web experience supporting Kredete's credit-building and cross-border payments product. Designed to keep important financial information understandable, consistent, and easy to act on.",
    topics: ["Web Product", "Payments", "UX Design"],
    href: "https://kredete.com",
    tint: "#315fe3",
  },
  {
    slug: "kredete-design-system",
    name: "Kredete System",
    role: "Lead Product Designer",
    period: "2024 — Present",
    description:
      "A shared design language for a fast-moving fintech. I created the foundations and reusable patterns that help product and engineering teams ship coherent experiences across mobile and web.",
    topics: ["Design Systems", "Components", "Product Operations"],
    href: "https://kredete.com",
    tint: "#183eaf",
  },
  {
    slug: "hinstantt-design-system",
    name: "Hinstantt HDS",
    role: "Product Designer",
    period: "2025 — 2026",
    description:
      "HDS is a complete light-theme design system built to bring consistency to Hinstantt's product. It combines clear foundations, reusable components, and practical guidance for everyday delivery.",
    topics: ["Design Systems", "Foundations", "Component Libraries"],
    tint: "#004b87",
  },
  {
    slug: "hinstantt-tprm",
    name: "TPRM Onboarding",
    role: "Product Designer",
    period: "2025 — 2026",
    description:
      "Vendor-onboarding flows for Hinstantt's third-party risk management product. I organized a complex operational process into a clearer sequence for teams inviting, reviewing, and managing vendors.",
    topics: ["Product Design", "Vendor Onboarding", "Enterprise UX"],
    tint: "#17679d",
  },
  {
    slug: "hinstantt-email-system",
    name: "Email System",
    role: "Product Designer",
    period: "2025 — 2026",
    description:
      "A redesign of 127 transactional emails into one coherent communication system. The work aligned structure, hierarchy, states, and visual language across the complete email experience.",
    topics: ["Email Design", "Content Systems", "Visual Language"],
    tint: "#3581ad",
  },
  {
    slug: "gravv-brand",
    name: "Gravv Brand",
    role: "Brand & Product Designer",
    period: "2026",
    description:
      "The identity for a USDC payments platform, built around a distinctive deep green and a direct, dependable visual language suited to modern payment infrastructure.",
    topics: ["Brand Design", "Visual Identity", "Payments"],
    tint: "#077155",
  },
  {
    slug: "gravv-api-docs",
    name: "Gravv API Docs",
    role: "Brand & Product Designer",
    period: "2026",
    description:
      "Developer documentation redesigned to shorten the path from discovery to first payment. The experience keeps implementation guidance and essential context together on the page.",
    topics: ["API Documentation", "Developer Experience", "Payments"],
    tint: "#0d5d49",
  },
  {
    slug: "selah-app",
    name: "Selah App",
    role: "Founding Designer",
    period: "2025",
    description:
      "A calm church app bringing scripture, sermons, and community into one focused experience. I designed the product end to end with quiet typography and an interface intended to slow you down.",
    topics: ["Product Design", "Mobile App", "Typography"],
    tint: "#8a6d3b",
  },
  {
    slug: "selah-marketing-site",
    name: "Selah Website",
    role: "Founding Designer",
    period: "2025",
    description:
      "The marketing experience for Selah, translating the app's thoughtful pace and typographic character into a clear introduction to scripture, sermons, and community.",
    topics: ["Marketing Site", "Web Design", "Typography"],
    tint: "#a18453",
  },
];
