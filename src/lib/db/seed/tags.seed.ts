import { faker } from '@faker-js/faker'

import type { Tag } from '$lib/types'

import { generateId } from '$lib/utils'

export async function generateTagData(tagCount: number): Promise<Tag[]> {
    const generatedTagData: Tag[] = []
    const assignedTagNames = new Set<string>()

    for (let i = 0; i < tagCount; i++) {
        let name: string

        do {
            name = faker.word.words(Math.max(Math.round(Math.random() * 2), 1))
        } while (assignedTagNames.has(name))

        assignedTagNames.add(name)

        const id = await generateId()
        const slug = name.replaceAll(' ', '-')

        generatedTagData.push({
            id,
            name,
            slug,
        })
    }

    return generatedTagData
}
