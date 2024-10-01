import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const albumTags = pgTable(
    'album_tags',
    {
        id: text('id').notNull().unique(),
        albumId: text('album_id')
            .notNull()
            .references(() => schema.albums.id),
        tagId: text('tag_id')
            .notNull()
            .references(() => schema.tags.id),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.albumId, t.tagId] }),
    })
)

export const albumTagsRelations = relations(albumTags, ({ one }) => ({
    album: one(schema.albums, {
        fields: [albumTags.albumId],
        references: [schema.albums.id],
    }),
    tag: one(schema.tags, {
        fields: [albumTags.tagId],
        references: [schema.tags.id],
    }),
}))
