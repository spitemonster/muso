import type { NewUser, SafeUser, User } from '$lib/types'
import bcrypt from 'bcrypt'
import { generateId } from '$lib/utils'
import type { LoginUserResponse } from '$lib/types'
import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY } from '$env/static/private'
import {
    getUserFromDbByEmail,
    getUserFromDbById,
    createUser,
    userToSafeUser,
} from '$lib/db/utils'

export class UserController {
    static async CreateUser(newUser: NewUser): Promise<SafeUser | null> {
        try {
            const hashedPassword = await bcrypt.hash(newUser.password, 10)

            const newUserData = {
                id: await generateId(),
                name: newUser.name,
                email: newUser.email,
                password: hashedPassword,
                type: newUser.type,
            }

            const createdUser = await createUser(newUserData)

            if (!createdUser) {
                throw new Error(
                    'There was an error creating the user with the given email address.'
                )
            }

            return createdUser
        } catch (err) {
            return null
        }
    }

    static async FindUserByEmail(email: string): Promise<User | null> {
        return await getUserFromDbByEmail(email)
    }

    static async FindSafeUserByEmail(email: string): Promise<SafeUser | null> {
        return userToSafeUser(await getUserFromDbByEmail(email))
    }

    static async FindUserById(id: string): Promise<User | null> {
        return await getUserFromDbById(id)
    }

    static async FindSafeUserById(id: string): Promise<SafeUser | null> {
        return userToSafeUser(await getUserFromDbById(id))
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
            const user = await getUserFromDbByEmail(email)
            if (!user || !(await bcrypt.compare(password, user.password))) {
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
