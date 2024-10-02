import type { Artist, Album, Song } from '.'

export interface Tag {
    id: string
    name: string
    slug: string
    albums?: Album[]
    artists?: Artist[]
    songs?: Song[]
    albumTags?: AlbumTag[]
    artistTags?: ArtistTag[]
    songTags?: SongTag[]
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

export interface SongTag {
    id: string
    songId: string
    tagId: string
    song?: Song
    tag?: Tag
}
