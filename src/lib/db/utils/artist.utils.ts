import { db } from '$lib/db'
import { artists, users } from '$lib/db/schema'
import { eq } from 'drizzle-orm'
import type { Artist } from '$lib/types'

export async function getArtistFromDbById(id: string): Promise<Artist | null> {
    const artist = await db.query.artists.findFirst({
        where: eq(artists.id, id),
        with: {
            albums: {
                with: {
                    songs: true,
                },
            },
        },
    })

    if (!artist) {
        return null
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
