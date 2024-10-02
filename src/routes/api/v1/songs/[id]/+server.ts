import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { TrackController } from '$lib/db/controllers'

// returns an array of artists for a given query; will accept user ID, user email or artist ID
export const GET: RequestHandler = async ({ params }) => {
    const { id } = params

    return json(await TrackController.FindTrackById(id))
}
