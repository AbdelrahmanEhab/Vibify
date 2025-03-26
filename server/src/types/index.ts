export interface Song {
  name: string;
  artist: string;
  album: string;
  url: string;
  artistPhotoUrl: string;
}

export interface MusicResponse {
  emojis: string[];
  songs: Song[];
}

export interface ErrorResponse {
  error: string;
} 