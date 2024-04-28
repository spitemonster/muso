import { db } from '$lib/db'
import { users } from '$lib/db/schema'
import type { User, SafeUser, NewUser } from '$lib/types'
import { eq } from 'drizzle-orm'
import { generateId } from '$lib/utils'

export async function createUser(newUser: NewUser): Promise<SafeUser | null> {
    const res = await db
        .insert(users)
        .values({
            id: await generateId(),
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            type: newUser.type,
        })
        .returning()

    const createdUser = res[0]

    if (!createdUser) {
        return null
    }

    return createdUser as SafeUser
}

export async function getUserFromDbById(id: string): Promise<User | null> {
    try {
        if (id === '') {
            throw new Error('No user ID given.')
        }

        const user = await db.query.users.findFirst({
            where: eq(users.id, id),
        })

        if (!user) throw new Error(`No user found with id: ${id}.`)

        return user as User
    } catch (err) {
        console.error(err)
        return null
    }
}

export async function getUserFromDbByEmail(
    email: string
): Promise<User | null> {
    try {
        if (email === '') {
            throw new Error('No user email given.')
        }

        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        })

        if (!user) throw new Error(`No user found with email: ${email}.`)

        return user as User
    } catch (err) {
        console.error(err)
        return null
    }
}

export function userToSafeUser(user: User | null): SafeUser | null {
    if (!user) {
        return null
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
    } as SafeUser
}
