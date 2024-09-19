import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { SongController } from '$lib/db/controllers'

// get all albums for a given artist id
export const GET: RequestHandler = async ({ params }) => {
    const { id } = params
    return json(await SongController.FindSongsByArtistId(id))
}
