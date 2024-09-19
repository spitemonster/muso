import type { Song, Artist } from '.'

export interface Album {
    id: string
    title: string
    duration: number
    coverUrl: string
    songs: Song[]
    artists: Artist[]
}

export interface AlbumArtist {
    id: string
    albumId: string
    artistId: string
}
