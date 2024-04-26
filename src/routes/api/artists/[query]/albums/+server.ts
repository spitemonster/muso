import type { RequestHandler } from './$types'
import { db } from '$lib/db/db'
import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { artists } from '$lib/db/schema'

// get all albums for a given artist id
export const GET: RequestHandler = async ({ params }) => {
    const { query } = params
    const t = await db.query.artists.findFirst({
        where: eq(artists.id, query),
        columns: {},
        with: {
            albums: {
                with: {
                    songs: true,
                },
            },
        },
    })

    if (!t) {
        return json({})
    }

    return json(t)
}
