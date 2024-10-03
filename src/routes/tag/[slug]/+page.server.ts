import { TagController } from '$lib/db/controllers'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params }) {
    try {
        const tag = await TagController.FindTagBySlug(params.slug)

        if (!tag) {
            throw new Error('No tag found.')
        }

        return {
            tag,
            artists: await TagController.GetTagArtists(tag.id, 3),
            collections: await TagController.GetTagCollections(tag.id, 12),
        }
    } catch (err) {
        console.error(err)

        return {
            tag: {},
            artists: [],
            collections: [],
        }
    }
}
