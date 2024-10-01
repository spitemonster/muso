import { faker } from '@faker-js/faker'

import type { Artist } from '$lib/types'

import { generateId } from '$lib/utils'

export async function generateArtistData(
    artistCount: number,
    userIds: string[]
): Promise<Artist[]> {
    const generatedArtistData: Artist[] = []

    for (let i = 0; i < artistCount; i++) {
        const id = await generateId()

        generatedArtistData.push({
            id,
            name: faker.word.words(Math.round(Math.random() * 2) + 1),
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
