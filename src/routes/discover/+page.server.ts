import { getRandomArtists } from '$lib/db/utils/artist.utils'
import { getRandomAlbums } from '$lib/db/utils/album.utils'
import { getRandomTags } from '$lib/db/utils'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    const { user } = locals
    const artists = await getRandomArtists(9)
    const albums = await getRandomAlbums(12)
    const tags = await getRandomTags(12)

    return {
        user,
        artists,
        albums,
        tags,
    }
}
