import { loadEnv } from "./load-env.mjs";

const env = loadEnv();
const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = env.SPOTIFY_REFRESH_TOKEN;

// Fail early if any credential is missing.
if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error(
    "Missing SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET or SPOTIFY_REFRESH_TOKEN",
  );
  process.exit(1);
}

// Step 1: exchange the refresh token for a fresh access token.
// This is also what keeps the refresh token alive (resets its 180-day expiry).
const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: REFRESH_TOKEN,
  }),
});
const tokenData = await tokenRes.json();

// If there is no access_token, the refresh token is revoked/expired.
if (!tokenData.access_token) {
  console.error("REFRESH TOKEN REVOKED OR INVALID:", JSON.stringify(tokenData));
  process.exit(1);
}

// Step 2: sanity-check the token against the recently-played endpoint.
const playedRes = await fetch(
  "https://api.spotify.com/v1/me/player/recently-played?limit=1",
  { headers: { Authorization: `Bearer ${tokenData.access_token}` } },
);
const playedData = await playedRes.json();

if (!playedRes.ok) {
  console.error("Recently-played request failed:", JSON.stringify(playedData));
  process.exit(1);
}

// Step 3: report the result.
const track = playedData.items?.[0]?.track;
if (!track) {
  console.log("TOKEN OK — no recently played tracks yet.");
} else {
  console.log(
    `TOKEN OK — last played: ${track.name} - ${track.artists
      .map((a) => a.name)
      .join(", ")}`,
  );
}
