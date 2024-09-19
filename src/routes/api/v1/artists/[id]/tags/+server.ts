import { json } from '@sveltejs/kit'
import { TagController, ArtistTagController } from '$lib/db/controllers'

export async function POST({ request }) {
    const fd = Object.fromEntries(await request.formData())

    if (!fd.tag_name || !fd.artist_id) {
        return json({
            error: true,
            message: 'there was an error with yer dang values',
        })
    }

    const tagName = fd.tag_name as string
    const artistId = fd.artist_id as string

    const slug = tagName.replaceAll(' ', '-')

    let tag = await TagController.FindTagBySlug(slug)

    if (tag == null) {
        tag = await TagController.CreateTag(tagName)
    }

    if (tag == null) {
        return json({
            error: true,
            message: 'there was an error with yer dang values',
        })
    }

    let artistTag = await ArtistTagController.getArtistTag(artistId, tag.id)

    if (artistTag == null) {
        artistTag = await ArtistTagController.createArtistTag(artistId, tag.id)
    }

    return json(artistTag)
}
