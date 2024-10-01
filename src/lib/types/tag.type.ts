import type { Artist, Album } from '.'

export interface Tag {
    id: string
    name: string
    slug: string
    albums?: Album[]
    artists?: Artist[]
    albumTags?: AlbumTag[]
    artistTags?: ArtistTag[]
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
