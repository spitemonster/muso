import type { Tag, Collection, Artist } from '$lib/types'

import { db } from '../db'

import * as schema from '../schema'

import { eq } from 'drizzle-orm'

import {
    getTagFromDbById,
    getTagFromDbBySlug,
    createTagDbRecord,
} from '$lib/db/utils'

export class TagController {
    static async CreateTag(name: string) {
        return await createTagDbRecord(name)
    }

    static async FindTagById(id: string): Promise<Tag | null> {
        return await getTagFromDbById(id)
    }

    static async FindTagBySlug(slug: string): Promise<Tag | null> {
        return await getTagFromDbBySlug(slug)
    }

    static async GetTagCollections(
        tagId: string,
        limit: number = 4
    ): Promise<Collection[]> {
        const collectionTags = await db.query.collectionTags.findMany({
            where: eq(schema.collectionTags.tagId, tagId),
            limit,
            with: {
                collection: true,
            },
        })

        const tagCollections: Collection[] = collectionTags.map(
            (ct) => ct.collection as Collection
        )

        return tagCollections
    }

    static async GetTagArtists(
        tagId: string,
        limit: number = 4
    ): Promise<Artist[]> {
        const artistTags = await db.query.artistTags.findMany({
            where: eq(schema.artistTags.tagId, tagId),
            limit,
            with: {
                artist: true,
            },
        })

        const tagArtists: Artist[] = artistTags.map((at) => at.artist as Artist)

        return tagArtists
    }
}
