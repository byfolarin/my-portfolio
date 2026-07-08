import { NextResponse } from "next/server";
import { isConfigured, mapTrack, spotify } from "../lib";

export const dynamic = "force-dynamic";

// Top tracks barely change hour to hour — cache server-side so Spotify sees
// one request per TTL instead of one per visitor, and keep the last good
// list around to serve if Spotify rate-limits us.
type Payload = { configured: true; tracks: unknown[] };
let cache: { data: Payload; at: number } | null = null;
const TTL_MS = 30 * 60 * 1000;

export async function GET() {
  if (!isConfigured()) {
    return NextResponse.json({ configured: false });
  }

  if (cache && Date.now() - cache.at < TTL_MS) {
    return NextResponse.json(cache.data, {
      headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400" },
    });
  }

  try {
    const res = await spotify("/me/top/tracks?limit=10&time_range=short_term");
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const payload: Payload = {
      configured: true,
      tracks: (data.items ?? []).map(mapTrack),
    };
    cache = { data: payload, at: Date.now() };
    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400" },
    });
  } catch {
    // serve the stale list rather than an empty page
    if (cache) {
      return NextResponse.json(cache.data);
    }
    // top-tracks unavailable (e.g. rate-limited): approximate it from
    // recently-played, which lives in a separate quota bucket
    try {
      const res = await spotify("/me/player/recently-played?limit=50");
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      const seen = new Set<string>();
      const tracks = [];
      for (const item of data.items ?? []) {
        const t = mapTrack(item.track);
        if (!seen.has(t.url)) {
          seen.add(t.url);
          tracks.push(t);
        }
        if (tracks.length >= 10) break;
      }
      if (tracks.length > 0) {
        const payload: Payload = { configured: true, tracks };
        cache = { data: payload, at: Date.now() };
        return NextResponse.json(payload);
      }
    } catch {}
    return NextResponse.json(
      { configured: true, tracks: [], error: true },
      { status: 502 }
    );
  }
}
