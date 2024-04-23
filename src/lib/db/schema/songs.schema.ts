import { text, timestamp, pgTable, interval } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { albums, artists } from '.'

export const songs = pgTable('songs', {
    id: text('id'),
    title: text('title'),
    duration: interval('duration', { fields: 'second' }),
    url: text('url'),
    artistId: text('artist_id'),
    albumId: text('album_id'),
    createdAt: timestamp('created_at'),
})

export const songsRelations = relations(songs, ({ one, many }) => ({
    album: one(albums, {
        fields: [songs.albumId],
        references: [albums.id],
    }),
    artist: many(artists),
}))
