import type { Artist, Collection, Track } from '.'

export interface Tag {
    id: string
    name: string
    slug: string
    collections?: Collection[]
    artists?: Artist[]
    tracks?: Track[]
    collectionTags?: CollectionTag[]
    artistTags?: ArtistTag[]
    trackTags?: TrackTag[]
}

export interface ArtistTag {
    id: string
    artistId: string
    tagId: string
    tag?: Tag
    artist?: Artist
}

export interface CollectionTag {
    id: string
    collectionId: string
    tagId: string
    tag?: Tag
    collection?: Collection
}

export interface TrackTag {
    id: string
    trackId: string
    tagId: string
    track?: Track
    tag?: Tag
}
