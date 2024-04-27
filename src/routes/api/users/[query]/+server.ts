import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { UserController } from '$lib/db/controllers'

// get all albums for a given artist id
export const GET: RequestHandler = async ({ params }) => {
    const { query } = params
    const t = await UserController.FindSafeUserByID(query)

    if (!t) {
        return json({})
    }

    return json(t)
}
