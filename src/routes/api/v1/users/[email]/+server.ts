import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { UserController } from '$lib/db/controllers'
import type { User } from '$lib/types'

export const GET: RequestHandler = async ({ params }) => {
    const user: User = await UserController.FindUserByEmail(params.email)

    return json(user)
}
