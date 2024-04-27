import type { Artist } from '$lib/types'
import {
    getArtistFromDbById,
    getArtistsFromDbByUserId,
    getArtistsFromDbByUserEmail,
} from '$lib/db/utils'

export class ArtistController {
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
}
