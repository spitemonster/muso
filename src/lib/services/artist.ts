import { eq } from 'drizzle-orm'
import { db } from '$lib/db/db'
import { users } from '$lib/db/schema'

export async function getUserArtists(userId: string | undefined) {
    if (!userId) {
        return undefined
    }

    const res = await db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: {},
        with: {
            artists: {
                with: {
                    albums: {
                        with: {
                            tracks: true,
                        },
                    },
                },
            },
        },
    })

    return res?.artists
}
