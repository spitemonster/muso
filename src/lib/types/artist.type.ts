import type { Tag, Album, Song } from '.'

export interface Artist {
    id: string
    adminId: string
    name: string
    url: string
    createdAt: Date
    albums?: Album[]
    tags?: Tag[]
    songs?: Song[]
}
