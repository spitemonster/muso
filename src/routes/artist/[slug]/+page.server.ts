import { ArtistController } from '$lib/db/controllers'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params }) {
    const artist = await ArtistController.FindArtistBySlug(params.slug, [
        'tags',
        'collections',
    ])

    if (artist == null) {
        throw new Error()
    }

    return {
        artist,
    }
}
