import { ArtistController } from '$lib/db/controllers'
import * as utils from '$lib/db/utils'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params }) {
    const artist = await ArtistController.FindArtistBySlug(params.artistSlug)

    if (artist == null) {
        throw new Error(`No artist found with slug: ${params.artistSlug}`)
    }

    return {
        artist,
        collections: await utils.getCollectionsByArtist(artist),
    }
}
