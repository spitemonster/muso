import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { UserController } from '$lib/db/controllers'

import { isEmail } from '$lib/utils'

// get all collections for a given artist id
export const GET: RequestHandler = async ({ params }) => {
    const { query } = params

    if (isEmail(query)) {
        return json(await UserController.FindUserByEmail(query))
    } else {
        return json(await UserController.FindUserById(query))
    }
}
