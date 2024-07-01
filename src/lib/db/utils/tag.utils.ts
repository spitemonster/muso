import { db } from '$lib/db'
import { tags, artistTags, artists } from '$lib/db/schema'
import type { Tag, ArtistTag } from '$lib/types'
import { eq, and, sql } from 'drizzle-orm'
import { generateId } from '$lib/utils'

export async function createTagDbRecord(name: string): Promise<Tag | null> {
    const slug = name.replaceAll(' ', '-')

    const res = await db
        .insert(tags)
        .values({
            id: await generateId(),
            name,
            slug,
        })
        .returning()

    const createdTag = res[0]

    if (!createdTag) {
        return null
    }

    return createdTag as Tag
}

export async function getTagFromDbById(id: string): Promise<Tag | null> {
    try {
        if (id == '') {
            throw new Error('No tag ID given.')
        }

        const tag = await db.query.tags.findFirst({
            where: eq(tags.id, id),
        })

        if (!tag) return null

        return tag as Tag
    } catch (err) {
        console.error(err)
        return null
    }
}

export async function getTagFromDbBySlug(slug: string): Promise<Tag | null> {
    try {
        if (slug == '') throw new Error('No tag slug given.')

        const tag = await db.query.tags.findFirst({
            where: eq(tags.slug, slug),
        })

        if (!tag) return null

        return tag as Tag
    } catch (err) {
        console.error(err)
        return null
    }
}

export async function createArtistTagDbRecord(
    artistId: string,
    tagId: string
): Promise<ArtistTag | null> {
    const res = await db
        .insert(artistTags)
        .values({
            id: await generateId(),
            artistId,
            tagId,
        })
        .returning()

    const createdTag = res[0]

    if (!createdTag) {
        return null
    }

    return createdTag as ArtistTag
}

export async function getArtistTagFromDb(artistId: string, tagId: string) {
    const artistTag = await db.query.artistTags.findFirst({
        where: and(
            eq(artistTags.artistId, artistId),
            eq(artistTags.tagId, tagId)
        ),
    })

    if (!artistTag) {
        return null
    }

    return artistTag as ArtistTag
}

export async function getRandomTags(count: number): Promise<Tag[] | null> {
    const query = db
        .select()
        .from(tags)
        .orderBy(sql`RANDOM()`)
        .limit(count)

    const randTags = await query.execute()

    return randTags as Tag[]
}

export async function getArtistTags(artistId: string) {
    const query = db
        .select({
            tag: tags,
        })
        .from(artistTags)
        .where(eq(artistTags.artistId, artistId))
        .leftJoin(tags, eq(tags.id, artistTags.tagId))

    const result = await query.execute()

    const foundTags: Tag[] = result.map((r) => r.tag as Tag)

    return foundTags
}

// export async function getArtistsByTagId(tagId: string): Promise<Artist[]> {
//     const query = db
//         .select({
//             artist: artists,
//         })
//         .from(artistTags)
//         .leftJoin(artists, eq(artists.id, artistTags.artistId))
//         .where(eq(artistTags.tagId, tagId))

//     const result = await query.execute()

//     // Map the result to extract the artist data
//     const artistsWithTag: Artist[] = result.map((row) => row.artist)

//     return artistsWithTag
// }
