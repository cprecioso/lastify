namespace SpotifyTypes {
  export interface Error {
    error: { status: number; message: string }
  }

  export interface PagingObject<T> {
    items: T[]
    next: string | null
    cursors: Cursor
    limit: number
    href: string
  }

  export interface Cursor {
    after?: string
    before?: string
  }

  export interface PlayHistory {
    track: Track
    played_at: string
    context: Context | null
  }

  export interface Context {
    external_urls: ExternalUrls
    href: string
    type: string
    uri: string
  }

  export interface ExternalUrls {
    spotify?: string
  }

  export interface Track {
    album: Album
    artists: Artist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: ExternalIDS
    external_urls: ExternalUrls
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: "track"
    uri: string
  }

  export interface Album {
    album_type: "album" | "single"
    artists: Artist[]
    available_markets: string[]
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
    name: string
    release_date: string
    release_date_precision: ReleaseDatePrecision
    total_tracks: number
    type: "album" | "single"
    uri: string
  }

  export interface Artist {
    external_urls: ExternalUrls
    href: string
    id: string
    name: string
    type: "artist"
    uri: string
  }

  export interface Image {
    height: number
    url: string
    width: number
  }

  export enum ReleaseDatePrecision {
    Day = "day",
    Year = "year",
  }

  export interface ExternalIDS {
    isrc?: string
  }

  export interface Device {
    id: string
    is_active: boolean
    name: string
  }

  //#region new
  export interface CurrentlyPlaying {
    timestamp: number
    context: Context | null
    progress_ms: number | null
    item?: Track | Episode | Ad | UnknownItem
    currently_playing_type: string
    is_playing: boolean
  }

  export interface Episode {
    type: "episode"
  }
  export interface Ad {
    type: "ad"
  }
  export interface UnknownItem {
    type: "unknown"
  }

  export interface Track {
    album: Album
    artists: Artist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: ExternalIDS
    external_urls: ExternalUrls
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: "track"
    uri: string
  }

  export interface Album {
    album_type: "album" | "single"
    artists: Artist[]
    available_markets: string[]
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
    name: string
    release_date: string
    release_date_precision: ReleaseDatePrecision
    total_tracks: number
    type: "album" | "single"
    uri: string
  }

  export interface Artist {
    external_urls: ExternalUrls
    href: string
    id: string
    name: string
    type: "artist"
    uri: string
  }

  //#endregion
}

export default SpotifyTypes
