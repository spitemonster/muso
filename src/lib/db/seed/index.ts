import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
// import { DB_DATABASE, DB_HOST, DB_USER, DB_PORT } from '$env/static/private'
import * as schema from '$lib/db/schema'
import * as dotenv from 'dotenv'
import {
    users,
    artists,
    albums,
    songs,
    tags,
    artistTags,
    albumArtists,
} from '../schema'

import { generateUserData } from './users.seed'
import { generateArtistData } from './artists.seed'
import { generateAlbumArtistData, generateAlbumData } from './albums.seed'
import { generateSongData } from './songs.seed'
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

    const userData: (typeof users.$inferInsert)[] =
        await generateUserData(userCount)

    const userIds: string[] = userData.map((u) => u.id)

    const artistData: (typeof artists.$inferInsert)[] =
        await generateArtistData(artistCount, userIds)
    // const artistIds: string[] = artistData.map((a) => a.id)

    const albumData: (typeof albums.$inferInsert)[] =
        await generateAlbumData(albumCount)
    // const albumIds: string[] = albumData.map((a) => a.id)

    const albumArtistData: (typeof albumArtists.$inferInsert)[] =
        await generateAlbumArtistData(albumData, artistData)

    const songData: (typeof songs.$inferInsert)[] = await generateSongData(
        songCount,
        albumData
    )
    // const songIds: string[] = songData.map((s) => s.id)

    const tagData: (typeof tags.$inferInsert)[] =
        await generateTagData(tagCount)
    // const tagIds: string[] = tagData.map((t) => t.id)

    const artistTagData: (typeof artistTags.$inferInsert)[] =
        await generateArtistTagData(artistTagCount, artistData, tagData)
    // const artistTagIds: string[] = artistTagData.map((t) => t.id)

    await db.insert(users).values(userData)
    await db.insert(artists).values(artistData)
    await db.insert(albums).values(albumData)
    await db.insert(songs).values(songData)
    await db.insert(tags).values(tagData)
    await db.insert(artistTags).values(artistTagData)
    await db.insert(albumArtists).values(albumArtistData)

    client.end()
}

main()
