import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { albums, songs, users } from '.'

export const artists = pgTable('artists', {
    id: text('id'),
    name: text('name'),
    url: text('url'),
    adminId: text('adminId'),
    createdAt: timestamp('created_at'),
})

export const artistsRelations = relations(artists, ({ one, many }) => ({
    admin: one(users, {
        fields: [artists.adminId],
        references: [users.id],
    }),
    songs: many(songs),
    albums: many(albums),
}))
