type ExternalUrls = {
  spotify: string;
};

type Image = {
  url: string;
  height: number;
  width: number;
};

type Restrictions = {
  reason: string;
};

export type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
};

type Album = {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: Restrictions;
  type: "album";
  uri: string;
  artists: Artist[];
};

type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?: Record<string, unknown>;
  restrictions?: Restrictions;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
};

type PlayHistory = {
  track: Track;
  played_at: string;
  context: {
    type: string;
    href: string;
    external_urls: ExternalUrls;
    uri: string;
  } | null;
};

export type RecentlyPlayedResponse = {
  href: string;
  limit: number;
  next: string | null;
  cursors: {
    after: string;
    before: string;
  };
  total: number;
  items: PlayHistory[];
};

export type NowPlayingResponse = {
  title: string | null;
  artist: string;
  albumArt: string | null;
  songUrl: string;
  trackId: string;
  previewUrl: string | null;
};
