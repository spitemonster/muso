import { TagController, ArtistController } from '$lib/db/controllers'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params }) {
    const tag = await TagController.FindTagById(params.id)
    const artists = await ArtistController.FindArtistsByTagId(params.id)

    if (tag == null) {
        throw new Error('crap')
    }

    return {
        tag,
        artists,
    }
}
