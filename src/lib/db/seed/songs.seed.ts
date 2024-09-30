import { faker } from '@faker-js/faker'

import type { Song, SongArtist } from '$lib/types'

import * as schema from '../schema'

import { generateId } from '$lib/utils'

export async function generateSongData(
    songCount: number,
    albumData: (typeof schema.songs.$inferInsert)[]
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

export async function generateSongArtistData(
    songData: (typeof schema.songs.$inferInsert)[],
    albumArtistData: (typeof schema.albumArtists.$inferInsert)[]
): Promise<SongArtist[]> {
    // for every song
    const generatedSongArtistData: SongArtist[] = []

    songData.forEach(async (song) => {
        const songId = song.id
        const albumId = song.albumId

        // get the album artist data that corresponds to the album id
        const albumArtists = albumArtistData.filter((d) => d.albumId == albumId)

        // if we don't find anything, there is a problem
        if (albumArtists.length == 0) {
            console.error('problem seeding song artist data')
            return
        }

        console.log('should be alright seeding')
        let multiArtist: number = 0

        // if there is more than one artist, randomly determine if we're creating two song artist records or just one
        // as with albums
        if (albumArtists.length > 1) {
            multiArtist = Math.random() < 0.1 ? 1 : 0
        }

        console.log('alright setting up multi artist')
        // if multi artist == 1 this loop runs twice, generating two artists for a song
        for (let i = 0; i < multiArtist + 1; i++) {
            const id = await generateId()
            const artistId = albumArtists[i].artistId

            const aa: SongArtist = {
                id,
                artistId,
                songId,
            }

            console.log('creating: ', aa)

            generatedSongArtistData.push(aa)

            console.log(generatedSongArtistData)
        }
    })

    // for every song
    // get the album to which it belongs
    // get its artists via itsAlbumArtists
    console.log('generated song artist data: ', generatedSongArtistData)
    return generatedSongArtistData
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
