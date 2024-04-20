import { redirect, type Actions } from '@sveltejs/kit'
import { loginUser } from '$lib/server/services/user'

export const actions: Actions = {
    default: async ({ cookies, request }) => {
        try {
            const fd = Object.fromEntries(await request.formData())

            if (!fd.email || !fd.password) {
                throw new Error('Login requires both email and password.')
            }

            const { email, password } = fd as {
                email: string
                password: string
            }

            const { err, token } = await loginUser(email, password)

            if (err) {
                throw new Error(err)
            }

            cookies.set('auth_token', `${token}`, {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24,
            })
        } catch (err) {
            console.error(err)
            return { status: 400, errors: { message: `${err}` } }
        }

        throw redirect(302, '/')
    },
}
