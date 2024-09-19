import { UserController } from '$lib/db/controllers'
import type { Actions, RequestEvent, ActionFailure } from '@sveltejs/kit'
import { type LoginFormResponse } from '$lib/types/login.type'
import { type LoginUserResponse } from '$lib/types'
import { fail, redirect } from '@sveltejs/kit'

export const actions: Actions = {
    default: async ({
        cookies,
        request,
    }: RequestEvent): Promise<
        LoginFormResponse | ActionFailure<LoginFormResponse>
    > => {
        const loginResponse: LoginFormResponse = {
            email: '',
            token: '',
            error: false,
            message: '',
        }

        const fd = Object.fromEntries(await request.formData())

        if (!fd.email || !fd.password) {
            loginResponse.error = true
            loginResponse.message = 'Login requires both email and password.'
            return fail(400, loginResponse)
        }

        const { email, password } = fd
        const { user, token, error, message }: LoginUserResponse =
            await UserController.LoginUser(email as string, password as string)

        if (error || !user) {
            loginResponse.error = true
            loginResponse.message = `There was an error: ${message}`
            return fail(400, loginResponse)
        }

        loginResponse.token = token
        loginResponse.email = user.email
        loginResponse.message = message

        cookies.set('auth_token', `${token}`, {
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
        })

        redirect(302, '/dashboard')
    },
}
