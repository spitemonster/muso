import { type ServerLoad, type Actions, redirect } from '@sveltejs/kit'
import { activeUser } from '$lib/store'

export const load: ServerLoad = ({ locals }) => {
    const user = locals.user ?? undefined

    return {
        user,
    }
}

export const actions: Actions = {
    logout: async (event) => {
        event.cookies.delete('auth_token', {
            path: '/',
        })

        activeUser.set(undefined)
        redirect(302, '/')
    },
}
