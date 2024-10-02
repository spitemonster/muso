import { getRandomArtists } from '$lib/db/utils'
import { getRandomAlbums } from '$lib/db/utils'
import { getRandomTags } from '$lib/db/utils'
import type { PageData } from '../$types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    const { user } = locals
    const [artists, albums, tags] = await Promise.all([
        await getRandomArtists(9),
        await getRandomAlbums(12),
        await getRandomTags(24),
    ])

    return {
        user,
        artists,
        albums,
        tags,
    } as PageData
}
