import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
// import { DB_DATABASE, DB_HOST, DB_USER, DB_PORT } from '$env/static/private'
import * as schema from '$lib/db/schema'
import * as dotenv from 'dotenv'
import { users, artists, albums, songs, tags, artistTags } from './schema'
import { faker } from '@faker-js/faker'
import { generateId } from '$lib/utils'

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

    const userData: (typeof users.$inferInsert)[] = []
    const userIds: string[] = []

    for (let i = 0; i < userCount; i++) {
        const id = await generateId()
        if (i < 5) {
            userIds.push(id)
        }

        userData.push({
            id,
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
            email: faker.internet.email(),
            password: faker.string.sample(60),
            type: i < 5 ? 'user' : 'artist',
        })
    }

    const artistData: (typeof artists.$inferInsert)[] = []
    const artistIds: string[] = []

    for (let i = 0; i < artistCount; i++) {
        const id = await generateId()
        artistIds.push(id)

        artistData.push({
            id,
            name: faker.word.words(Math.round(Math.random() * 2) + 1),
            url: faker.internet.url(),
            adminId: faker.helpers.arrayElement(userIds),
        })
    }

    const albumData: (typeof albums.$inferInsert)[] = []
    const albumIds: string[] = []

    for (let i = 0; i < albumCount; i++) {
        const id = await generateId()
        albumIds.push(id)

        albumData.push({
            id,
            title: faker.word.words(Math.round(Math.random() * 4) + 1),
            duration: faker.number.int({ min: 900, max: 4800 }),
            artistId: faker.helpers.arrayElement(artistIds),
            coverUrl:
                Math.random() > 0.1 ? 'https://placekitten.com/1000/1000' : '',
        })
    }

    const songData: (typeof songs.$inferInsert)[] = []
    const songIds: string[] = []

    for (let i = 0; i < songCount; i++) {
        const id = await generateId()
        songIds.push(id)

        const album = faker.helpers.arrayElement(albumData)

        songData.push({
            id,
            title: faker.word.words(Math.round(Math.random() * 4) + 1),
            duration: faker.number.int({ min: 15, max: 900 }),
            albumId: album.id,
            artistId: album.artistId,
        })
    }

    const tagData: (typeof tags.$inferInsert)[] = []
    const tagIds: string[] = []

    for (let i = 0; i < tagCount; i++) {
        const id = await generateId()
        const name = faker.word.words(
            Math.max(Math.round(Math.random() * 2), 1)
        )
        const slug = name.replaceAll(' ', '-')

        tagIds.push(id)

        tagData.push({
            id,
            name,
            slug,
        })
    }

    const artistTagData: (typeof artistTags.$inferInsert)[] = []
    const artistTagIds: string[] = []

    for (let i = 0; i < artistTagCount; i++) {
        const id = await generateId()
        const ad = faker.helpers.arrayElement(artistData)
        const tag = faker.helpers.arrayElement(tagData)

        artistTagIds.push(id)

        artistTagData.push({
            id,
            artistId: ad.id,
            tagId: tag.id,
        })
    }

    await db.insert(users).values(userData)
    await db.insert(artists).values(artistData)
    await db.insert(albums).values(albumData)
    await db.insert(songs).values(songData)
    await db.insert(tags).values(tagData)
    await db.insert(artistTags).values(artistTagData)

    client.end()
}

main()
