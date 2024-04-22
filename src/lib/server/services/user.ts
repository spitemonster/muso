import bcrypt from 'bcrypt'
import { User } from '$lib/server/models/user'
import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY } from '$env/static/private'
import type { SessionUserData } from '$lib/store'

type UserQuery = {
    email?: string
    id?: string
}

export async function createUser(
    id: string,
    name: string,
    email: string,
    password: string,
    isArtist: boolean
) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            id,
            name,
            email,
            password: hashedPassword,
            isArtist,
        })

        return { user: await user.toJSON() }
    } catch (err) {
        let msg: string
        if (err instanceof Error) {
            msg = err.message
        } else {
            msg = String(err)
        }

        console.error(err)

        return { err: msg }
    }
}

export async function getUser(query: UserQuery) {
    if (query.email) {
        const u = await User.findOne({ where: { email: query.email } })

        if (!u) {
            return { id: null }
        }

        return await u.toJSON()
    }
}

export async function loginUser(
    email: string,
    password: string
): Promise<{ token?: string; err?: string; sessionUser?: SessionUserData }> {
    try {
        const user = await getUser({ email })

        if (!user.id || !(await bcrypt.compare(password, user.password))) {
            throw new Error(
                'The provided email and password do not correspond to an account in our records.'
            )
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

        const sessionUser = {
            email: user.email,
            name: user.name,
        }

        return { token, sessionUser }
    } catch (error) {
        return { err: error as string }
    }
}

// export async function logoutUser(email: string) {}
