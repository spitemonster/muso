import { faker } from '@faker-js/faker'

import type { AlbumTag } from '$lib/types'
import * as schema from '../schema'
import { generateId } from '$lib/utils'

export async function generateAlbumTagData(
    albumTagCount: number,
    albumData: (typeof schema.albums.$inferInsert)[],
    tagData: (typeof schema.tags.$inferInsert)[]
): Promise<AlbumTag[]> {
    const generatedAlbumTagData: AlbumTag[] = []

    for (let i = 0; i < albumTagCount; i++) {
        const id = await generateId()
        const ad = faker.helpers.arrayElement(albumData)
        const tag = faker.helpers.arrayElement(tagData)

        generatedAlbumTagData.push({
            id,
            albumId: ad.id,
            tagId: tag.id,
        })
    }

    return generatedAlbumTagData
}
