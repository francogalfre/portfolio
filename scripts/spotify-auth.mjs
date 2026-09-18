import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { loadEnv } from "./load-env.mjs";

const env = loadEnv();
const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;

// Use an already-registered redirect URI (must match the Spotify dashboard).
// The browser lands on this URL with ?code=... — copy that code and paste it
// when prompted. Override with SPOTIFY_REDIRECT_URI if needed.
const REDIRECT_URI = env.SPOTIFY_REDIRECT_URI || "https://francogalfre.vercel.app/callback";
const SCOPES = "user-read-recently-played";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET");
  process.exit(1);
}

// Step 1: build the authorization URL and ask the user to authorize.
const authorizeUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
  });

console.log("\nOpen this URL and authorize the app:\n");
console.log(`  ${authorizeUrl}\n`);

// Step 2: read the authorization code pasted from the redirected URL.
const rl = createInterface({ input: process.stdin, output: process.stdout });
const code = await new Promise((resolve) => {
  rl.question("Paste the `code` from the redirected URL: ", resolve);
});
rl.close();

// Step 3: exchange the code for an access token + refresh token.
const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
  }),
});
const data = await tokenRes.json();

if (!data.refresh_token) {
  console.error("Failed to exchange code:", JSON.stringify(data));
  process.exit(1);
}

console.log("\nNew refresh token:\n");
console.log(`  ${data.refresh_token}\n`);
persistRefreshToken(data.refresh_token);

// Step 4: write the new token back into .env so the site picks it up.
function persistRefreshToken(token) {
  const envPath = new URL("../.env", import.meta.url);
  if (!existsSync(envPath)) {
    console.log(".env not found — set SPOTIFY_REFRESH_TOKEN manually.");
    return;
  }

  const raw = readFileSync(envPath, "utf-8");
  const line = `SPOTIFY_REFRESH_TOKEN=${token}`;
  const updated = raw.includes("SPOTIFY_REFRESH_TOKEN=")
    ? raw.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, line)
    : `${raw.trimEnd()}\n${line}\n`;

  writeFileSync(envPath, updated);
  console.log("Updated SPOTIFY_REFRESH_TOKEN in .env");
}
