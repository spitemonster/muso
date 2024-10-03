import type { Artist, Tag, ArtistTag, User } from '$lib/types'
import { eq, sql } from 'drizzle-orm'
// import {

// } from '$lib/db/utils'
// import { createArtistDbRecord } from '../utils/artist.utils'
import { db } from '../db'
import * as schema from '../schema'

export class ArtistController {
    // static async CreateArtist(
    //     adminId: string,
    //     id: string,
    //     name: string,
    //     url: string = ''
    // ): Promise<Artist> {
    //     const admin = getUserFromDbById(adminId)

    //     if (!admin) {
    //         return null
    //     }

    //     return await createArtistDbRecord(adminId, id, name, url)
    // }

    static async FindArtistById(id: string): Promise<Artist> {
        const result = await db.query.artists.findFirst({
            where: eq(schema.artists.id, id),
        })

        if (!result) return null

        return result as Artist
    }

    static async FindArtistBySlug(slug: string): Promise<Artist> {
        const result = await db.query.artists.findFirst({
            where: eq(schema.artists.slug, slug),
        })

        if (!result) return null

        return result as Artist
    }

    static async FindArtistsAdminedByUser(user: User): Promise<Artist[]> {
        // TODO: setup ArtistAdmin schema
        return []
    }

    // static async FindArtistsAdminedByUserId(userId: string): Promise<Artist[]> {
    //     return await getArtistsFromDbByUserId(userId)
    // }

    static async FindArtistsByUserEmail(userEmail: string): Promise<Artist[]> {
        return await getArtistsFromDbByUserEmail(userEmail)
    }

    static async FindArtistsWithTagById(tagId: string): Promise<Artist[]> {
        const artistTags = await db.query.artistTags.findMany({
            where: eq(schema.tags.id, tagId),
            with: {
                artist: true,
            },
        })

        if (!artistTags) return []

        return artistTags.map((at: ArtistTag) => at!.artist)
    }

    static async FindArtistsWithTag(tag: User): Promise<Artist[]> {
        return await this.FindArtistsWithTagById(tag!.id)
    }

    static async GetRandomArtists(count: number): Promise<Artist[]> {
        const randArtists = await db.query.artists.findMany({
            columns: {
                name: true,
                id: true,
                slug: true,
                createdAt: true,
                adminId: true,
                url: true,
                location: true,
                biography: true,
                profileImageUrl: true,
            },
            orderBy: sql`RANDOM()`,
            limit: count,
        })

        if (!randArtists) return []

        return randArtists as Artist[]
    }
}
