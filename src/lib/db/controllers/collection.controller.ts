import * as schema from '$lib/db/schema'
import type { Collection } from '$lib/types'
import { eq, and } from 'drizzle-orm'

import {
    getCollectionFromDbById,
    getCollectionsFromDbByArtistId,
} from '$lib/db/utils'
import { db } from '../db'

export class CollectionController {
    static async FindCollectionByArtistAndSlug(
        artistSlug: string,
        collectionSlug: string
    ): Promise<Collection> {
        const query = db
            .select({
                id: schema.collections.id,
                title: schema.collections.title,
                slug: schema.collections.slug,
                duration: schema.collections.duration,
                coverUrl: schema.collections.coverUrl,
                tracks: schema.tracks,
            })
            .from(schema.collections)
            .innerJoin(
                schema.collectionArtists,
                eq(schema.collections.id, schema.collectionArtists.collectionId)
            )
            .innerJoin(
                schema.artists,
                eq(schema.artists.id, schema.collectionArtists.artistId)
            )
            .where(
                and(
                    eq(schema.collections.slug, collectionSlug),
                    eq(schema.artists.slug, artistSlug)
                )
            )
            .limit(1)

        const res = await query.execute()

        return res[0] as Collection
    }

    static async FindCollectionById(id: string): Promise<Collection | null> {
        return await getCollectionFromDbById(id)
    }

    static async FindCollectionsByArtistId(
        artistId: string
    ): Promise<Collection[] | null> {
        return await getCollectionsFromDbByArtistId(artistId)
    }
}
