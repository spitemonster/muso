import type { Song, Artist } from '.'

export interface Album {
    id: string
    title: string
    duration: number
    coverUrl: string
    songs?: Song[]
    artists?: Artist[]
    albumArtists?: AlbumArtist[]
}

export interface AlbumArtist {
    id: string
    albumId: string
    artistId: string
    album?: Album
    artist?: Artist
}
