import type { Album } from '$lib/types'

import {
    getAlbumFromDbById,
    getAlbumsFromDbByArtistId,
} from '../utils/album.utils'

export class AlbumController {
    async FindAlbumByID(id: string): Promise<Album | null> {
        try {
            const album = await getAlbumFromDbById(id)

            if (!album) {
                throw new Error(`No album found with id ${id}.`)
            }

            return album as Album
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async FindAlbumsByArtistId(artistId: string): Promise<Album[] | null> {
        try {
            const albumsByArtist = await getAlbumsFromDbByArtistId(artistId)

            if (!albumsByArtist) {
                throw new Error(`No album found by artist with id ${artistId}`)
            }

            return albumsByArtist as Album[]
        } catch (err) {
            console.error(err)
            return null
        }
    }
}
