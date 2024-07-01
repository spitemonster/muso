import { db } from '$lib/db'
import { artists, users, artistTags, tags } from '$lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import type { Artist } from '$lib/types'

export async function createArtistDbRecord(
    adminId: string,
    id: string,
    name: string,
    url: string = ''
): Promise<Artist | null> {
    const artist = await db
        .insert(artists)
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
    const artist = (await db.query.artists.findFirst({
        where: eq(artists.id, id),
        with: {
            albums: {
                with: {
                    songs: true,
                },
            },
        },
    })) as Artist

    if (!artist) {
        return null
    }

    const aTags = await db
        .select({
            tags: tags,
        })
        .from(artistTags)
        .leftJoin(tags, eq(tags.id, artistTags.tagId))
        .where(eq(artistTags.artistId, id))

    // Combine the tags with the artist object
    if (artist) {
        artist.tags = aTags.map((at) => at.tags)
    }

    return artist as Artist
}

export async function getArtistsFromDbByUserId(
    userId: string
): Promise<Artist[] | null> {
    const artistsAdminedByUser = await db.query.artists.findMany({
        where: eq(artists.adminId, userId),
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
        .from(artists)
        .orderBy(sql`RANDOM()`)
        .limit(count)

    const randArtists = await query.execute()
    return randArtists as Artist[]
}

export async function getArtistsByTagId(tagId: string): Promise<Artist[]> {
    const query = db
        .select({
            artist: artists,
        })
        .from(artistTags)
        .leftJoin(artists, eq(artists.id, artistTags.artistId))
        .where(eq(artistTags.tagId, tagId))

    const result = await query.execute()

    // Map the result to extract the artist data
    const artistsWithTag: Artist[] = result.map((row) => row.artist)

    return artistsWithTag
}
