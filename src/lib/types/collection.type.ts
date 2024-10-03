import type { Track, Artist, CollectionTag, Tag, TrackCollection } from '.'

export interface Collection {
    id: string
    title: string
    slug: string
    duration: number
    coverUrl: string
    tracks?: Track[]
    artists?: Artist[]
    tags?: Tag[]
    collectionArtists?: CollectionArtist[]
    collectionTags?: CollectionTag[]
    trackCollections?: TrackCollection[]
}

export interface CollectionArtist {
    id: string
    collectionId: string
    artistId: string
    collection?: Collection
    artist?: Artist
}
