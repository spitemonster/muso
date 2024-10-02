import { db } from '$lib/db'
import * as schema from '$lib/db/schema'
import { eq } from 'drizzle-orm'
import type { Track, Artist, TrackArtist } from '$lib/types'

export async function getTrackFromDbById(id: string): Promise<Track | null> {
    const res = await db.query.tracks.findFirst({
        where: eq(schema.tracks.id, id),
        with: {
            trackArtists: {
                with: {
                    artist: true,
                },
            },
            album: true,
        },
    })

    if (!res) {
        throw new Error(`No album found with id ${id}.`)
    }

    const artists: Artist[] = res.trackArtists.map(
        (a: TrackArtist) => a.artist as Artist
    )

    const track: Track = { ...res, artists } as Track

    delete track.trackArtists

    return track
}

export async function getTracksFromDbByArtistId(
    artistId: string
): Promise<Track[] | null> {
    console.error(
        `need to complete method to get tracks from db by artistId: ${artistId}`
    )
    return null
    // const tracksByArtist = await db.query.tracks.findMany({
    //     where: eq(schema.tracks.artistId, artistId),
    // })

    // if (!tracksByArtist) {
    //     return null
    // }

    // return tracksByArtist as Track[]
}

export async function getTracksFromDbByAlbumId(
    albumId: string
): Promise<Track[] | null> {
    const tracksOnAlbum = await db.query.tracks.findMany({
        where: eq(schema.tracks.albumId, albumId),
    })

    if (!tracksOnAlbum) {
        return null
    }

    return tracksOnAlbum as Track[]
}