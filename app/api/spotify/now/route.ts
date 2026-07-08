import { NextResponse } from "next/server";
import { isConfigured, mapTrack, spotify } from "../lib";

export const dynamic = "force-dynamic";

// Short shared cache: many widgets poll this endpoint, but 10s of staleness
// is invisible for a now-playing display and spares Spotify's rate limits.
type NowPayload = Record<string, unknown>;
let cache: { data: NowPayload; at: number } | null = null;
const TTL_MS = 10_000;

export async function GET() {
  if (!isConfigured()) {
    return NextResponse.json({ configured: false });
  }

  if (cache && Date.now() - cache.at < TTL_MS) {
    return NextResponse.json(cache.data);
  }

  try {
    const now = await spotify("/me/player/currently-playing");
    if (now.status === 200) {
      const data = await now.json();
      if (data?.item && data.currently_playing_type === "track") {
        return respond({
          configured: true,
          playing: data.is_playing === true,
          track: mapTrack(data.item),
          progress: typeof data.progress_ms === "number" ? data.progress_ms : null,
          duration:
            typeof data.item.duration_ms === "number"
              ? data.item.duration_ms
              : null,
        });
      }
    }

    // nothing playing — fall back to the last played track
    const recent = await spotify("/me/player/recently-played?limit=1");
    if (recent.ok) {
      const data = await recent.json();
      const item = data?.items?.[0]?.track;
      if (item) {
        return respond({
          configured: true,
          playing: false,
          track: mapTrack(item),
        });
      }
    }

    return respond({ configured: true, playing: false });
  } catch {
    if (cache) return NextResponse.json(cache.data);
    return NextResponse.json(
      { configured: true, playing: false, error: true },
      { status: 502 }
    );
  }
}

function respond(data: NowPayload) {
  cache = { data, at: Date.now() };
  return NextResponse.json(data);
}
