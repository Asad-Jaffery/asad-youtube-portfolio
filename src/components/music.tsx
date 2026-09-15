"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { SpotifyTrack, SpotifyTracks } from "@/lib/spotify";
import styles from "./music.module.css";

export function Music() {
  const [tracks, setTracks] = useState<SpotifyTrack[] | null>(null);
  const [error, setError] = useState("");
  const [needsPermission, setNeedsPermission] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/spotify", { signal: controller.signal })
      .then(async (response) => {
        const data: SpotifyTracks & { error?: string; code?: string } =
          await response.json();
        if (!controller.signal.aborted)
          setNeedsPermission(data.code === "missing_scope");
        if (!response.ok)
          throw new Error(data.error ?? "Spotify is unavailable.");
        if (!controller.signal.aborted) setTracks(data.tracks);
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setError(
            error instanceof Error ? error.message : "Spotify is unavailable.",
          );
      });
    return () => controller.abort();
  }, [attempt]);
  return (
    <section aria-labelledby="music-title">
      <div className="section-heading">
        <h2 id="music-title">Music</h2>
        <span>My five most recently played songs</span>
      </div>
      {error ? (
        <div className={styles.status} role="status">
          <p>{error}</p>
          {!needsPermission && (
            <button
              className="pill-button"
              onClick={() => {
                setError("");
                setAttempt((value) => value + 1);
              }}
            >
              Try again
            </button>
          )}
        </div>
      ) : tracks === null ? (
        <div className={styles.status} role="status">
          Loading Spotify tracks…
        </div>
      ) : tracks.length === 0 ? (
        <p>No recently played songs available yet.</p>
      ) : (
        <div className={styles.grid}>
          {tracks.map((track, index) => (
            <a
              className={styles.track}
              key={track.id}
              href={track.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${track.name} by ${track.artists} on Spotify`}
            >
              <div className={styles.art}>
                {track.albumArt ? (
                  <Image
                    src={track.albumArt}
                    alt={`Album artwork for ${track.name}`}
                    fill
                    sizes="(max-width: 480px) 50vw, (max-width: 760px) 33vw, 20vw"
                  />
                ) : (
                  <span aria-hidden="true">♫</span>
                )}
                <span className={styles.rank}>{index + 1}</span>
              </div>
              <h3>{track.name}</h3>
              <p>{track.artists}</p>
              <span className={styles.spotify}>Listen on Spotify ↗</span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
