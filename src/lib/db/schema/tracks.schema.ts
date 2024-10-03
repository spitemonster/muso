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
        createdAt: timestamp('created_at').defaultNow(),
    },
    (table) => {
        return {
            slugIdx: index('track_slug_idx').on(table.slug),
        }
    }
)

export const tracksRelations = relations(tracks, ({ many }) => ({
    trackCollections: many(schema.trackCollections),
    trackArtists: many(schema.trackArtists),
    trackTags: many(schema.trackTags),
}))
