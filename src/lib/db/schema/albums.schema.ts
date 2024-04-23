import { text, timestamp, pgTable, interval } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { songs as SongsTable } from '.'

export const albums = pgTable('albums', {
    id: text('id'),
    title: text('title'),
    duration: interval('duration', { fields: 'second' }),
    artistId: text('artist_id'),
    coverUrl: text('cover_url'),
    createdAt: timestamp('created_at'),
})

export const albumRelations = relations(albums, ({ many }) => ({
    songs: many(SongsTable),
}))
