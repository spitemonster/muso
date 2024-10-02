import { relations } from 'drizzle-orm'
import {
    text,
    timestamp,
    pgTable,
    integer,
    getTableConfig,
    index,
} from 'drizzle-orm/pg-core'

import * as schema from '.'

export const albums = pgTable(
    'albums',
    {
        id: text('id').notNull().unique().primaryKey(),
        title: text('title'),
        slug: text('slug').notNull(),
        duration: integer('duration'),
        coverUrl: text('cover_url'),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (table) => {
        return {
            slugIdx: index('album_slug_idx').on(table.slug),
        }
    }
)

export const albumsRelations = relations(albums, ({ many }) => ({
    tracks: many(schema.tracks),
    albumArtists: many(schema.albumArtists),
    albumTags: many(schema.albumTags),
}))

export const albumsTableInfo = getTableConfig(albums)
