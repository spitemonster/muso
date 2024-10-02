import { db } from '$lib/db'
import * as schema from '$lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import type { Artist, Tag, Song, Album } from '$lib/types'

export async function createArtistDbRecord(
    adminId: string,
    id: string,
    name: string,
    url: string = ''
): Promise<Artist | null> {
    const artist = await db
        .insert(schema.artists)
        .values({
            adminId,
            id,
            name,
            url,
        })
        .returning()

    const createdArtist = artist[0]

    if (!createdArtist) {
        return null
    }

    return createdArtist as Artist
}

// first pass at the conditional includes thing
// not sure i'm happy with it; it's neither terribly scalable nor terribly dry
// though there is sort of a ceiling to the amount of data related to an artist we might fetch at a time
export async function getArtistFromDbById(
    queryId: string,
    include: string[] = []
): Promise<Artist | null> {
    try {
        const inc = {
            artistTags: {},
            songArtists: {},
            albumArtists: {},
        }

        if (include.includes('tags')) {
            inc.artistTags = {
                with: {
                    tag: true,
                },
            }
        } else {
            inc.artistTags = false
        }

        if (include.includes('songs')) {
            inc.songArtists = {
                with: {
                    song: true,
                },
            }
        } else {
            inc.songArtists = false
        }

        if (include.includes('albums')) {
            inc.albumArtists = {
                with: {
                    album: true,
                },
            }
        }

        const result = await db.query.artists.findFirst({
            where: eq(schema.artists.id, queryId),
            columns: {
                name: true,
                id: true,
                createdAt: true,
                adminId: true,
                url: true,
                location: true,
                biography: true,
                profileImageUrl: true,
            },
            with: inc,
        })

        if (!result) {
            throw new Error(`No artist found with id ${queryId}`)
        }

        const artist: Artist = { ...result } as Artist

        if (include.includes('songs')) {
            artist.songs = artist.songArtists?.map((sa) => sa.song as Song)
        } else {
            delete artist.songs
        }

        delete artist.songArtists

        if (include.includes('tags')) {
            artist.tags = artist.artistTags?.map((at) => at.tag as Tag)
        } else {
            delete artist.tags
        }

        delete artist.artistTags

        if (include.includes('albums')) {
            artist.albums = artist.albumArtists?.map((aa) => aa.album as Album)
        } else {
            delete artist.albums
        }

        delete artist.albumArtists

        return artist
    } catch (err) {
        console.error(err)
        throw new Error(`${err}`)
    }
}

export async function getArtistsFromDbByUserId(
    userId: string
): Promise<Artist[] | null> {
    const artistsAdminedByUser = await db.query.artists.findMany({
        where: eq(schema.artists.adminId, userId),
    })

    if (!artistsAdminedByUser) {
        return null
    }

    return artistsAdminedByUser as Artist[]
}

export async function getArtistsFromDbByUserEmail(
    userEmail: string
): Promise<Artist[] | null> {
    const user = await db.query.users.findFirst({
        where: eq(schema.users.email, userEmail),
    })

    if (!user || !user.id)
        throw new Error(`User not found with email ${userEmail}`)

    const { id } = user

    const artistsAdminedByUser = await getArtistsFromDbByUserId(id)

    if (!artistsAdminedByUser) {
        return null
    }

    return artistsAdminedByUser as Artist[]
}

export async function getRandomArtists(count: number): Promise<Artist[]> {
    const randArtists = await db.query.artists.findMany({
        columns: {
            name: true,
            id: true,
            createdAt: true,
            adminId: true,
            url: true,
            location: true,
            biography: true,
            profileImageUrl: true,
        },
        orderBy: sql`RANDOM()`,
        limit: count,
    })

    return randArtists as Artist[]
}

export async function getArtistsByTagId(
    tagId: string
): Promise<Artist[] | string> {
    const artistTags = await db.query.artistTags.findMany({
        where: eq(schema.artistTags.tagId, tagId),
        with: {
            artist: true,
        },
    })

    if (!artistTags) {
        return `No artists found with selected tag.`
    }

    const artists: Artist[] = artistTags.map((at) => at.artist as Artist)

    return artists
}
