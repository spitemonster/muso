import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, integer } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const songs = pgTable('songs', {
    id: text('id').notNull().unique(),
    title: text('title'),
    duration: integer('duration'),
    albumId: text('album_id'),
    createdAt: timestamp('created_at').defaultNow(),
})

export const songsRelations = relations(songs, ({ one, many }) => ({
    album: one(schema.albums, {
        fields: [songs.albumId],
        references: [schema.albums.id],
    }),
    songArtists: many(schema.songArtists),
    songTags: many(schema.songTags),
}))
