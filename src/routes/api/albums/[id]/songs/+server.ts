import { getSongsFromDbByAlbumId } from '$lib/db/utils'
import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params }) => {
    const { id } = params

    const songs = await getSongsFromDbByAlbumId(id)

    return json(songs)
}
