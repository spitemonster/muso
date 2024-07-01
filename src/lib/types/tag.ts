export interface Tag {
    id: string
    name: string
    slug: string
}

export interface ArtistTag {
    id: string
    artistId: string
    tagId: string
}
