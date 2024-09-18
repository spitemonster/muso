import type { Song, Artist } from '.'

export interface Album {
    id: string
    title: string
    artistId: string
    coverUrl: string
    songs: Song[]
    artist: Artist
}
