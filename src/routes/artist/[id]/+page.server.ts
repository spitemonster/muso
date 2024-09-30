import { ArtistController } from '$lib/db/controllers'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params }) {
    const artist = await ArtistController.FindArtistById(params.id, [
        'tags',
        'albums',
    ])

    if (artist == null) {
        throw new Error()
    }

    return {
        artist,
    }
}
