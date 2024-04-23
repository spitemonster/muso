import { text, timestamp, pgTable, interval } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { songs as SongsTable } from '.'

export const albums = pgTable('albums', {
    id: text('id'),
    title: text('title'),
    duration: interval('duration', { fields: 'second' }),
    artistId: text('artistId'),
    createdAt: timestamp('created_at'),
})

export const albumRelations = relations(albums, ({ many }) => ({
    songs: many(SongsTable),
}))
