import { NextResponse } from "next/server";
import { isConfigured, mapTrack, spotify } from "../lib";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isConfigured()) {
    return NextResponse.json({ configured: false });
  }

  try {
    const res = await spotify("/me/top/tracks?limit=10&time_range=short_term");
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    return NextResponse.json(
      {
        configured: true,
        tracks: (data.items ?? []).map(mapTrack),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { configured: true, tracks: [], error: true },
      { status: 502 }
    );
  }
}
