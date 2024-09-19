import type { Album, Tag, ArtistTag } from '.'

export interface Artist {
    id: string
    adminId: string
    name: string
    url: string
    albums?: Album[]
    tags?: Tag[]
    artistTags?: ArtistTag[]
}
