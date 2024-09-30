import { db } from '$lib/db'
import { albums as albumsSchema } from '$lib/db/schema'

import type { Album, Artist } from '$lib/types'
import { eq, count, sql } from 'drizzle-orm'

export async function getAlbumFromDbById(id: string): Promise<Album | null> {
    try {
        const album = await db.query.albums.findFirst({
            where: eq(albumsSchema.id, id),
            with: {
                songs: true,
                albumArtists: {
                    with: {
                        artist: true,
                    },
                },
            },
        })

        if (!album) {
            throw new Error(`No album found with id ${id}.`)
        }

        const artists: Artist[] = album.albumArtists.map(
            (a) => a.artist as Artist
        )

        const a: Album = { ...album, artists } as Album

        delete a.albumArtists

        return a
    } catch (err) {
        console.error(err)
        return null
    }
}

// export async function getArtistFromDbById(id: string): Promise<Artist | null> {
//     const artist = await db
//         .select({
//             id: schema.artists.id,
//             name: schema.artists.name,
//             url: schema.artists.url,
//             createdAt: schema.artists.createdAt,
//             adminId: schema.artists.adminId,
//             tags: sql`json_agg(${schema.tags})`.as('tags'),
//             albums: sql`json_agg(${schema.albums})`.as('albums'),
//         })
//         .from(schema.artists)
//         .leftJoin(
//             schema.artistTags,
//             eq(schema.artistTags.artistId, schema.artists.id)
//         )
//         .leftJoin(schema.tags, eq(schema.tags.id, schema.artistTags.tagId))
//         .leftJoin(
//             schema.albumArtists,
//             eq(schema.albumArtists.artistId, schema.artists.id)
//         )
//         .leftJoin(
//             schema.albums,
//             eq(schema.albumArtists.albumId, schema.albums.id)
//         )
//         .where(eq(schema.artists.id, id))
//         .groupBy(
//             schema.artists.id,
//             schema.artists.name,
//             schema.artists.url,
//             schema.artists.createdAt,
//             schema.artists.adminId
//         )

//     return artist[0] ? (artist[0] as Artist) : null
// }

export async function getAlbumsFromDbByArtistId(
    artistId: string
): Promise<Album[] | null> {
    try {
        // const albumsByArtist = await db.query.albums.findMany({
        //     where: eq(albumsSchema.artistId, artistId),
        //     with: {
        //         songs: true,
        // 		artists: true
        //     },
        // })
        // if (!albumsByArtist) {
        //     throw new Error(`No albums found by artist with id ${artistId}`)
        // }
        // return albumsByArtist as Album[]
    } catch (err) {
        console.error(err)
        return null
    }

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
