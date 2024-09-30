import { db } from '$lib/db'
import * as schema from '$lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import type { Artist, Tag, Album } from '$lib/types'

export async function createArtistDbRecord(
    adminId: string,
    id: string,
    name: string,
    url: string = ''
): Promise<Artist | null> {
    const artist = await db
        .insert(schema.artists)
        .values({
            adminId,
            id,
            name,
            url,
        })
        .returning()

    const createdArtist = artist[0]

    if (!createdArtist) {
        return null
    }

    return createdArtist as Artist
}

export async function getArtistFromDbById(
    queryId: string,
    include: string[] = []
): Promise<Artist | null> {
    try {
        const query = {
            where: eq(schema.artists.id, queryId),
            columns: {
                name: true,
                id: true,
                createdAt: true,
                adminId: true,
                url: true,
            },
            with: {
                artistTags: false,
            },
        }

        if (include?.includes('tags')) {
            query.with.artistTags = true
        }

        const result = await db.query.artists.findFirst(query)

        if (!result) {
            throw new Error(`No artist found with given id.`)
        }

        return result as Artist

        // const { name, id, createdAt, adminId, url } = result

        // // const albums = result.albumArtists.map((ar) => ar.album)
        // const tags = result.artistTags.map((t) => t.tag)

        // return { name, id, createdAt, adminId, url, tags } as Artist

        // // const albums: Album[] = result.albumArtists.map((ar) => ar.album)
        // // const tags: Tag[] = result.artistTags.map((t) => t.tag)

        // // const { name, createdAt, adminId, url } = result

        // // if (!name || !createdAt || !adminId || !url) {
        // //     throw new Error(`No artist found with given id.`)
        // // }

        // // const a: Artist = { name, id, createdAt, adminId, url, albums, tags }
    } catch (err) {
        console.error(err)
        return err
    }
}

export async function getArtistsFromDbByUserId(
    userId: string
): Promise<Artist[] | null> {
    const artistsAdminedByUser = await db.query.artists.findMany({
        where: eq(schema.artists.adminId, userId),
        with: {
            albums: {
                with: {
                    songs: true,
                },
            },
        },
    })

    if (!artistsAdminedByUser) {
        return null
    }

    return artistsAdminedByUser as Artist[]
}

export async function getArtistsFromDbByUserEmail(
    userEmail: string
): Promise<Artist[] | null> {
    const user = await db.query.users.findFirst({
        where: eq(users.email, userEmail),
    })

    if (!user || !user.id)
        throw new Error(`User not found with email ${userEmail}`)

    const { id } = user

    const artistsAdminedByUser = await getArtistsFromDbByUserId(id)

    if (!artistsAdminedByUser) {
        return null
    }

    return artistsAdminedByUser as Artist[]
}

export async function getRandomArtists(count: number): Promise<Artist[]> {
    const query = db
        .select()
        .from(artistsSchema)
        .orderBy(sql`RANDOM()`)
        .limit(count)

    const randArtists = await query.execute()
    return randArtists as Artist[]
}

export async function getArtistsByTagId(tagId: string): Promise<Artist[]> {
    const query = db
        .select({
            artist: artistsSchema,
        })
        .from(artistTags)
        .leftJoin(artistsSchema, eq(artistsSchema.id, artistTags.artistId))
        .where(eq(artistTags.tagId, tagId))

    const result = await query.execute()

    // Map the result to extract the artist data
    const artistsWithTag: Artist[] = result.map((row) => row.artist)

    return artistsWithTag
}
