import { type Actions, redirect } from '@sveltejs/kit'

export const actions: Actions = {
    default: async (event) => {
        event.cookies.delete('auth_token', {
            path: '/',
        })

        redirect(302, '/')
    },
}
