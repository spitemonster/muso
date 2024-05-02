import type { Actions } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { UserController } from '$lib/db/controllers/user.controller'

export type RegisterResponse = {
    email: string | undefined
    error: boolean
    message: string
}

// default signup action
export const actions: Actions = {
    default: async (event) => {
        const response: RegisterResponse = {
            email: '',
            error: false,
            message: '',
        }

        try {
            const fd = Object.fromEntries(await event.request.formData())

            if (!fd.email || !fd.password || !fd.name) {
                throw new Error('Email, password, and name required.')
            }

            const { email, password, name, type } = fd as {
                email: string
                password: string
                name: string
                type: string
            }

            const user = await UserController.FindUserByEmail(email)

            // fail if user already exists
            if (user) {
                throw new Error('User with given email already exists')
            }

            const newUser = await UserController.CreateUser({
                id: '', // kind of a workaround since I didn't think through using User type as prop
                name,
                email,
                password,
                type,
            })

            // fail if there were issues creating the user
            if (!newUser || newUser.id == '') {
                throw new Error(`There was an issue creating your account.`)
            }

            response.message = 'Your account has been successfully created.'
            response.email = email
        } catch (err) {
            response.error = true
            response.message = err as string
            response.email = undefined
        }

        redirect(302, '/login')
    },
}
