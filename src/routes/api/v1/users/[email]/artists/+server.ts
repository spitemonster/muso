import { ArtistController, UserController } from '$lib/db/controllers'
import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params }) => {
    return json({
        user: await UserController.FindUserByEmail(params.email),
        artists: await ArtistController.FindArtistsByUserEmail(params.email),
    })
}
