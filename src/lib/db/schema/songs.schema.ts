import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, integer, index } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const songs = pgTable(
    'songs',
    {
        id: text('id').notNull().unique().primaryKey(),
        title: text('title'),
        slug: text('slug').notNull(),
        duration: integer('duration'),
        albumId: text('album_id'),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (table) => {
        return {
            slugIdx: index('song_slug_idx').on(table.slug),
        }
    }
)

export const songsRelations = relations(songs, ({ one, many }) => ({
    album: one(schema.albums, {
        fields: [songs.albumId],
        references: [schema.albums.id],
    }),
    songArtists: many(schema.songArtists),
    songTags: many(schema.songTags),
}))
