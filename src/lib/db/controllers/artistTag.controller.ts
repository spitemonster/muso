import type { ArtistTag } from '$lib/types'

import { createArtistTagDbRecord, getArtistTagFromDb } from '$lib/db/utils'

export class ArtistTagController {
    static async createArtistTag(
        artistId: string,
        tagId: string
    ): Promise<ArtistTag | null> {
        return await createArtistTagDbRecord(artistId, tagId)
    }

    static async getArtistTag(artistId: string, tagId: string) {
        return await getArtistTagFromDb(artistId, tagId)
    }
}
