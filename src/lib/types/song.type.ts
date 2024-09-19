import type { Artist } from '$lib/types'
export interface Song {
    id: string
    title: string
    duration: number
    albumId: string
    artists: Artist[]
}
