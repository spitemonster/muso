import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const collectionTags = pgTable(
    'collection_tags',
    {
        id: text('id').notNull().unique(),
        collectionId: text('collection_id')
            .notNull()
            .references(() => schema.collections.id),
        tagId: text('tag_id')
            .notNull()
            .references(() => schema.tags.id),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.collectionId, t.tagId] }),
    })
)

export const collectionTagsRelations = relations(collectionTags, ({ one }) => ({
    collection: one(schema.collections, {
        fields: [collectionTags.collectionId],
        references: [schema.collections.id],
    }),
    tag: one(schema.tags, {
        fields: [collectionTags.tagId],
        references: [schema.tags.id],
    }),
}))
