import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { ArtistController } from '$lib/db/controllers'

// returns an array of artists for a given query; will accept user ID, user email or artist ID
export const GET: RequestHandler = async ({ params }) => {
    const { artistSlug } = params

    return json(await ArtistController.FindArtistBySlug(artistSlug))
}
