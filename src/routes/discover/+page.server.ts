import { getRandomArtists } from '$lib/db/utils'
import { getRandomAlbums } from '$lib/db/utils'
import { getRandomTags } from '$lib/db/utils'
import type { PageData } from '../$types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    const { user } = locals

    return {
        user,
        artists: await getRandomArtists(9),
        albums: await getRandomAlbums(12),
        tags: await getRandomTags(50),
    } as PageData
}
