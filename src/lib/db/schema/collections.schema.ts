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

export const collections = pgTable(
    'collections',
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
            slugIdx: index('collection_slug_idx').on(table.slug),
        }
    }
)

export const collectionsRelations = relations(collections, ({ many }) => ({
    trackCollections: many(schema.trackCollections),
    collectionArtists: many(schema.collectionArtists),
    collectionTags: many(schema.collectionTags),
}))

export const collectionsTableInfo = getTableConfig(collections)
