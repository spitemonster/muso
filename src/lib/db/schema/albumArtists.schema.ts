import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import * as schema from '.'
// import { albums, tracks, users, artistTags } from '.'

export const albumArtists = pgTable(
    'album_artists',
    {
        id: text('id').notNull().unique(),
        artistId: text('artist_id')
            .notNull()
            .references(() => schema.artists.id),
        albumId: text('album_id')
            .notNull()
            .references(() => schema.albums.id),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.artistId, t.albumId] }),
    })
)

export const albumArtistsRelations = relations(albumArtists, ({ one }) => ({
    album: one(schema.albums, {
        relationName: 'album',
        fields: [albumArtists.albumId],
        references: [schema.albums.id],
    }),
    artist: one(schema.artists, {
        relationName: 'artist',
        fields: [albumArtists.artistId],
        references: [schema.artists.id],
    }),
}))
