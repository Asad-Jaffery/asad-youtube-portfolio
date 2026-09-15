export type SpotifyTrack = {
  id: string;
  name: string;
  artists: string;
  albumArt: string | null;
  url: string;
};
export type SpotifyTracks = { tracks: SpotifyTrack[] };
