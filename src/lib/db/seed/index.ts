import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
// import { DB_DATABASE, DB_HOST, DB_USER, DB_PORT } from '$env/static/private'
import * as schema from '$lib/db/schema'
import * as dotenv from 'dotenv'

import { generateUserData } from './users.seed'
import { generateArtistData } from './artists.seed'
import { generateAlbumArtistData, generateAlbumData } from './albums.seed'
import { generateSongArtistData, generateSongData } from './songs.seed'
import { generateTagData } from './tags.seed'
import { generateArtistTagData } from './artistTags.seed'

dotenv.config({ path: './.env' })

const main = async () => {
    const client = new pg.Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
    })

    client.connect()

    const db = drizzle(client, { schema })

    const userCount = 10
    const artistCount = 25
    const albumCount = 50
    const songCount = 500
    const tagCount = 25
    const artistTagCount = 25

    const userData: (typeof schema.users.$inferInsert)[] =
        await generateUserData(userCount)

    const userIds: string[] = userData.map((u) => u.id)

    const artistData: (typeof schema.artists.$inferInsert)[] =
        await generateArtistData(artistCount, userIds)
    // const artistIds: string[] = artistData.map((a) => a.id)

    const albumData: (typeof schema.albums.$inferInsert)[] =
        await generateAlbumData(albumCount)
    // const albumIds: string[] = albumData.map((a) => a.id)

    const albumArtistData: (typeof schema.albumArtists.$inferInsert)[] =
        await generateAlbumArtistData(albumData, artistData)

    const songData: (typeof schema.songs.$inferInsert)[] =
        await generateSongData(songCount, albumData)
    // const songIds: string[] = songData.map((s) => s.id)

    const tagData: (typeof schema.tags.$inferInsert)[] =
        await generateTagData(tagCount)
    // const tagIds: string[] = tagData.map((t) => t.id)

    const artistTagData: (typeof schema.artistTags.$inferInsert)[] =
        await generateArtistTagData(artistTagCount, artistData, tagData)
    // const artistTagIds: string[] = artistTagData.map((t) => t.id)

    const songArtistData: (typeof schema.songArtists.$inferInsert)[] =
        await generateSongArtistData(songData, albumArtistData)

    await db.insert(schema.users).values(userData)
    await db.insert(schema.artists).values(artistData)
    await db.insert(schema.albums).values(albumData)
    await db.insert(schema.songs).values(songData)
    await db.insert(schema.tags).values(tagData)
    await db.insert(schema.artistTags).values(artistTagData)
    await db.insert(schema.albumArtists).values(albumArtistData)
    await db.insert(schema.songArtists).values(songArtistData)

    client.end()
}

main()
