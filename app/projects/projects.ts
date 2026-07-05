// Edit this file to manage the projects page.

export type Project = {
  slug: string;
  name: string;
  role: string;
  period: string;
  description: string;
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "kredete",
    name: "Kredete",
    role: "Lead Product Designer",
    period: "2024 — Present",
    description:
      "Credit building and cross-border payments for Africans. I lead design across the product — from the mobile app and web experience to the design system that keeps a fast-moving fintech shipping consistently.",
    href: "https://kredete.com",
  },
  {
    slug: "hinstantt",
    name: "Hinstantt",
    role: "Product Designer",
    period: "2025 — 2026",
    description:
      "Built HDS, a full design system with light-theme foundations and component libraries, designed the TPRM vendor-onboarding flows, and redesigned all 127 transactional emails into one coherent visual language.",
  },
  {
    slug: "gravv",
    name: "Gravv",
    role: "Brand & Product Designer",
    period: "2026",
    description:
      "A USDC payments platform. I shaped the brand — anchored on a deep green — and redesigned the API documentation so developers could get from zero to first payment without leaving the page.",
  },
  {
    slug: "selah",
    name: "Selah",
    role: "Founding Designer",
    period: "2025",
    description:
      "A church app for scripture, sermons, and community. Designed the app and the marketing site end to end — calm typography and a quiet interface for a product meant to slow you down.",
  },
];
