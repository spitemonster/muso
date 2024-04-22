import jwt from 'jsonwebtoken'
import { db } from '$lib/server/db'
import { JWT_PRIVATE_KEY } from '$env/static/private'
import { getUser } from '$lib/server/services/user'
import type { Handle } from '@sveltejs/kit'

let serverSynced = false

export const handle: Handle = async ({ event, resolve }) => {
    try {
        if (!serverSynced) {
            await db.sync({ alter: true })
            serverSynced = true
        }
    } catch (err) {
        console.error(err)
    }

    try {
        const token = event.cookies.get('auth_token')

        if (!token) {
            // user is not logged in
            return await resolve(event)
        }

        const auth_user = jwt.verify(token, JWT_PRIVATE_KEY)

        if (typeof auth_user === 'string') {
            throw new Error('Something wrong with auth_user.')
        }

        console.log('auth_user: ', auth_user.email)

        const user = await getUser({ email: auth_user.email })

        if (user === null) {
            return await resolve(event)
        }

        console.log('user: ', user)

        const sessionUser = {
            email: user.email,
            name: user.name,
        }

        event.locals.user = sessionUser
    } catch (err) {
        console.error(err)
        if (err instanceof Error) {
            return new Response('error')
        }

        return new Response('double error')
    }

    return await resolve(event)
}

// export const
