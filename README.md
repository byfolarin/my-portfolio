# folarin — portfolio

Personal site of Folarin Folarin, product designer in Lagos, Nigeria.

**Live:** [my-portfolio-lyart-sigma-49.vercel.app](https://my-portfolio-lyart-sigma-49.vercel.app)

## Pages

- **Home** — bio and selected projects
- **Reading** — 50 books on a paginated shelf; every book opens as an interactive 3D hardcover (WebGL) with my notes
- **About** — the longer story, plus experience
- **Projects** — selected work with media previews
- **Writings** — coming soon
- **Music** — a three.js CD player wired to the Spotify API: whatever I'm playing spins live, top tracks as the tray below

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS 4 + hand-rolled CSS
- [react-three-fiber](https://github.com/pmndrs/react-three-fiber) + drei for the 3D books and CD player
- GSAP for nav choreography
- Spotify Web API (server-side refresh-token flow) for live listening data
- Deployed on Vercel
