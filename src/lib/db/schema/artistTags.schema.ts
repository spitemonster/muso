import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import { tags, artists } from '.'

export const artistTags = pgTable(
    'artist_tags',
    {
        id: text('id').notNull(),
        artistId: text('artist_id')
            .notNull()
            .references(() => artists.id),
        tagId: text('tag_id')
            .notNull()
            .references(() => artists.id),
        createdAt: timestamp('created_at'),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.artistId, t.tagId] }),
    })
)

export const artistTagsRelations = relations(artistTags, ({ one }) => ({
    artist: one(artists, {
        relationName: 'artist',
        fields: [artistTags.artistId],
        references: [artists.id],
    }),
    tag: one(tags, {
        relationName: 'tag',
        fields: [artistTags.tagId],
        references: [tags.id],
    }),
}))
