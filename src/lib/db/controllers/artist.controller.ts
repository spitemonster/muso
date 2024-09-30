import type { Artist, Tag } from '$lib/types'
import {
    getArtistFromDbById,
    getArtistsFromDbByUserId,
    getArtistsFromDbByUserEmail,
    getUserFromDbById,
    getArtistsByTagId,
    getArtistTags,
    getRandomArtists,
} from '$lib/db/utils'
import { createArtistDbRecord } from '../utils/artist.utils'

export class ArtistController {
    static async CreateArtist(
        adminId: string,
        id: string,
        name: string,
        url: string = ''
    ): Promise<Artist | null> {
        const admin = getUserFromDbById(adminId)

        if (!admin) {
            return null
        }

        return await createArtistDbRecord(adminId, id, name, url)
    }

    static async FindArtistById(
        id: string,
        include: string[]
    ): Promise<Artist | null> {
        return await getArtistFromDbById(id, include)
    }

    static async FindArtistsByUserId(userId: string): Promise<Artist[] | null> {
        return await getArtistsFromDbByUserId(userId)
    }

    static async FindArtistsByUserEmail(
        userEmail: string
    ): Promise<Artist[] | null> {
        return await getArtistsFromDbByUserEmail(userEmail)
    }

    static async FindArtistsByTagId(tagId: string): Promise<Artist[] | null> {
        return await getArtistsByTagId(tagId)
    }

    static async GetArtistTags(artistId: string): Promise<Tag[] | null> {
        return await getArtistTags(artistId)
    }

    static async GetRandomArtists(count: number): Promise<Artist[]> {
        return await getRandomArtists(count)
    }
}
