import type { Artist, Album } from '$lib/types'
export interface Song {
    id: string
    title: string
    slug: string
    duration: number
    album?: Album
    albumId?: string
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
