import type { Song, Artist, AlbumArtist } from '.'

export interface Album {
    id: string
    title: string
    duration: number
    coverUrl: string
    songs?: Song[]
    artists: Artist[]
    albumArtists?: AlbumArtist[]
}

export interface AlbumArtist {
    id: string
    albumId: string
    artistId: string
}
