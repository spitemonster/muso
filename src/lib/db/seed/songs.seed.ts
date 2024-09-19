import { faker } from '@faker-js/faker'

import type { Song } from '$lib/types'

import * as schema from '../schema'

import { generateId } from '$lib/utils'

export async function generateSongData(
    songCount: number,
    albumData: (typeof schema.albums.$inferInsert)[]
): Promise<Song[]> {
    const generatedSongData: Song[] = []

    for (let i = 0; i < songCount; i++) {
        const id = await generateId()

        const album = faker.helpers.arrayElement(albumData)

        generatedSongData.push({
            id,
            title: faker.word.words(Math.round(Math.random() * 4) + 1),
            duration: faker.number.int({ min: 15, max: 900 }),
            albumId: album.id,
            artists: [],
        })
    }

    return generatedSongData
}
