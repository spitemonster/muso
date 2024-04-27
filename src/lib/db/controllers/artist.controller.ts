import type { Artist } from '$lib/types'
import {
    getArtistFromDbById,
    getArtistsFromDbByUserId,
    getArtistsFromDbByUserEmail,
} from '$lib/db/utils'

export class ArtistController {
    static async FindArtistById(id: string): Promise<Artist | null> {
        try {
            const user = await getArtistFromDbById(id)

            if (!user) throw new Error(`No artist found with id ${id}.`)

            return user
        } catch (err) {
            console.error(err)
            return null
        }
    }

    static async FindArtistsByUserId(userId: string): Promise<Artist[] | null> {
        try {
            const artistsAdminedByUser = await getArtistsFromDbByUserId(userId)

            if (!artistsAdminedByUser)
                throw new Error(
                    `No artists found under account with id ${userId}.`
                )

            return artistsAdminedByUser
        } catch (err) {
            console.error(err)
            return null
        }
    }

    static async FindArtistsByUserEmail(
        userEmail: string
    ): Promise<Artist[] | null> {
        try {
            const artistsAdminedByUser =
                await getArtistsFromDbByUserEmail(userEmail)

            if (!artistsAdminedByUser)
                throw new Error(
                    `No artists found under account with email ${userEmail}.`
                )

            return artistsAdminedByUser
        } catch (err) {
            console.error(err)
            return null
        }
    }
}
