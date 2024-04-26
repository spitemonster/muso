import type { PageServerLoad } from './$types'
import { getUserArtists } from '$lib/services/artist'

export const load: PageServerLoad = async ({ locals }) => {
    const { user } = locals
    const artists = await getUserArtists(user?.id)

    console.log('artists: ', artists)

    return {
        user,
        artists,
    }
}
