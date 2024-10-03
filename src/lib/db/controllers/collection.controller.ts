import type { Collection } from '$lib/types'

import {
    getCollectionFromDbById,
    getCollectionsFromDbByArtistId,
} from '../utils/collection.utils'

export class CollectionController {
    static async FindCollectionById(id: string): Promise<Collection | null> {
        return await getCollectionFromDbById(id)
    }

    static async FindCollectionsByArtistId(
        artistId: string
    ): Promise<Collection[] | null> {
        return await getCollectionsFromDbByArtistId(artistId)
    }
}
