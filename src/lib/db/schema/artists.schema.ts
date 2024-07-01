import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'

import { albums, songs, tags, users, artistTags } from '.'

export const artists = pgTable('artists', {
    id: text('id').notNull(),
    name: text('name'),
    url: text('url'),
    adminId: text('admin_id'),
    createdAt: timestamp('created_at'),
})

export const artistsRelations = relations(artists, ({ one, many }) => ({
    admin: one(users, {
        fields: [artists.adminId],
        references: [users.id],
    }),
    songs: many(songs),
    albums: many(albums),
    artistTags: many(artistTags, {
        relationName: 'tags',
    }),
}))
