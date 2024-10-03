import { getTracksFromDbByCollectionId } from '$lib/db/utils'
import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ params }) => {
    const { id } = params

    const tracks = await getTracksFromDbByCollectionId(id)

    return json(tracks)
}
