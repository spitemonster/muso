import { CollectionController } from '$lib/db/controllers'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params }) {
    const collection = await CollectionController.FindCollectionByArtistAndSlug(
        params.artistSlug,
        params.collectionSlug
    )

    return {
        collection,
    }
}
