import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const songTags = pgTable(
    'song_tags',
    {
        id: text('id').notNull().unique(),
        songId: text('song_id')
            .notNull()
            .references(() => schema.songs.id),
        tagId: text('tag_id')
            .notNull()
            .references(() => schema.tags.id),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.songId, t.tagId] }),
    })
)

export const songTagsRelations = relations(songTags, ({ one }) => ({
    song: one(schema.songs, {
        fields: [songTags.songId],
        references: [schema.songs.id],
    }),
    tag: one(schema.tags, {
        fields: [songTags.tagId],
        references: [schema.tags.id],
    }),
}))
