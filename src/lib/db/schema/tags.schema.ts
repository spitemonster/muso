import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, index } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const tags = pgTable(
    'tags',
    {
        id: text('id').notNull().unique().primaryKey(),
        name: text('name'),
        slug: text('slug'),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (table) => {
        return {
            slugIdx: index('tag_slug_idx').on(table.slug),
        }
    }
)

export const tagsRelations = relations(tags, ({ many }) => ({
    artistTags: many(schema.artistTags),
    collectionTags: many(schema.collectionTags),
    trackTags: many(schema.trackTags),
}))
