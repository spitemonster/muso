import { AlbumController } from '$lib/db/controllers'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params }) {
    const album = await AlbumController.FindAlbumById(params.id)
    console.log('found album: ', album)

    return {
        album,
    }
}
