import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import * as schema from '$lib/db/schema'
import * as dotenv from 'dotenv'

import { generateUserData } from './users.seed'
import { generateArtistData } from './artists.seed'
import { generateTagData } from './tags.seed'

import { generateId } from '$lib/utils'

import type {
    Album,
    Track,
    AlbumArtist,
    TrackArtist,
    Tag,
    ArtistTag,
    AlbumTag,
    TrackTag,
} from '$lib/types'
import { faker } from '@faker-js/faker'

dotenv.config({ path: './.env' })

const main = async () => {
    try {
        const client = new pg.Client({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
        })

        client.connect()

        const db = drizzle(client, { schema })

        const userCount = 130
        const artistCount = 200
        const tagCount = 200

        const userData: (typeof schema.users.$inferInsert)[] =
            (await generateUserData(
                userCount
            )) as (typeof schema.users.$inferInsert)[]
        const userIds: string[] = userData.map((u) => u.id)

        const artistData: (typeof schema.artists.$inferInsert)[] =
            await generateArtistData(artistCount, userIds)

        const tagData: (typeof schema.tags.$inferInsert)[] =
            await generateTagData(tagCount)

        const artistTagData: (typeof schema.artistTags.$inferInsert)[] = []
        const albumTagData: (typeof schema.albumTags.$inferInsert)[] = []
        const trackTagData: (typeof schema.trackTags.$inferInsert)[] = []

        const albumData: (typeof schema.albums.$inferInsert)[] = []
        const albumArtistData: (typeof schema.albumArtists.$inferInsert)[] = []
        const trackData: (typeof schema.tracks.$inferInsert)[] = []
        const trackArtistData: (typeof schema.trackArtists.$inferInsert)[] = []

        // for every artist generate
        //    a random number (1-6) of artistTag records
        //    a random number (1-8) of album records
        //    for every album generate
        //        an albumArtist record
        //        a random number (1-6) of albumTag records
        //        a random number (2-13) of tracks
        //        for every track generate
        //            a trackArtist record

        for await (const artist of artistData) {
            // generate artist tags
            const tagCount: number = Math.ceil(Math.random() * 5)
            const artistTags: ArtistTag[] = new Array<ArtistTag>(tagCount)
            const assignedArtistTagIds = new Set<string>()

            for await (let artistTag of artistTags) {
                let tag: Tag

                do {
                    tag = faker.helpers.arrayElement(tagData) as Tag
                } while (assignedArtistTagIds.has(tag.id))

                assignedArtistTagIds.add(tag.id)

                artistTag = {
                    id: await generateId(),
                    artistId: artist.id,
                    tagId: tag.id,
                }

                artistTagData.push(artistTag)
            }

            // generate albums
            const albumCount = Math.ceil(Math.random() * 4)
            const artistAlbums: Album[] = new Array<Album>(albumCount)
            for await (let album of artistAlbums) {
                const albumTitle = faker.word.words(
                    Math.ceil(Math.random() * 4)
                )
                const albumSlug = albumTitle.replaceAll(' ', '-')

                album = {
                    id: await generateId(),
                    title: albumTitle,
                    slug: albumSlug,
                    coverUrl: `https://picsum.photos/200.webp?${Math.floor(Math.random() * 99)}`,
                    duration: 0,
                    tracks: [],
                    artists: [],
                }

                const albumArtist: AlbumArtist = {
                    id: await generateId(),
                    artistId: artist.id,
                    albumId: album.id,
                }

                // generate tracks
                const trackCount = Math.floor(Math.random() * 8) + 2
                const albumTracks: Track[] = new Array<Track>(trackCount)
                for await (let track of albumTracks) {
                    const trackTitle = faker.word.words(
                        Math.ceil(Math.random() * 4)
                    )
                    const trackSlug = trackTitle.replaceAll(' ', '-')

                    track = {
                        id: await generateId(),
                        title: trackTitle,
                        slug: trackSlug,
                        albumId: album.id,
                        duration: faker.number.int({ min: 11, max: 1200 }),
                        artists: [],
                    }

                    const trackArtist: TrackArtist = {
                        id: await generateId(),
                        artistId: artist.id,
                        trackId: track.id,
                    }

                    album.duration += track.duration
                    trackData.push(track)
                    trackArtistData.push(trackArtist)

                    const trackTagCount = Math.ceil(Math.random() * 7)
                    const trackTags = new Array<TrackTag>(trackTagCount)
                    const assignedTrackTagIds = new Set<string>()

                    for await (let trackTag of trackTags) {
                        let tag: Tag

                        do {
                            tag = faker.helpers.arrayElement(tagData) as Tag
                        } while (assignedTrackTagIds.has(tag.id))

                        assignedTrackTagIds.add(tag.id)

                        trackTag = {
                            id: await generateId(),
                            trackId: track.id,
                            tagId: tag.id,
                        }

                        trackTagData.push(trackTag)
                    }
                }

                const albumTagCount = Math.ceil(Math.random() * 7)
                const albumTags = new Array<AlbumTag>(albumTagCount)
                const assignedAlbumTagIds = new Set<string>()

                for await (let albumTag of albumTags) {
                    let tag: Tag

                    do {
                        tag = faker.helpers.arrayElement(tagData) as Tag
                    } while (assignedAlbumTagIds.has(tag.id))

                    assignedAlbumTagIds.add(tag.id)

                    albumTag = {
                        id: await generateId(),
                        albumId: album.id,
                        tagId: tag.id,
                    }

                    albumTagData.push(albumTag)
                }

                albumData.push(album)
                albumArtistData.push(albumArtist)
            }
        }

        await db.insert(schema.users).values(userData)
        await db.insert(schema.artists).values(artistData)
        await db.insert(schema.albums).values(albumData)
        await db.insert(schema.albumArtists).values(albumArtistData)
        await db.insert(schema.tracks).values(trackData)
        await db.insert(schema.trackArtists).values(trackArtistData)
        await db.insert(schema.tags).values(tagData)
        await db.insert(schema.artistTags).values(artistTagData)
        await db.insert(schema.albumTags).values(albumTagData)
        await db.insert(schema.trackTags).values(trackTagData)

        client.end()
    } catch (err) {
        console.error(err)
    }
}

main()
