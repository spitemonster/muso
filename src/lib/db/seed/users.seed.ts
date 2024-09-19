import { faker } from '@faker-js/faker'

import type { User } from '$lib/types'

import { generateId } from '$lib/utils'

export async function generateUserData(userCount: number): Promise<User[]> {
    const generatedUserData: User[] = []

    for (let i = 0; i < userCount; i++) {
        const id = await generateId()

        generatedUserData.push({
            id,
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
            email: faker.internet.email(),
            password: faker.string.sample(60),
            type: i < 5 ? 'user' : 'artist',
        })
    }

    return generatedUserData
}
