import { type ServerLoad, type Actions, redirect } from '@sveltejs/kit'

export const load: ServerLoad = (event) => {
    const user = event.locals.user ?? {}

    console.log('server side: ', user)

    return {
        user,
    }
}

export const actions: Actions = {
    logout: async (event) => {
        event.cookies.delete('auth_token', {
            path: '/',
        })

        throw redirect(302, '/login')
    },
}
