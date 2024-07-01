import type { Tag } from '$lib/types'

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
}
