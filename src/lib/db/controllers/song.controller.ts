import type { Song } from '$lib/types'
import {
    getSongFromDbById,
    getSongsFromDbByAlbumId,
    getSongsFromDbByArtistId,
} from '../utils/song.utils'

export class SongController {
    static async FindSongById(id: string): Promise<Song | null> {
        return await getSongFromDbById(id)
    }

    static async FindSongsByArtistId(artistId: string): Promise<Song[] | null> {
        return await getSongsFromDbByArtistId(artistId)
    }

    static async FindSongsByAlbumId(albumId: string): Promise<Song[] | null> {
        return await getSongsFromDbByAlbumId(albumId)
    }
}
