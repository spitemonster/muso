import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const collectionTags = pgTable(
    'collection_tags',
    {
        id: uuid('id').notNull().unique(),
        collectionId: uuid('collection_id')
            .notNull()
            .references(() => schema.collections.id),
        tagId: uuid('tag_id')
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
