// One-time helper to obtain a Spotify refresh token for the /music page.
//
// 1. Create an app at https://developer.spotify.com/dashboard
//    and add http://127.0.0.1:8888/callback as a Redirect URI.
// 2. Run:  SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-token.mjs
// 3. A browser opens — log in and approve. The refresh token prints here.
// 4. Put all three values in .env.local (see .env.example) and in
//    Vercel → Project → Settings → Environment Variables.

import { createServer } from "node:http";
import { exec } from "node:child_process";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT = "http://127.0.0.1:8888/callback";
const SCOPES =
  "user-read-currently-playing user-read-recently-played user-top-read";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET env vars first."
  );
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT,
  });

const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  if (url.pathname !== "/callback") return res.end();
  const code = url.searchParams.get("code");
  if (!code) {
    res.end("No code in callback.");
    return;
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT,
    }),
  });

  const data = await tokenRes.json();
  if (data.refresh_token) {
    res.end("Done — you can close this tab. The token is in your terminal.");
    console.log("\nYour refresh token:\n");
    console.log(data.refresh_token);
    console.log("\nAdd it to .env.local as SPOTIFY_REFRESH_TOKEN.\n");
  } else {
    res.end("Token exchange failed — see terminal.");
    console.error(data);
  }
  server.close();
});

server.listen(8888, () => {
  console.log("Opening Spotify authorization…\n");
  console.log("If the browser doesn't open, visit:\n" + authUrl + "\n");
  exec(`open "${authUrl}"`);
});
