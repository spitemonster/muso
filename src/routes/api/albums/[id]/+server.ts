import type { RequestHandler } from './$types'
import { db } from '$lib/db/db'
import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { albums } from '$lib/db/schema'

export const GET: RequestHandler = async ({ params }) => {
    const { id } = params

    const res = await db.query.albums.findMany({
        where: eq(albums.id, id),
        with: {
            songs: true,
        },
    })

    return json(res)
}
