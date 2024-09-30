import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const artists = pgTable('artists', {
    id: text('id').notNull().unique(),
    name: text('name'),
    url: text('url'),
    adminId: text('admin_id'),
    createdAt: timestamp('created_at').defaultNow(),
})

export const artistsRelations = relations(artists, ({ one, many }) => ({
    admin: one(schema.users, {
        fields: [artists.adminId],
        references: [schema.users.id],
    }),
    artistTags: many(schema.artistTags),
    albumArtists: many(schema.albumArtists),
    songArtists: many(schema.songArtists),
}))
