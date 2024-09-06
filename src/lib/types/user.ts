import type { Artist, Album, Tag } from '.'

export interface User {
    id: string
    email: string
    name: string
    password: string
    type: string
}

export interface NewUser extends User {}

export interface SafeUser {
    id: string
    email: string
    name: string
    type: string
    artists: Artist[]
    albums: Album[]
    tags: Tag[]
}
