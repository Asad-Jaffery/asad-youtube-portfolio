import { NextResponse } from "next/server";
import type { SpotifyTracks } from "@/lib/spotify";

type Track = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
};

export async function GET() {
  const {
    SPOTIFY_CLIENT_ID: id,
    SPOTIFY_CLIENT_SECRET: secret,
    SPOTIFY_REFRESH_TOKEN: refresh,
  } = process.env;
  if (!id || !secret || !refresh)
    return NextResponse.json(
      { error: "Spotify is not connected." },
      { status: 503 },
    );
  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refresh,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!tokenResponse.ok)
      return NextResponse.json(
        { error: "Spotify needs to be reconnected." },
        { status: 503 },
      );
    const token: { access_token?: string; scope?: string } =
      await tokenResponse.json();
    if (!token.access_token) throw new Error("Missing access token.");
    if (
      token.scope !== undefined &&
      !token.scope.split(" ").includes("user-read-recently-played")
    )
      return NextResponse.json(
        {
          error: "Spotify needs permission to show recently played songs.",
          code: "missing_scope",
        },
        { status: 403 },
      );
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=5",
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!response.ok) throw new Error("Spotify tracks unavailable.");
    const data: { items: { track: Track; played_at: string }[] } =
      await response.json();
    const payload: SpotifyTracks = {
      tracks: data.items.slice(0, 5).map(({ track, played_at }) => ({
        id: `${track.id}-${played_at}`,
        name: track.name,
        artists: track.artists.map((artist) => artist.name).join(", "),
        albumArt:
          track.album.images[1]?.url ?? track.album.images[0]?.url ?? null,
        url: track.external_urls.spotify,
      })),
    };
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { error: "Spotify is taking a break. Try again in a moment." },
      { status: 502 },
    );
  }
}
