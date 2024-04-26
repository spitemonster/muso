import { type Actions, redirect } from '@sveltejs/kit'
import { activeUser } from '$lib/store'

export const actions: Actions = {
    default: async (event) => {
        event.cookies.delete('auth_token', {
            path: '/',
        })

        activeUser.set(undefined)
        redirect(302, '/')
    },
}
