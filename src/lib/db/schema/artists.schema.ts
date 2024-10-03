import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const artists = pgTable(
    'artists',
    {
        id: text('id').notNull().unique().primaryKey(),
        name: text('name'),
        slug: text('slug').notNull().unique(),
        url: text('url'),
        adminId: text('admin_id'),
        location: text('location'),
        profileImageUrl: text('profile_image_url'),
        biography: text('biography'),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (table) => {
        return {
            slugIdx: uniqueIndex('artist_slug_idx').on(table.slug),
        }
    }
)

export const artistsRelations = relations(artists, ({ one, many }) => ({
    admin: one(schema.users, {
        fields: [artists.adminId],
        references: [schema.users.id],
    }),
    artistTags: many(schema.artistTags),
    collectionArtists: many(schema.collectionArtists),
    trackArtists: many(schema.trackArtists),
    artistAdmins: many(schema.artistAdmins),
}))
