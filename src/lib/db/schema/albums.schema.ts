import { relations } from 'drizzle-orm'
import {
    text,
    timestamp,
    pgTable,
    integer,
    getTableConfig,
} from 'drizzle-orm/pg-core'

import * as schema from '.'

export const albums = pgTable('albums', {
    id: text('id').notNull().unique(),
    title: text('title'),
    duration: integer('duration'),
    coverUrl: text('cover_url'),
    createdAt: timestamp('created_at').defaultNow(),
})

export const albumsRelations = relations(albums, ({ many }) => ({
    songs: many(schema.songs),
    artists: many(schema.albumArtists),
}))

export const albumsTableInfo = getTableConfig(albums)
