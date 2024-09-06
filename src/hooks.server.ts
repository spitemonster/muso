import jwt from 'jsonwebtoken'
import { client, db } from '$lib/db/db'
import { JWT_PRIVATE_KEY } from '$env/static/private'
import { UserController } from '$lib/db/controllers'
import type { Handle } from '@sveltejs/kit'
import type { User } from '$lib/types/user'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

import {
    userData,
    artistData,
    albumData,
    songData,
    tagData,
    artistTagData,
} from '$lib/db/seed'
import { users, artists, albums, songs, tags, artistTags } from '$lib/db/schema'

let dbSynced = false
let dbClientConnected = false

export const handle: Handle = async ({ event, resolve }) => {
    // don't deal with api requests; let the routes do it
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

        const user = await UserController.FindSafeUserByEmail(auth_result.email)

        if (!user || user.id === '') {
            throw new Error('Token could not be verified')
        }

        event.locals.user = user
    } catch (err) {
        console.error(err)
        event.locals.user = undefined
    }

    return await resolve(event)
}
