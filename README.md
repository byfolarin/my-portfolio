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

## Running locally

```bash
npm install
npm run dev
```

The music page needs Spotify credentials — copy `.env.example` to `.env.local`
and fill in the three values. To get a refresh token, create an app at
[developer.spotify.com](https://developer.spotify.com/dashboard) with
`http://127.0.0.1:8888/callback` as a redirect URI, then run:

```bash
SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-token.mjs
```

Without credentials the site still runs; the music page just shows its
not-connected state.
