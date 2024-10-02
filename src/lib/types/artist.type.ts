import type { Tag, Album, Track, TrackArtist, ArtistTag, AlbumArtist } from '.'

export interface Artist {
    id: string
    adminId: string
    name: string
    slug: string
    url: string
    location?: string
    biography?: string
    profileImageUrl?: string
    createdAt: Date
    albums?: Album[]
    albumArtists?: AlbumArtist[]
    tags?: Tag[]
    tracks?: Track[]
    trackArtists?: TrackArtist[]
    artistTags?: ArtistTag[]
}
