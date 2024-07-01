import { AlbumController, ArtistController } from '$lib/db/controllers'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params }) {
    const album = await AlbumController.FindAlbumById(params.id)
    const artist = await ArtistController.FindArtistById(album?.artistId)

    return {
        album,
        artist,
    }
}
