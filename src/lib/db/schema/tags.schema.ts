import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'

import { albums, songs, artists, artistTags } from '.'

export const tags = pgTable('tags', {
    id: text('id').notNull(),
    name: text('name'),
    slug: text('slug'),
    createdAt: timestamp('created_at'),
})

export const tagsRelations = relations(tags, ({ many }) => ({
    artistTags: many(artistTags, {
        relationName: 'artists',
    }),
}))
