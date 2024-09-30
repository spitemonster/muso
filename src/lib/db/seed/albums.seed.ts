import { faker } from '@faker-js/faker'

import type { Album, AlbumArtist } from '$lib/types'
import * as schema from '../schema'

import { generateId } from '$lib/utils'

export async function generateAlbumData(albumCount: number): Promise<Album[]> {
    const generatedAlbumData: Album[] = []

    for (let i = 0; i < albumCount; i++) {
        const id = await generateId()

        generatedAlbumData.push({
            id,
            title: faker.word.words(Math.round(Math.random() * 4) + 1),
            duration: faker.number.int({ min: 900, max: 4800 }),
            coverUrl: `https://picsum.photos/200.webp?${Math.floor(Math.random() * 99)}`,
            songs: [],
            artists: [],
        })
    }

    return generatedAlbumData
}

export async function generateAlbumArtistData(
    albumData: (typeof schema.albums.$inferInsert)[],
    artistData: (typeof schema.artists.$inferInsert)[]
): Promise<AlbumArtist[]> {
    const generatedAlbumArtistData: AlbumArtist[] = []

    // for every album
    // determine if it has one or two artists
    // create albumArtist data
    albumData.forEach(async (album) => {
        // this should only return 1 about 10% of the time
        const multiArtist: number = Math.random() < 0.1 ? 1 : 0

        // if multi artist == 1 this loop runs twice, generating two artists for an album
        for (let i = 0; i < multiArtist + 1; i++) {
            const id = await generateId()
            const albumId = album.id
            const artist = faker.helpers.arrayElement(artistData)
            const artistId = artist.id

            const aa: AlbumArtist = {
                id,
                albumId,
                artistId,
            }

            generatedAlbumArtistData.push(aa)
        }
    })

    return generatedAlbumArtistData
}
