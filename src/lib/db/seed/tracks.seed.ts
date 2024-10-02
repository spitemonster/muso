import { faker } from '@faker-js/faker'

import type { Track, TrackArtist } from '$lib/types'

import * as schema from '../schema'

import { generateId } from '$lib/utils'

export async function generateTrackData(
    trackCount: number,
    albumData: (typeof schema.tracks.$inferInsert)[]
): Promise<Track[]> {
    const generatedTrackData: Track[] = []

    for (let i = 0; i < trackCount; i++) {
        const id = await generateId()

        const album = faker.helpers.arrayElement(albumData)

        generatedTrackData.push({
            id,
            title: faker.word.words(Math.round(Math.random() * 4) + 1),
            duration: faker.number.int({ min: 15, max: 900 }),
            albumId: album.id,
            artists: [],
        })
    }

    return generatedTrackData
}

export async function generateTrackArtistData(
    trackData: (typeof schema.tracks.$inferInsert)[],
    albumArtistData: (typeof schema.albumArtists.$inferInsert)[]
): Promise<TrackArtist[]> {
    // for every track
    const generatedTrackArtistData: TrackArtist[] = []

    trackData.forEach(async (track) => {
        const trackId = track.id
        const albumId = track.albumId

        // get the album artist data that corresponds to the album id
        const albumArtists = albumArtistData.filter((d) => d.albumId == albumId)

        // if we don't find anything, there is a problem
        if (albumArtists.length == 0) {
            console.error('problem seeding track artist data')
            return
        }

        let multiArtist: number = 0

        // if there is more than one artist, randomly determine if we're creating two track artist records or just one
        // as with albums
        if (albumArtists.length > 1) {
            multiArtist = Math.random() < 0.1 ? 1 : 0
        }

        // if multi artist == 1 this loop runs twice, generating two artists for a track
        for (let i = 0; i < multiArtist + 1; i++) {
            const id = await generateId()
            const artistId = albumArtists[i].artistId

            const aa: TrackArtist = {
                id,
                artistId,
                trackId,
            }

            generatedTrackArtistData.push(aa)
        }
    })

    // for every track
    // get the album to which it belongs
    // get its artists via itsAlbumArtists
    return generatedTrackArtistData
}

// export async function generateAlbumArtistData(
//     albumData: (typeof schema.albums.$inferInsert)[],
//     artistData: (typeof schema.artists.$inferInsert)[]
// ): Promise<AlbumArtist[]> {
//     const generatedAlbumArtistData: AlbumArtist[] = []

//     albumData.forEach(async (album) => {
//         // this should only return 1 about 10% of the time
//         const multiArtist: number = Math.random() < 0.1 ? 1 : 0

//         // if multi artist == 1 this loop runs twice, generating two artists for an album
//         for (let i = 0; i < multiArtist + 1; i++) {
//             const id = await generateId()
//             const albumId = album.id
//             const artist = faker.helpers.arrayElement(artistData)
//             const artistId = artist.id

//             const aa: AlbumArtist = {
//                 id,
//                 albumId,
//                 artistId,
//             }

//             generatedAlbumArtistData.push(aa)
//         }
//     })

//     return generatedAlbumArtistData
// }
