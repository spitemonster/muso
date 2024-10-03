import type { Artist, Collection } from '$lib/types'
export interface Track {
    id: string
    title: string
    slug: string
    duration: number
    collection?: Collection
    collectionId?: string
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
