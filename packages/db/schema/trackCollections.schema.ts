import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const trackCollections = pgTable(
    'track_collections',
    {
        id: uuid('id').notNull().unique(),
        collectionId: uuid('collection_id')
            .notNull()
            .references(() => schema.collections.id),
        trackId: uuid('track_id')
            .notNull()
            .references(() => schema.tracks.id),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.collectionId, t.trackId] }),
    })
)

export const trackCollectionsRelations = relations(
    trackCollections,
    ({ one }) => ({
        track: one(schema.tracks, {
            relationName: 'track',
            fields: [trackCollections.trackId],
            references: [schema.tracks.id],
        }),
        collection: one(schema.collections, {
            relationName: 'collection',
            fields: [trackCollections.collectionId],
            references: [schema.collections.id],
        }),
    })
)
