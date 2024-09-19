import { faker } from '@faker-js/faker'

import type { Tag } from '$lib/types'

import { generateId } from '$lib/utils'

export async function generateTagData(tagCount: number): Promise<Tag[]> {
    const generatedTagData: Tag[] = []

    for (let i = 0; i < tagCount; i++) {
        const id = await generateId()
        const name = faker.word.words(
            Math.max(Math.round(Math.random() * 2), 1)
        )
        const slug = name.replaceAll(' ', '-')

        generatedTagData.push({
            id,
            name,
            slug,
        })
    }

    return generatedTagData
}
