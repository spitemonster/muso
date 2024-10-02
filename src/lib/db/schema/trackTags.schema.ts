import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const trackTags = pgTable(
    'track_tags',
    {
        id: text('id').notNull().unique(),
        trackId: text('track_id')
            .notNull()
            .references(() => schema.tracks.id),
        tagId: text('tag_id')
            .notNull()
            .references(() => schema.tags.id),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.trackId, t.tagId] }),
    })
)

export const trackTagsRelations = relations(trackTags, ({ one }) => ({
    track: one(schema.tracks, {
        fields: [trackTags.trackId],
        references: [schema.tracks.id],
    }),
    tag: one(schema.tags, {
        fields: [trackTags.tagId],
        references: [schema.tags.id],
    }),
}))
