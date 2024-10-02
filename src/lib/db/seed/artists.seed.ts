import { faker } from '@faker-js/faker'

import type { Artist } from '$lib/types'

import { generateId } from '$lib/utils'

export async function generateArtistData(
    artistCount: number,
    userIds: string[]
): Promise<Artist[]> {
    const generatedArtistData: Artist[] = []
    const assignedArtistNames = new Set<string>()

    for (let i = 0; i < artistCount; i++) {
        const id = await generateId()
        let name: string

        do {
            name = faker.word.words(Math.round(Math.random() * 2) + 1)
        } while (assignedArtistNames.has(name))

        assignedArtistNames.add(name)
        const slug = name.replaceAll(' ', '-')

        generatedArtistData.push({
            id,
            name,
            slug,
            url: faker.internet.url(),
            adminId: faker.helpers.arrayElement(userIds),
            biography: faker.word.words({
                count: {
                    min: 10,
                    max: 30,
                },
            }),
            profileImageUrl: `https://picsum.photos/200.webp?${Math.floor(Math.random() * 99)}`,
            location: `${faker.location.city()}, ${faker.location.country()}`,
        } as Artist)
    }

    return generatedArtistData
}
