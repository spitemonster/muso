import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const trackArtists = pgTable(
    'track_artists',
    {
        id: uuid('id').notNull().unique(),
        artistId: uuid('artist_id')
            .notNull()
            .references(() => schema.artists.id),
        trackId: uuid('track_id')
            .notNull()
            .references(() => schema.tracks.id),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.artistId, t.trackId] }),
    })
)

export const trackArtistsRelations = relations(trackArtists, ({ one }) => ({
    track: one(schema.tracks, {
        relationName: 'track',
        fields: [trackArtists.trackId],
        references: [schema.tracks.id],
    }),
    artist: one(schema.artists, {
        relationName: 'artist',
        fields: [trackArtists.artistId],
        references: [schema.artists.id],
    }),
}))
