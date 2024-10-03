import { faker } from '@faker-js/faker'

import type { CollectionTag } from '$lib/types'
import * as schema from '../schema'
import { generateId } from '$lib/utils'

export async function generateCollectionTagData(
    collectionTagCount: number,
    collectionData: (typeof schema.collections.$inferInsert)[],
    tagData: (typeof schema.tags.$inferInsert)[]
): Promise<CollectionTag[]> {
    const generatedCollectionTagData: CollectionTag[] = []

    for (let i = 0; i < collectionTagCount; i++) {
        const id = await generateId()
        const ad = faker.helpers.arrayElement(collectionData)
        const tag = faker.helpers.arrayElement(tagData)

        generatedCollectionTagData.push({
            id,
            collectionId: ad.id,
            tagId: tag.id,
        })
    }

    return generatedCollectionTagData
}
