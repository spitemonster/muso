import { type Album } from '.'

export interface Artist {
    id: string
    adminId: string
    name: string
    url: string
    albums: Album[]
}
