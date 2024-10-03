import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { CollectionController } from '$lib/db/controllers'

export const GET: RequestHandler = async ({ params }) => {
    const { id } = params

    const collection = await CollectionController.FindCollectionById(id)

    return json(collection)
}
