import type { RequestHandler } from './$types'
import { db } from '$lib/db/db'
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
    const albums = await db.query.albums.findMany({
        with: {
            songs: true,
        },
    })

    return json(albums)
}
