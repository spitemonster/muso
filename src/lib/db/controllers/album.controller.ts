import type { Album } from '$lib/types'

import {
    getAlbumFromDbById,
    getAlbumsFromDbByArtistId,
} from '../utils/album.utils'

export class AlbumController {
    static async FindAlbumById(id: string): Promise<Album | null> {
        return await getAlbumFromDbById(id)
    }

    static async FindAlbumsByArtistId(
        artistId: string
    ): Promise<Album[] | null> {
        return await getAlbumsFromDbByArtistId(artistId)
    }
}
