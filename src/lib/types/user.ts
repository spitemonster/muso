export interface User {
    id: string
    email: string
    name: string
    password: string
    isArtist: boolean
}

export interface SafeUser {
    id: string
    email: string
    name: string
    isArtist: boolean
}
