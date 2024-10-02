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
    Song,
    AlbumArtist,
    SongArtist,
    Tag,
    ArtistTag,
    AlbumTag,
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

        const userCount = 10
        const artistCount = 100
        const tagCount = 1000

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

        const albumData: (typeof schema.albums.$inferInsert)[] = []
        const albumArtistData: (typeof schema.albumArtists.$inferInsert)[] = []
        const songData: (typeof schema.songs.$inferInsert)[] = []
        const songArtistData: (typeof schema.songArtists.$inferInsert)[] = []

        for await (const artist of artistData) {
            const tagCount = Math.ceil(Math.random() * 5)

            const artistTags: ArtistTag[] = new Array<ArtistTag>(tagCount)

            for await (let artistTag of artistTags) {
                const tag: Tag = faker.helpers.arrayElement(tagData) as Tag

                artistTag = {
                    id: await generateId(),
                    artistId: artist.id,
                    tagId: tag.id,
                }

                artistTagData.push(artistTag)
            }

            const albumCount = Math.ceil(Math.random() * 7)
            const artistAlbums: Album[] = new Array<Album>(albumCount)

            for await (let album of artistAlbums) {
                album = {
                    id: await generateId(),
                    title: faker.word.words(Math.ceil(Math.random() * 4)),
                    coverUrl: `https://picsum.photos/200.webp?${Math.floor(Math.random() * 99)}`,
                    duration: 0,
                    songs: [],
                    artists: [],
                }

                const albumArtist: AlbumArtist = {
                    id: await generateId(),
                    artistId: artist.id,
                    albumId: album.id,
                }

                const songCount = Math.floor(Math.random() * 11) + 2

                const albumSongs: Song[] = new Array<Song>(songCount)

                // create songs for album
                for await (let song of albumSongs) {
                    song = {
                        id: await generateId(),
                        title: faker.word.words(Math.ceil(Math.random() * 4)),
                        albumId: album.id,
                        duration: faker.number.int({ min: 11, max: 1200 }),
                        artists: [],
                    }

                    const songArtist: SongArtist = {
                        id: await generateId(),
                        artistId: artist.id,
                        songId: song.id,
                    }

                    album.duration += song.duration
                    songData.push(song)
                    songArtistData.push(songArtist)
                }

                const albumTagCount = Math.ceil(Math.random() * 7)
                const albumTags = new Array<AlbumTag>(albumTagCount)

                for await (let albumTag of albumTags) {
                    const tag = faker.helpers.arrayElement(tagData) as Tag

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
        await db.insert(schema.songs).values(songData)
        await db.insert(schema.songArtists).values(songArtistData)
        await db.insert(schema.tags).values(tagData)
        await db.insert(schema.artistTags).values(artistTagData)
        await db.insert(schema.albumTags).values(albumTagData)

        client.end()
    } catch (err) {
        console.error(err)
    }
}

main()
