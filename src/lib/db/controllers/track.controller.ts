import type { Track } from '$lib/types'
import {
    getTrackFromDbById,
    getTracksFromDbByCollectionId,
    getTracksFromDbByArtistId,
} from '../utils/track.utils'

export class TrackController {
    static async FindTrackById(id: string): Promise<Track | null> {
        return await getTrackFromDbById(id)
    }

    static async FindTracksByArtistId(
        artistId: string
    ): Promise<Track[] | null> {
        return await getTracksFromDbByArtistId(artistId)
    }

    static async FindTracksByCollectionId(
        collectionId: string
    ): Promise<Track[] | null> {
        return await getTracksFromDbByCollectionId(collectionId)
    }
}
