import { db } from '$lib/db'
import { tags, artistTags } from '$lib/db/schema'
import type { Tag, ArtistTag, Album, Artist, Song } from '$lib/types'
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

        const res = await db.query.tags.findFirst({
            where: eq(tags.id, id),
            with: {
                albumTags: {
                    with: {
                        album: true,
                    },
                },
                artistTags: {
                    with: {
                        artist: true,
                    },
                },
                songTags: {
                    with: {
                        song: true,
                    },
                },
            },
        })

        if (!res) throw new Error(`no tag with id ${id} found`)

        const tag: Tag = { ...res } as Tag

        tag.albums = res.albumTags.map((at) => at.album as Album)
        tag.artists = res.artistTags.map((at) => at.artist as Artist)
        tag.songs = res.songTags.map((st) => st.song as Song)

        delete tag.artistTags
        delete tag.albumTags
        delete tag.songTags

        return tag
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

export async function getRandomTags(count: number): Promise<Tag[]> {
    const result = await db.query.tags.findMany({
        columns: {
            id: true,
            name: true,
            slug: true,
        },
        orderBy: sql`RANDOM()`,
        limit: count,
    })

    return result as Tag[]
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
