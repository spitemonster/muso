import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import * as schema from '$lib/db/schema'
import * as dotenv from 'dotenv'

import { generateUserData } from './users.seed'
import { generateArtistData } from './artists.seed'
import { generateTagData } from './tags.seed'

import { generateId } from '$lib/utils'

import type {
    Collection,
    Track,
    CollectionArtist,
    TrackArtist,
    Tag,
    ArtistTag,
    CollectionTag,
    TrackTag,
    TrackCollection,
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

        const artistData = (await generateArtistData(
            artistCount,
            userIds
        )) as (typeof schema.artists.$inferInsert)[]

        const tagData = (await generateTagData(
            tagCount
        )) as (typeof schema.tags.$inferInsert)[]

        const artistTagData: (typeof schema.artistTags.$inferInsert)[] = []
        const collectionTagData: (typeof schema.collectionTags.$inferInsert)[] =
            []
        const trackTagData: (typeof schema.trackTags.$inferInsert)[] = []

        const collectionData: (typeof schema.collections.$inferInsert)[] = []
        const collectionArtistData: (typeof schema.collectionArtists.$inferInsert)[] =
            []
        const trackData: (typeof schema.tracks.$inferInsert)[] = []
        const trackArtistData: (typeof schema.trackArtists.$inferInsert)[] = []
        const trackCollectionsData: (typeof schema.trackCollections.$inferInsert)[] =
            []
        const artistAdminData: (typeof schema.artistAdmins.$inferInsert)[] = []

        // for every artist generate
        //    a random number (1-6) of artistTag records
        //    a random number (1-8) of collection records
        //    for every collection generate
        //        an collectionArtist record
        //        a random number (1-6) of collectionTag records
        //        a random number (2-13) of tracks
        //        for every track generate
        //            a trackArtist record

        for await (const artist of artistData) {
            // generate artist tags
            const tagCount: number = Math.ceil(Math.random() * 5)
            const artistTags: ArtistTag[] = new Array<ArtistTag>(tagCount)
            const assignedArtistTagIds = new Set<string>()
            const admin = faker.helpers.arrayElement(userData)

            const artistAdmin = {
                id: await generateId(),
                artistId: artist!.id,
                userId: admin.id,
            }

            artistAdminData.push(artistAdmin)

            for await (let artistTag of artistTags) {
                let tag: Tag

                do {
                    tag = faker.helpers.arrayElement(tagData) as Tag
                } while (assignedArtistTagIds.has(tag!.id))

                assignedArtistTagIds.add(tag!.id)

                artistTag = {
                    id: await generateId(),
                    artistId: artist!.id,
                    tagId: tag!.id,
                }

                artistTagData.push(artistTag)
            }

            // generate collections
            const collectionCount = Math.ceil(Math.random() * 4)
            const artistCollections: Collection[] = new Array<Collection>(
                collectionCount
            )
            for await (let collection of artistCollections) {
                const collectionTitle = faker.word.words(
                    Math.ceil(Math.random() * 4)
                )
                const collectionSlug = collectionTitle.replaceAll(' ', '-')

                collection = {
                    id: await generateId(),
                    title: collectionTitle,
                    slug: collectionSlug,
                    coverUrl: `https://picsum.photos/200.webp?${Math.floor(Math.random() * 99)}`,
                    duration: 0,
                    tracks: [],
                    artists: [],
                }

                const collectionArtist: CollectionArtist = {
                    id: await generateId(),
                    artistId: artist!.id,
                    collectionId: collection.id,
                }

                // generate tracks
                const trackCount = Math.floor(Math.random() * 8) + 2
                const collectionTracks: Track[] = new Array<Track>(trackCount)
                for await (let track of collectionTracks) {
                    const trackTitle = faker.word.words(
                        Math.ceil(Math.random() * 4)
                    )
                    const trackSlug = trackTitle.replaceAll(' ', '-')

                    track = {
                        id: await generateId(),
                        title: trackTitle,
                        slug: trackSlug,
                        duration: faker.number.int({ min: 11, max: 1200 }),
                        artists: [],
                    }

                    const trackArtist: TrackArtist = {
                        id: await generateId(),
                        artistId: artist!.id,
                        trackId: track.id,
                    }

                    const trackCollectionRecord: TrackCollection = {
                        id: await generateId(),
                        trackId: track.id,
                        collectionId: collection.id,
                    }

                    collection.duration += track.duration
                    trackData.push(track)
                    trackArtistData.push(trackArtist)
                    trackCollectionsData.push(trackCollectionRecord)

                    const trackTagCount = Math.ceil(Math.random() * 7)
                    const trackTags = new Array<TrackTag>(trackTagCount)
                    const assignedTrackTagIds = new Set<string>()

                    for await (let trackTag of trackTags) {
                        let tag: Tag

                        do {
                            tag = faker.helpers.arrayElement(tagData) as Tag
                        } while (assignedTrackTagIds.has(tag!.id))

                        assignedTrackTagIds.add(tag!.id)

                        trackTag = {
                            id: await generateId(),
                            trackId: track.id,
                            tagId: tag!.id,
                        }

                        trackTagData.push(trackTag)
                    }
                }

                const collectionTagCount = Math.ceil(Math.random() * 7)
                const collectionTags = new Array<CollectionTag>(
                    collectionTagCount
                )
                const assignedCollectionTagIds = new Set<string>()

                for await (let collectionTag of collectionTags) {
                    let tag: Tag

                    do {
                        tag = faker.helpers.arrayElement(tagData) as Tag
                    } while (assignedCollectionTagIds.has(tag!.id))

                    assignedCollectionTagIds.add(tag!.id)

                    collectionTag = {
                        id: await generateId(),
                        collectionId: collection.id,
                        tagId: tag!.id,
                    }

                    collectionTagData.push(collectionTag)
                }

                collectionData.push(collection)
                collectionArtistData.push(collectionArtist)
            }
        }

        await db.insert(schema.users).values(userData)
        await db.insert(schema.artists).values(artistData)
        await db.insert(schema.collections).values(collectionData)
        await db.insert(schema.collectionArtists).values(collectionArtistData)
        await db.insert(schema.tracks).values(trackData)
        await db.insert(schema.trackArtists).values(trackArtistData)
        await db.insert(schema.trackCollections).values(trackCollectionsData)
        await db.insert(schema.tags).values(tagData)
        await db.insert(schema.artistTags).values(artistTagData)
        await db.insert(schema.collectionTags).values(collectionTagData)
        await db.insert(schema.trackTags).values(trackTagData)
        await db.insert(schema.artistAdmins).values(artistAdminData)

        client.end()
    } catch (err) {
        console.error(err)
    }
}

main()
