import { SongController } from '$lib/db/controllers'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params }) {
    const song = await SongController.FindSongById(params.id)

    return {
        song,
    }
}
