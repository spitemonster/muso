import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { ArtistController } from '$lib/db/controllers'
import { isEmail } from '$lib/utils'

export const GET: RequestHandler = async ({ params }) => {
    const { query } = params

    if (isEmail(query)) {
        return json(await ArtistController.FindArtistsByUserEmail(query))
    } else {
        return json(await ArtistController.FindArtistsByUserId(query))
    }
}
