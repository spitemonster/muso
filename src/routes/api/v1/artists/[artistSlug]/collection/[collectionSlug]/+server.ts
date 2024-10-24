import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { CollectionController } from '$lib/db/controllers'

// get all collections for a given artist id
export const GET: RequestHandler = async ({ params }) => {
    const { artistSlug, collectionSlug } = params

    const collection = await CollectionController.FindCollectionByArtistAndSlug(
        artistSlug,
        collectionSlug
    )

    return json(collection)
}
