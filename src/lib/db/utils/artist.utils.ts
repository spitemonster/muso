import { db } from '$lib/db'
import * as schema from '$lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import type { Artist } from '$lib/types'

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

export async function getArtistFromDbById(id: string): Promise<Artist | null> {
    console.log(`ID: ${id}`)
    const artist = await db.query.artists.findFirst({
        where: eq(schema.artists.id, id),
        with: {
            artistTags: {
                with: {
                    tag: true,
                },
            },
        },
    })

    if (!artist) {
        return null
    }

    const tags = artist.artistTags?.map((a) => a.tag)

    const a = { ...artist, tags } as Artist

    delete a.artistTags

    return a
}

export async function getArtistsFromDbByUserId(
    userId: string
): Promise<Artist[] | null> {
    const artistsAdminedByUser = await db.query.artists.findMany({
        where: eq(artistsSchema.adminId, userId),
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
