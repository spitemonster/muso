import { db } from '$lib/db'
import { albums } from '$lib/db/schema'

import type { Album } from '$lib/types'
import { eq, sql } from 'drizzle-orm'

export async function getAlbumFromDbById(id: string): Promise<Album | null> {
    try {
        const album = await db.query.albums.findFirst({
            where: eq(albums.id, id),
            with: {
                songs: true,
            },
        })

        if (!album) {
            throw new Error(`No album found with id ${id}.`)
        }

        return album as Album
    } catch (err) {
        console.error(err)
        return null
    }
}

export async function getAlbumsFromDbByArtistId(
    artistId: string
): Promise<Album[] | null> {
    try {
        const albumsByArtist = await db.query.albums.findMany({
            where: eq(albums.artistId, artistId),
            with: {
                songs: true,
            },
        })

        if (!albumsByArtist) {
            throw new Error(`No albums found by artist with id ${artistId}`)
        }

        return albumsByArtist as Album[]
    } catch (err) {
        console.error(err)
        return null
    }
}

export async function getRandomAlbums(count: number): Promise<Album[]> {
    const query = db
        .select()
        .from(albums)
        .orderBy(sql`RANDOM()`)
        .limit(count)

    const randAlbums = query.execute()
    return randAlbums as Album[]
}
