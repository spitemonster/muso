import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { AlbumController } from '$lib/db/controllers'

// get all albums for a given artist id
export const GET: RequestHandler = async ({ params }) => {
    const { id } = params
    return json(await AlbumController.FindAlbumsByArtistId(id))
}
