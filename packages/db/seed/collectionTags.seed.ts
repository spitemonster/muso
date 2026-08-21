import { faker } from '@faker-js/faker'

import * as schema from '../schema'

export async function generateCollectionTagData(
    collectionTagCount: number,
    collectionData: (typeof schema.collections.$inferInsert)[],
    tagData: (typeof schema.tags.$inferInsert)[]
) {
    const generatedCollectionTagData = []

    for (let i = 0; i < collectionTagCount; i++) {
        const id = crypto.randomUUID()
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
