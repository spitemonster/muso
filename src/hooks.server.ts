import jwt from 'jsonwebtoken'
import { client, db } from '$lib/db/db'
import { JWT_PRIVATE_KEY } from '$env/static/private'
import { findSafeUserByEmail } from '$lib/services/user'
import type { Handle } from '@sveltejs/kit'
import type { User, SafeUser } from '$lib/types/user'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

let dbSynced = false

export const handle: Handle = async ({ event, resolve }) => {
    // initialize database
    try {
        if (!dbSynced) {
            await client.connect()
            await migrate(db, { migrationsFolder: './src/lib/db/drizzle' })
            dbSynced = true
        }
    } catch (err) {
        console.error(err)
    }

    if (event.url.pathname.startsWith('/api')) {
        return await resolve(event)
    }

    const auth_token = event.cookies.get('auth_token')

    try {
        if (!auth_token) {
            throw 'No auth token in request.'
        }

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
    } catch (error) {
        event.locals.user = undefined
        console.error(error)
    }

    return await resolve(event)
}
