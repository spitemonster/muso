import type { RequestHandler } from './$types'
import { db } from '$lib/db/db'
import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'
import { artists, users } from '$lib/db/schema'

import isEmail from '$lib/utils/isEmail'

// returns an array of artists for a given query; will accept user ID, user email or artist ID
export const GET: RequestHandler = async ({ params }) => {
    const { query } = params
    let artistResponse

    if (isEmail(query)) {
        const res = await db.query.users.findFirst({
            where: eq(users.email, query),
            columns: {},
            with: {
                artists: {
                    with: {
                        albums: true,
                    },
                },
            },
        })

        artistResponse = res?.artists
    } else {
        const res = await db.query.users.findFirst({
            where: eq(users.id, query),
            columns: {},
            with: {
                artists: {
                    with: {
                        albums: true,
                    },
                },
            },
        })

        artistResponse = res?.artists

        if (!artistResponse) {
            const t = await db.query.artists.findFirst({
                where: eq(artists.id, query),
            })

            artistResponse = [t]
        }
    }

    return json(artistResponse)
}
