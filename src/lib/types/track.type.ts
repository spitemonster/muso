import type { Artist, Collection } from '$lib/types'
export interface Track {
    id: string
    title: string
    slug: string
    duration: number
    trackCollections?: TrackCollection[]
    collections?: Collection[]
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

export interface TrackCollection {
    id: string
    collectionId: string
    trackId: string
    collection?: Collection
    track?: Track
}
