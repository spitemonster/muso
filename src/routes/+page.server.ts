import { type Actions, redirect } from '@sveltejs/kit'
import { activeUser } from '$lib/store'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    return {
        user: locals.user,
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
