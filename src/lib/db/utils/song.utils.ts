import { db } from '$lib/db'
import { songs } from '$lib/db/schema'
import { eq } from 'drizzle-orm'
import type { Song } from '$lib/types'

export async function getSongFromDbById(id: string): Promise<Song | null> {
    const song = await db.query.songs.findFirst({
        where: eq(songs.id, id),
    })

    if (!song) {
        return null
    }

    return song as Song
}

export async function getSongsFromDbByArtistId(
    artistId: string
): Promise<Song[] | null> {
    const songsByArtist = await db.query.songs.findMany({
        where: eq(songs.artistId, artistId),
    })

    if (!songsByArtist) {
        return null
    }

    return songsByArtist as Song[]
}

export async function getSongsFromDbByAlbumId(
    albumId: string
): Promise<Song[] | null> {
    const songsOnAlbum = await db.query.songs.findMany({
        where: eq(songs.albumId, albumId),
    })

    if (!songsOnAlbum) {
        return null
    }

    return songsOnAlbum as Song[]
}
