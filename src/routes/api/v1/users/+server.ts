import type { RequestHandler } from './$types'
import { fail, json } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
    fail(400)
    return json('You must include a user ID.')
}
