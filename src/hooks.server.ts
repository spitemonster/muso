import jwt from 'jsonwebtoken'
import { client, db } from '$lib/db/db'
import { JWT_PRIVATE_KEY } from '$env/static/private'
import { findSafeUserByEmail } from '$lib/services/user'
import type { Handle } from '@sveltejs/kit'
import type { User, SafeUser } from '$lib/types/user'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

import { userData, artistData, albumData, songData } from '$lib/db/seed'
import { users, artists, albums, songs } from '$lib/db/schema'

let dbSynced = false

export const handle: Handle = async ({ event, resolve }) => {
    // initialize database
    try {
        if (!dbSynced) {
            await client.connect()
            await migrate(db, { migrationsFolder: './src/lib/db/drizzle' })
            await db.insert(users).values(userData)
            await db.insert(artists).values(artistData)
            await db.insert(albums).values(albumData)
            await db.insert(songs).values(songData)
            dbSynced = true
        }
    } catch (err) {
        console.error(err)
    }

    // don't deal with api requests; let the
    if (event.url.pathname.startsWith('/api')) {
        return await resolve(event)
    }

    const auth_token = event.cookies.get('auth_token')

    if (!auth_token) {
        event.locals.user = undefined
        return await resolve(event)
    }

    try {
        const auth_result: User = jwt.verify(
            auth_token,
            JWT_PRIVATE_KEY
        ) as User

        if (!auth_result || !auth_result.email) {
            throw new Error('Token could not be verified')
        }

        const user: SafeUser = await findSafeUserByEmail(auth_result.email)

        if (user.id === '') {
            throw new Error('Token could not be verified')
        }

        event.locals.user = user
    } catch (err) {
        console.error(err)
        event.locals.user = undefined
    }

    return await resolve(event)
}
