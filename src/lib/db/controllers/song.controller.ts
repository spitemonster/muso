import type { Song } from '$lib/types'
import {
    getSongFromDbById,
    getSongsFromDbByAlbumId,
    getSongsFromDbByArtistId,
} from '../utils/song.utils'

export class SongController {
    static async FindSongById(id: string): Promise<Song> {
        const song = await getSongFromDbById(id)

        if (!song) {
            throw new Error(`No song found with id ${id}.`)
        }

        return song
    }

    static async FindSongsByArtistId(artistId: string): Promise<Song[]> {
        const songs = await getSongsFromDbByArtistId(artistId)

        if (!songs || songs.length === 0) {
            throw new Error(`No songs found by artist with id ${artistId}`)
        }

        return songs
    }

    static async FindSongsByAlbumId(albumId: string): Promise<Song[] | null> {
        try {
            const songs = await getSongsFromDbByAlbumId(albumId)

            if (!songs)
                throw new Error(`No songs found on album with id ${albumId}`)

            return songs
        } catch (err) {
            console.error(err)
            return null
        }
    }
}
