import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, integer, index } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const tracks = pgTable(
    'tracks',
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
            slugIdx: index('track_slug_idx').on(table.slug),
        }
    }
)

export const tracksRelations = relations(tracks, ({ one, many }) => ({
    album: one(schema.albums, {
        fields: [tracks.albumId],
        references: [schema.albums.id],
    }),
    trackArtists: many(schema.trackArtists),
    trackTags: many(schema.trackTags),
}))
