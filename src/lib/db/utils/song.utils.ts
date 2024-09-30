import { db } from '$lib/db'
import * as schema from '$lib/db/schema'
import { eq } from 'drizzle-orm'
import type { Song, Artist } from '$lib/types'

export async function getSongFromDbById(id: string): Promise<Song | null> {
    const res = await db.query.songs.findFirst({
        where: eq(schema.songs.id, id),
        with: {
            songArtists: {
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

    const artists: Artist[] = res.songArtists.map((a) => a.artist as Artist)

    const song: Song = { ...res, artists } as Song

    delete song.songArtists

    return song
}

export async function getSongsFromDbByArtistId(
    artistId: string
): Promise<Song[] | null> {
    console.error(
        `need to complete method to get songs from db by artistId: ${artistId}`
    )
    return null
    // const songsByArtist = await db.query.songs.findMany({
    //     where: eq(schema.songs.artistId, artistId),
    // })

    // if (!songsByArtist) {
    //     return null
    // }

    // return songsByArtist as Song[]
}

export async function getSongsFromDbByAlbumId(
    albumId: string
): Promise<Song[] | null> {
    const songsOnAlbum = await db.query.songs.findMany({
        where: eq(schema.songs.albumId, albumId),
    })

    if (!songsOnAlbum) {
        return null
    }

    return songsOnAlbum as Song[]
}
