import { type SafeUser } from '$lib/types'

export type LoginFormResponse = {
    email: string
    token: string
    error: boolean
    message: string
}

export type LoginUserResponse = {
    user: SafeUser | null
    token: string
    error: boolean
    message: string
}
