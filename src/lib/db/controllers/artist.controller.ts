import type { Artist } from '$lib/types'
import { getArtistFromDbById, getArtistsFromDbByUserId } from '../utils'

export class ArtistController {
    async FindArtistById(id: string): Promise<Artist | null> {
        try {
            const user = await getArtistFromDbById(id)

            if (!user) throw new Error(`No artist found with id ${id}.`)

            return user
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async FindArtistsByUserId(userId: string): Promise<Artist[] | null> {
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
}
