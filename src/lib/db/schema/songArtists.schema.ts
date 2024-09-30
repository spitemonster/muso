import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const songArtists = pgTable(
    'song_artists',
    {
        id: text('id').notNull().unique(),
        artistId: text('artist_id')
            .notNull()
            .references(() => schema.artists.id),
        songId: text('song_id')
            .notNull()
            .references(() => schema.songs.id),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.artistId, t.songId] }),
    })
)

export const songArtistsRelations = relations(songArtists, ({ one }) => ({
    song: one(schema.songs, {
        relationName: 'song',
        fields: [songArtists.songId],
        references: [schema.songs.id],
    }),
    artist: one(schema.artists, {
        relationName: 'artist',
        fields: [songArtists.artistId],
        references: [schema.artists.id],
    }),
}))
