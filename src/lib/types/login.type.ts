import { type User } from '$lib/types'

export type LoginFormResponse = {
    email: string
    token: string
    error: boolean
    message: string
}

export type LoginUserResponse = {
    user: User
    token: string
    error: boolean
    message: string
}

export type LoginSession = {
    id: string
    user: User
    expires: string
}
