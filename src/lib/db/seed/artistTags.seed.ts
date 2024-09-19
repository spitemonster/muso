import { faker } from '@faker-js/faker'

import type { ArtistTag } from '$lib/types'
import * as schema from '../schema'
import { generateId } from '$lib/utils'

export async function generateArtistTagData(
    artistTagCount: number,
    artistData: (typeof schema.artists.$inferInsert)[],
    tagData: (typeof schema.tags.$inferInsert)[]
): Promise<ArtistTag[]> {
    const generatedArtistTagData: ArtistTag[] = []

    for (let i = 0; i < artistTagCount; i++) {
        const id = await generateId()
        const ad = faker.helpers.arrayElement(artistData)
        const tag = faker.helpers.arrayElement(tagData)

        generatedArtistTagData.push({
            id,
            artistId: ad.id,
            tagId: tag.id,
        })
    }

    return generatedArtistTagData
}
