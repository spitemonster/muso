import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import * as schema from '.'
// import { collections, tracks, users, artistTags } from '.'

export const collectionArtists = pgTable(
    'collection_artists',
    {
        id: text('id').notNull().unique(),
        artistId: text('artist_id')
            .notNull()
            .references(() => schema.artists.id),
        collectionId: text('collection_id')
            .notNull()
            .references(() => schema.collections.id),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.artistId, t.collectionId] }),
    })
)

export const collectionArtistsRelations = relations(
    collectionArtists,
    ({ one }) => ({
        collection: one(schema.collections, {
            relationName: 'collection',
            fields: [collectionArtists.collectionId],
            references: [schema.collections.id],
        }),
        artist: one(schema.artists, {
            relationName: 'artist',
            fields: [collectionArtists.artistId],
            references: [schema.artists.id],
        }),
    })
)
