import type { Artist, Album } from '$lib/types'
export interface Track {
    id: string
    title: string
    slug: string
    duration: number
    album?: Album
    albumId?: string
    artists?: Artist[]
    trackArtists?: TrackArtist[]
}

export interface TrackArtist {
    id: string
    trackId: string
    artistId: string
    track?: Track
    artist?: Artist
}
