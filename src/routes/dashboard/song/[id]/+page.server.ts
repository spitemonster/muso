import { TrackController } from '$lib/db/controllers'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async function ({ params }) {
    const track = await TrackController.FindTrackById(params.id)

    return {
        track,
    }
}
