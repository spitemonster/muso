import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { CollectionController } from '$lib/db/controllers'

// get all collections for a given artist id
export const GET: RequestHandler = async ({ params }) => {
    const { id } = params
    return json(await CollectionController.FindCollectionsByArtistId(id))
}
