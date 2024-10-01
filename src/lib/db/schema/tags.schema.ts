import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const tags = pgTable('tags', {
    id: text('id').notNull().unique(),
    name: text('name'),
    slug: text('slug'),
    createdAt: timestamp('created_at').defaultNow(),
})

export const tagsRelations = relations(tags, ({ many }) => ({
    artistTags: many(schema.artistTags),
    albumTags: many(schema.albumTags),
}))
