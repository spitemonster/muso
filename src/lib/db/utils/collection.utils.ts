import { db } from '$lib/db'
import { collections as collectionsSchema } from '$lib/db/schema'

import type {
    Collection,
    Artist,
    Tag,
    CollectionArtist,
    CollectionTag,
} from '$lib/types'

import * as schema from '$lib/db/schema'

import { eq, count, sql, or } from 'drizzle-orm'

export async function getCollectionFromDbById(
    id: string
): Promise<Collection | null> {
    try {
        const res = await db.query.collections.findFirst({
            where: eq(collectionsSchema.id, id),
            with: {
                tracks: true,
                collectionArtists: {
                    with: {
                        artist: true,
                    },
                },
                collectionTags: {
                    with: {
                        tag: true,
                    },
                },
            },
        })

        if (!res) {
            throw new Error(`No collection found with id ${id}.`)
        }

        const a: Collection = { ...res } as Collection

        a.artists = res.collectionArtists.map(
            (a: CollectionArtist) => a.artist as Artist
        )
        a.tags = res.collectionTags.map((a: CollectionTag) => a.tag as Tag)

        delete a.collectionArtists

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
//             collections: sql`json_agg(${schema.collections})`.as('collections'),
//         })
//         .from(schema.artists)
//         .leftJoin(
//             schema.artistTags,
//             eq(schema.artistTags.artistId, schema.artists.id)
//         )
//         .leftJoin(schema.tags, eq(schema.tags.id, schema.artistTags.tagId))
//         .leftJoin(
//             schema.collectionArtists,
//             eq(schema.collectionArtists.artistId, schema.artists.id)
//         )
//         .leftJoin(
//             schema.collections,
//             eq(schema.collectionArtists.collectionId, schema.collections.id)
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

export async function getCollectionsFromDbByArtistId(
    artistId: string
): Promise<Collection[] | null> {
    try {
        const result: CollectionArtist[] =
            await db.query.collectionArtists.findMany({
                where: eq(schema.collectionArtists.artistId, artistId),
                with: {
                    collection: true,
                },
            })

        if (!result) {
            throw new Error('no artist found with given id')
        }

        return result.map((ca) => ca.collection)
        // const collectionsByArtist = await db.query.collections.findMany({
        //     where: eq(collectionsSchema.artistId, artistId),
        //     with: {
        //         tracks: true,
        // 		artists: true
        //     },
        // })
        // if (!collectionsByArtist) {
        //     throw new Error(`No collections found by artist with id ${artistId}`)
        // }
        // return collectionsByArtist as Collection[]
    } catch (err) {
        console.error(err)
        return null
    }

    return null
}

export async function getCollectionTableSize(): Promise<number> {
    const res = await db.select({ count: count() }).from(collectionsSchema)
    return res[0].count
}

export async function getRandomCollections(
    count: number
): Promise<Collection[]> {
    const res = await db.query.collections.findMany({
        columns: {
            id: true,
            coverUrl: true,
            duration: true,
            title: true,
        },
        orderBy: sql`RANDOM()`,
        limit: count,
        with: {
            tracks: true,
            collectionArtists: {
                with: {
                    artist: true,
                },
            },
        },
    })

    const randCollections: Collection[] = res.map((collection) => {
        const artists: Artist[] = collection.collectionArtists.map(
            (ca: CollectionArtist) => ca.artist as Artist
        )
        const a: Collection = { ...collection, artists }

        delete a.collectionArtists

        return a
    })

    return randCollections as Collection[]
}
