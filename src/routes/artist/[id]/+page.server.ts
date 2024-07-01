import { ArtistController } from '$lib/db/controllers'
import type { PageServerLoad } from './$types'
import { getArtistTags } from '$lib/db/utils'

export const load: PageServerLoad = async function ({ params }) {
    const artist = await ArtistController.FindArtistById(params.id)
    const artistTags = await getArtistTags(params.id)

    if (artist == null) {
        throw new Error()
    }

    return {
        artist,
        artistTags,
    }
}
