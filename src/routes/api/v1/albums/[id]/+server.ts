import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { AlbumController } from '$lib/db/controllers'

export const GET: RequestHandler = async ({ params }) => {
    const { id } = params

    const album = await AlbumController.FindAlbumById(id)

    return json(album)
}
