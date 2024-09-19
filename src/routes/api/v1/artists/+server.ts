import type { RequestHandler } from './$types'
import { fail, json } from '@sveltejs/kit'
import { generateId } from '$lib/utils'
import { ArtistController } from '$lib/db/controllers/artist.controller.js'

export async function POST({ request }) {
    const fd = Object.fromEntries(await request.formData())

    if (!fd.adminId || !fd.name) {
        return json({
            error: true,
            message: 'there was an error with yer dang values',
        })
    }

    const { adminId, name, url } = fd

    const newArtistId = await generateId()

    const newArtist = await ArtistController.CreateArtist(
        adminId as string,
        newArtistId,
        name as string,
        url as string
    )

    return json(newArtist)
}

export const GET: RequestHandler = async () => {
    fail(400)
    return json('You must include an artist ID.')
}
