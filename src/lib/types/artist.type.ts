import type { Tag, Album, Song, SongArtist, ArtistTag, AlbumArtist } from '.'

export interface Artist {
    id: string
    adminId: string
    name: string
    url: string
    location?: string
    biography?: string
    profileImageUrl?: string
    createdAt: Date
    albums?: Album[]
    albumArtists?: AlbumArtist[]
    tags?: Tag[]
    songs?: Song[]
    songArtists?: SongArtist[]
    artistTags?: ArtistTag[]
}
