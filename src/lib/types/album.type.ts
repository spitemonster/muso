import type { Track, Artist, AlbumTag, Tag } from '.'

export interface Album {
    id: string
    title: string
    slug: string
    duration: number
    coverUrl: string
    tracks?: Track[]
    artists?: Artist[]
    tags?: Tag[]
    albumArtists?: AlbumArtist[]
    albumTags?: AlbumTag[]
}

export interface AlbumArtist {
    id: string
    albumId: string
    artistId: string
    album?: Album
    artist?: Artist
}
