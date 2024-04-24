import bcrypt from 'bcrypt'
// import { User as UserModel } from '$lib/db/models/user'
import { type User, type SafeUser } from '$lib/types/user'
import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY } from '$env/static/private'
import { generateID } from './id'
import { db } from '$lib/db/db'
import { users } from '$lib/db/schema'
import { eq } from 'drizzle-orm'

export type UserQuery = {
    email?: string
    id?: string
}

export type LoginUserResponse = {
    user: SafeUser | undefined
    token: string
    error: boolean
    message: string
}

export async function createUser(new_user: User): Promise<SafeUser> {
    try {
        const hashedPassword = await bcrypt.hash(new_user.password, 10)

        const user = await db
            .insert(users)
            .values({
                id: generateID(),
                name: new_user.name,
                email: new_user.email,
                password: hashedPassword,
                type: new_user.type,
            })
            .returning()

        const { id, name, email, type } = user[0] as SafeUser

        if (!id) {
            throw new Error(
                'There was an error creating the user with the given email address.'
            )
        }

        return { id, name, email, type }
    } catch (err) {
        console.error(err)
        return { id: '', name: '', email: '', type: '' }
    }
}

export async function findUserByEmail(user_email: string): Promise<User> {
    try {
        // const user = await UserModel.findOne({ where: { email: user_email } })
        const user = await db.query.users.findFirst({
            where: eq(users.email, user_email),
        })

        if (!user) {
            throw new Error('Could not find a user with the given email.')
        }

        return (await user) as User
    } catch (err) {
        return { id: '', email: '', name: '', type: '', password: '' }
    }
}

export async function findSafeUserByEmail(
    user_email: string
): Promise<SafeUser> {
    try {
        const { id, email, name, type } = await findUserByEmail(user_email)

        if (id == '') {
            throw new Error('Could not find user with given email.')
        }

        return { id, email, name, type }
    } catch (err) {
        return { id: '', email: '', name: '', type: '' }
    }
}

export async function loginUser(
    email: string,
    password: string
): Promise<LoginUserResponse> {
    const response: LoginUserResponse = {
        user: undefined,
        token: '',
        error: false,
        message: '',
    }

    try {
        const user = await findUserByEmail(email)
        if (!user.id || !(await bcrypt.compare(password, user.password))) {
            throw 'The provided email and password do not correspond to an account in our records.'
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            JWT_PRIVATE_KEY,
            {
                expiresIn: '1d',
            }
        )

        response.user = user
        response.token = token
        response.error = false
        response.message = 'User successfully authenticated.'
    } catch (err) {
        response.user = undefined
        response.error = true
        response.message = err as string
        console.error('user authentication failed: ', err)
    }

    return response
}
