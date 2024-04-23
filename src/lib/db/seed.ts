// import { drizzle } from 'drizzle-orm/node-postgres'
// import { db } from './db'
import { users } from './schema'
import { faker } from '@faker-js/faker'
import { generateID } from '$lib/services/id'

const userData: (typeof users.$inferInsert)[] = []

for (let i = 0; i < 10; i++) {
    userData.push({
        id: generateID(),
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        email: faker.internet.email(),
        password: faker.string.sample(60),
        type: i < 5 ? 'user' : 'artist',
    })
}

// const user = await db
//             .insert(users)
//             .values({
//                 id: generateID(),
//                 name: new_user.name,
//                 email: new_user.email,
//                 password: hashedPassword,
//                 type: new_user.type,
//             })
//             .returning()
