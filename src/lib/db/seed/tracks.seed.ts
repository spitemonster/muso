import { faker } from '@faker-js/faker'

import type { Track, TrackArtist } from '$lib/types'

import * as schema from '../schema'

import { generateId } from '$lib/utils'

export async function generateTrackData(
    trackCount: number,
    collectionData: (typeof schema.tracks.$inferInsert)[]
): Promise<Track[]> {
    const generatedTrackData: Track[] = []

    for (let i = 0; i < trackCount; i++) {
        const id = await generateId()

        const collection = faker.helpers.arrayElement(collectionData)

        generatedTrackData.push({
            id,
            title: faker.word.words(Math.round(Math.random() * 4) + 1),
            slug: '', // just to shut up the error since this is not currently being used
            duration: faker.number.int({ min: 15, max: 900 }),
            collectionId: collection.id,
            artists: [],
        })
    }

    return generatedTrackData
}

export async function generateTrackArtistData(
    trackData: (typeof schema.tracks.$inferInsert)[],
    collectionArtistData: (typeof schema.collectionArtists.$inferInsert)[]
): Promise<TrackArtist[]> {
    // for every track
    const generatedTrackArtistData: TrackArtist[] = []

    trackData.forEach(async (track) => {
        const trackId = track.id
        const collectionId = track.collectionId

        // get the collection artist data that corresponds to the collection id
        const collectionArtists = collectionArtistData.filter(
            (d) => d.collectionId == collectionId
        )

        // if we don't find anything, there is a problem
        if (collectionArtists.length == 0) {
            console.error('problem seeding track artist data')
            return
        }

        let multiArtist: number = 0

        // if there is more than one artist, randomly determine if we're creating two track artist records or just one
        // as with collections
        if (collectionArtists.length > 1) {
            multiArtist = Math.random() < 0.1 ? 1 : 0
        }

        // if multi artist == 1 this loop runs twice, generating two artists for a track
        for (let i = 0; i < multiArtist + 1; i++) {
            const id = await generateId()
            const artistId = collectionArtists[i].artistId

            const aa: TrackArtist = {
                id,
                artistId,
                trackId,
            }

            generatedTrackArtistData.push(aa)
        }
    })

    // for every track
    // get the collection to which it belongs
    // get its artists via itsCollectionArtists
    return generatedTrackArtistData
}

// export async function generateCollectionArtistData(
//     collectionData: (typeof schema.collections.$inferInsert)[],
//     artistData: (typeof schema.artists.$inferInsert)[]
// ): Promise<CollectionArtist[]> {
//     const generatedCollectionArtistData: CollectionArtist[] = []

//     collectionData.forEach(async (collection) => {
//         // this should only return 1 about 10% of the time
//         const multiArtist: number = Math.random() < 0.1 ? 1 : 0

//         // if multi artist == 1 this loop runs twice, generating two artists for an collection
//         for (let i = 0; i < multiArtist + 1; i++) {
//             const id = await generateId()
//             const collectionId = collection.id
//             const artist = faker.helpers.arrayElement(artistData)
//             const artistId = artist.id

//             const aa: CollectionArtist = {
//                 id,
//                 collectionId,
//                 artistId,
//             }

//             generatedCollectionArtistData.push(aa)
//         }
//     })

//     return generatedCollectionArtistData
// }
