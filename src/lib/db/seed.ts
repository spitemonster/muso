// import { drizzle } from 'drizzle-orm/node-postgres'
// import { db } from './db'
import { users, artists, albums, songs } from './schema'
import { faker } from '@faker-js/faker'
import { generateId } from '$lib/utils'

const userCount = 10
const artistCount = 5
const albumCount = 15
const songCount = 100

export const userData: (typeof users.$inferInsert)[] = []
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

export const artistData: (typeof artists.$inferInsert)[] = []
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

export const albumData: (typeof albums.$inferInsert)[] = []
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

export const songData: (typeof songs.$inferInsert)[] = []
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

// const user = await db
//     .insert(users)
//     .values({
//         id: await generateID(),
//         name: new_user.name,
//         email: new_user.email,
//         password: hashedPassword,
//         type: new_user.type,
//     })
//     .returning()
