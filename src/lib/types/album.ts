import { type Song } from '.'

export interface Album {
    id: string
    title: string
    artistId: string
    songs: Song[]
}
