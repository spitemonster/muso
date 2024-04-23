import bcrypt from 'bcrypt'
import { User as UserModel } from '$lib/server/models/user'
import { type User, type SafeUser } from '$lib/types/user'
import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY } from '$env/static/private'
import { generateID } from './id'

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

        const user = await UserModel.create({
            id: generateID(),
            name: new_user.name,
            email: new_user.email,
            password: hashedPassword,
            isArtist: new_user.isArtist,
        })

        const { id, name, email, isArtist } = await user.toJSON()

        if (!id) {
            throw new Error(
                'There was an error creating the user with the given email address.'
            )
        }

        return { id, name, email, isArtist }
    } catch (err) {
        console.error(err)
        return { id: '', name: '', email: '', isArtist: false }
    }
}

export async function getUser(query: UserQuery) {
    if (query.email) {
        const u = await UserModel.findOne({ where: { email: query.email } })

        if (!u) {
            return { id: null }
        }

        return await u.toJSON()
    }
}

export async function findUserByEmail(user_email: string): Promise<User> {
    try {
        const user = await UserModel.findOne({ where: { email: user_email } })

        if (!user) {
            throw new Error('Could not find a user with the given email.')
        }

        return await user.toJSON()
    } catch (error) {
        console.error(error)
        return { id: '', email: '', name: '', isArtist: false, password: '' }
    }
}

export async function findSafeUserByEmail(
    user_email: string
): Promise<SafeUser> {
    try {
        const { id, email, name, isArtist } = await findUserByEmail(user_email)

        if (id == '') {
            throw new Error('Could not find user with given email.')
        }

        return { id, email, name, isArtist }
    } catch (error) {
        console.error(error)
        return { id: '', email: '', name: '', isArtist: false }
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
        console.log('email::::::', email)
        const user = await findUserByEmail(email)

        console.log('USER:::: ', user)

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
    } catch (error) {
        response.user = undefined
        response.error = true
        response.message = error as string
        console.error('user authentication failed: ', error)
    }

    return response
}

// export async function logoutUser(email: string) {}
