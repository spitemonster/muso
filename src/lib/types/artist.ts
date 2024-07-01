import type { Album, Tag } from '.'

export interface Artist {
    id: string
    adminId: string
    name: string
    url: string
    albums?: Album[]
    tags?: Tag[]
}
