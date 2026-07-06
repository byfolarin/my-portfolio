// Server-side Spotify Web API helper using the refresh-token flow.
// Requires three env vars (see .env.example):
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1";

let cached: { token: string; expires: number } | null = null;

export function isConfigured() {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_REFRESH_TOKEN
  );
}

async function getAccessToken() {
  if (cached && cached.expires > Date.now()) return cached.token;

  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Spotify token refresh failed: ${res.status}`);
  const data = await res.json();
  cached = {
    token: data.access_token,
    expires: Date.now() + (data.expires_in - 60) * 1000,
  };
  return cached.token;
}

export async function spotify(path: string) {
  const token = await getAccessToken();
  return fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function mapTrack(item: any) {
  return {
    title: item.name as string,
    artist: item.artists.map((a: any) => a.name).join(", ") as string,
    album: item.album?.name as string,
    art: (item.album?.images?.[1]?.url ?? item.album?.images?.[0]?.url) as
      | string
      | undefined,
    url: item.external_urls?.spotify as string,
  };
}
