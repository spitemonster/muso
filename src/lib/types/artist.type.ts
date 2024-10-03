import type {
    Tag,
    Collection,
    Track,
    TrackArtist,
    ArtistTag,
    CollectionArtist,
} from '.'

interface ArtistProperties {
    id: string
    adminId: string
    name: string
    slug: string
    url: string
    location?: string
    biography?: string
    profileImageUrl?: string
    createdAt: Date
    collections?: Collection[]
    collectionArtists?: CollectionArtist[]
    tags?: Tag[]
    tracks?: Track[]
    trackArtists?: TrackArtist[]
    artistTags?: ArtistTag[]
}

export type Artist = ArtistProperties | undefined | null
