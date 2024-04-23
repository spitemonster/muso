import jwt from 'jsonwebtoken'
import { db } from '$lib/server/db'
import { JWT_PRIVATE_KEY } from '$env/static/private'
import { findSafeUserByEmail } from '$lib/server/services/user'
import type { Handle } from '@sveltejs/kit'
import type { User, SafeUser } from '$lib/types/user'

let serverSynced = false

export const handle: Handle = async ({ event, resolve }) => {
    // initialize database
    try {
        if (!serverSynced) {
            await db.sync({ alter: true })
            serverSynced = true
        }
    } catch (err) {
        console.error(err)
    }

    if (event.url.pathname.startsWith('/api')) {
        return await resolve(event)
    }

    const auth_token = event.cookies.get('auth_token')

    console.log('token result: ', auth_token)

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

        console.log('safe user: ', user)

        event.locals.user = user
    } catch (error) {
        event.locals.user = undefined
        console.error(error)
    }

    return await resolve(event)
}

// export const handle: Handle = async ({ event, resolve }) => {
//     try {
//         if (!serverSynced) {
//             await db.sync({ alter: true })
//             serverSynced = true
//         }
//     } catch (err) {
//         console.error(err)
//     }

//     try {
//         const token = event.cookies.get('auth_token')

//         if (!token) {
//             // user is not logged in
//             return await resolve(event)
//         }

//         const auth_user = jwt.verify(token, JWT_PRIVATE_KEY)

//         if (typeof auth_user === 'string') {
//             throw new Error('Something wrong with auth_user.')
//         }

//         console.log('auth_user: ', auth_user.email)

//         const user = await getUser({ email: auth_user.email })

//         if (user === null) {
//             return await resolve(event)
//         }

//         console.log('user: ', user)

//         const sessionUser = {
//             email: user.email,
//             name: user.name,
//         }

//         event.locals.user = sessionUser
//     } catch (err) {
//         console.error(err)
//         if (err instanceof Error) {
//             return new Response('error')
//         }

//         return new Response('double error')
//     }

//     return await resolve(event)
// }

// export const
