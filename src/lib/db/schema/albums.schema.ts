import { text, timestamp, pgTable, integer } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { songs } from '.'

export const albums = pgTable('albums', {
    id: text('id'),
    title: text('title'),
    duration: integer('duration'),
    artistId: text('artist_id'),
    coverUrl: text('cover_url'),
    createdAt: timestamp('created_at'),
})

export const albumsRelations = relations(albums, ({ many }) => ({
    songs: many(songs),
}))
