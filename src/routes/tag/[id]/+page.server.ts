import { TagController } from '$lib/db/controllers'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params }) {
    const tag = await TagController.FindTagById(params.id)
    if (tag == null) {
        throw new Error('No tag found.')
    }

    return {
        tag,
        artists: await TagController.GetTagArtists(tag.id, 3),
        collections: await TagController.GetTagCollections(tag.id, 12),
    }
}
