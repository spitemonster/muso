import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { ArtistController } from '$lib/db/controllers'

export const GET: RequestHandler = async ({ url }) => {
    const count = url.searchParams.get('count') ?? 1

    return json(await ArtistController.GetRandomArtists(count as number))
}
