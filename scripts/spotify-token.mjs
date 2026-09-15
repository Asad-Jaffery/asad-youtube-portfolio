import { createInterface } from "node:readline/promises";
import { randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { stdin as input, stdout as output } from "node:process";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri =
  process.env.SPOTIFY_REDIRECT_URI ?? "http://127.0.0.1:3000/callback";
if (!clientId || !clientSecret) {
  console.error(
    "Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env first.",
  );
  process.exit(1);
}
const state = randomBytes(24).toString("hex");
const url = new URL("https://accounts.spotify.com/authorize");
url.search = new URLSearchParams({
  client_id: clientId,
  response_type: "code",
  redirect_uri: redirectUri,
  scope: "user-read-recently-played",
  state,
  show_dialog: "true",
}).toString();
console.log("Open this URL and approve Spotify access:\n" + url);
console.log(
  "The redirect URI must match your Spotify app settings: " + redirectUri,
);
console.log(
  "After the redirect, copy the full URL even if the page does not load.",
);
const rl = createInterface({ input, output });
const pasted = await rl.question("Full Spotify redirect URL: ");
rl.close();
const redirect = new URL(pasted.trim());
if (
  redirect.searchParams.get("state") !== state ||
  !redirect.searchParams.get("code")
) {
  console.error(
    "Authorization was cancelled or the redirect did not match this request.",
  );
  process.exit(1);
}
const response = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code: redirect.searchParams.get("code"),
    redirect_uri: redirectUri,
  }),
  signal: AbortSignal.timeout(10000),
});
const data = await response.json();
if (
  !response.ok ||
  !data.refresh_token ||
  !data.scope?.split(" ").includes("user-read-recently-played")
) {
  console.error(
    "Could not authorize recently played songs. Run this helper again and approve access.",
  );
  process.exit(1);
}
const env = await readFile(".env", "utf8");
const line = `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`;
const updated = /^SPOTIFY_REFRESH_TOKEN=.*$/m.test(env)
  ? env.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, () => line)
  : env.trimEnd() + "\n" + line + "\n";
await writeFile(".env", updated, { mode: 0o600 });
console.log(
  "Updated SPOTIFY_REFRESH_TOKEN in .env. Restart the app to load it.",
);
