import { db } from '$lib/db'
import { albums as albumsSchema } from '$lib/db/schema'

import type { Album } from '$lib/types'
import { eq, count, sql } from 'drizzle-orm'

export async function getAlbumFromDbById(id: string): Promise<Album | null> {
    try {
        const album = await db.query.albums.findFirst({
            where: eq(albumsSchema.id, id),
            with: {
                songs: true,
                artists: true,
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
    // try {
    //     const albumsByArtist = await db.query.albums.findMany({
    //         where: eq(albumsSchema.artistId, artistId),
    //         with: {
    //             songs: true,
    // 			artists: true
    //         },
    //     })

    //     if (!albumsByArtist) {
    //         throw new Error(`No albums found by artist with id ${artistId}`)
    //     }

    //     return albumsByArtist as Album[]
    // } catch (err) {
    //     console.error(err)
    //     return null
    // }

    return null
}

export async function getAlbumTableSize(): Promise<number> {
    const res = await db.select({ count: count() }).from(albumsSchema)
    return res[0].count
}

export async function getRandomAlbums(count: number): Promise<Album[]> {
    const randAlbums = await db.query.albums.findMany({
        columns: {
            id: true,
            coverUrl: true,
            title: true,
        },
        orderBy: sql`RANDOM()`,
        limit: count,
        with: {
            songs: true,
            artists: true,
        },
    })

    return randAlbums as Album[]
}
