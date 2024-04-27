import type { NewUser, SafeUser, User } from '$lib/types'
import bcrypt from 'bcrypt'
import { db } from '$lib/db/db'
import { users } from '$lib/db/schema'
import { generateId } from '$lib/utils'
import { eq } from 'drizzle-orm'
import type { LoginUserResponse } from '$lib/types'
import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY } from '$env/static/private'

export class UserController {
    static async CreateUser(newUser: NewUser): Promise<SafeUser> {
        try {
            const hashedPassword = await bcrypt.hash(newUser.password, 10)

            const user = await db
                .insert(users)
                .values({
                    id: await generateId(),
                    name: newUser.name,
                    email: newUser.email,
                    password: hashedPassword,
                    type: newUser.type,
                })
                .returning()

            const u = user[0] as SafeUser

            if (!u.id) {
                throw new Error(
                    'There was an error creating the user with the given email address.'
                )
            }

            return u
        } catch (err) {
            return { id: '', name: '', email: '', type: '' } as SafeUser
        }
    }

    static async FindUserByEmail(email: string): Promise<User> {
        try {
            const user = await db.query.users.findFirst({
                where: eq(users.email, email),
            })

            if (!user) {
                throw new Error('Could not find a user with the given email.')
            }

            return (await user) as User
        } catch (err) {
            return { id: '', email: '', name: '', type: '', password: '' }
        }
    }

    static async FindSafeUserByEmail(email: string): Promise<SafeUser> {
        try {
            // this is not a good way to do this, it is just late and I haven't really thought through it.
            const user = (await UserController.FindUserByEmail(email)) as User

            if (user.id == '') {
                throw new Error('Could not find user with given email.')
            }

            return {
                id: user.id,
                email: user.email,
                name: user.name,
                type: user.type,
            } as SafeUser
        } catch (err) {
            return { id: '', email: '', name: '', type: '' }
        }
    }

    static async FindUserByID(id: string): Promise<User> {
        try {
            const user = await db.query.users.findFirst({
                where: eq(users.id, id),
            })

            if (!user) {
                throw new Error('Could not find a user with the given email.')
            }

            return (await user) as User
        } catch (err) {
            return { id: '', email: '', name: '', type: '', password: '' }
        }
    }

    static async FindSafeUserByID(id: string): Promise<SafeUser> {
        try {
            const user = await db.query.users.findFirst({
                where: eq(users.id, id),
            })

            if (!user) {
                throw new Error('Could not find a user with the given email.')
            }

            return (await user) as SafeUser
        } catch (err) {
            return { id: '', email: '', name: '', type: '' }
        }
    }

    static async LoginUser(
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
            const user = await UserController.FindUserByEmail(email)
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
}
