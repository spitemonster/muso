import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const artistTags = pgTable(
    'artist_tags',
    {
        id: text('id').notNull().unique(),
        artistId: text('artist_id')
            .notNull()
            .references(() => schema.artists.id),
        tagId: text('tag_id')
            .notNull()
            .references(() => schema.tags.id),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.artistId, t.tagId] }),
    })
)

export const artistTagsRelations = relations(artistTags, ({ one }) => ({
    artist: one(schema.artists, {
        fields: [artistTags.artistId],
        references: [schema.artists.id],
    }),
    tag: one(schema.tags, {
        fields: [artistTags.tagId],
        references: [schema.tags.id],
    }),
}))
