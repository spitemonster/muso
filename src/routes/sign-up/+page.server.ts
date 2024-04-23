import type { Actions } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { getUser, createUser } from '$lib/server/services/user'

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

            const { email, password, name, isArtist } = fd as {
                email: string
                password: string
                name: string
                isArtist: string
            }

            const artist = isArtist == 'on'

            const { id } = await getUser({ email })

            // fail if user already exists
            if (id) {
                throw new Error('User with given email already exists')
            }

            const newUser = await createUser({
                id: '', // kind of a workaround since I didn't think through using User type as prop
                name,
                email,
                password,
                isArtist: artist,
            })

            // fail if there were issues creating the user
            if (newUser.id == '') {
                throw new Error(`There was an issue creating your account.`)
            }

            response.message = 'Your account has been successfully created.'
            response.email = email
        } catch (error) {
            response.error = true
            response.message = error as string
            response.email = undefined
        }

        redirect(302, '/login')
        return response
    },
}
