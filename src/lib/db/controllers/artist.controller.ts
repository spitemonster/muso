import type { Artist } from '$lib/types'
import {
    getArtistFromDbById,
    getArtistsFromDbByUserId,
    getArtistsFromDbByUserEmail,
    getUserFromDbById,
    getArtistsByTagId,
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

    static async FindArtistById(id: string): Promise<Artist | null> {
        return await getArtistFromDbById(id)
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
}
