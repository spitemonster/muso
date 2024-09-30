import type { Artist } from '$lib/types'
export interface Song {
    id: string
    title: string
    duration: number
    albumId: string
    artists?: Artist[]
    songArtists?: SongArtist[]
}

export interface SongArtist {
    id: string
    songId: string
    artistId: string
    song?: Song
    artist?: Artist
}
