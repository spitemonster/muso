import type { Artist, Album, Track } from '.'

export interface Tag {
    id: string
    name: string
    slug: string
    albums?: Album[]
    artists?: Artist[]
    tracks?: Track[]
    albumTags?: AlbumTag[]
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

export interface AlbumTag {
    id: string
    albumId: string
    tagId: string
    tag?: Tag
    album?: Album
}

export interface TrackTag {
    id: string
    trackId: string
    tagId: string
    track?: Track
    tag?: Tag
}
