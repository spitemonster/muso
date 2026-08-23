import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, uniqueIndex, uuid } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const artists = pgTable(
	'artists',
	{
		id: uuid('id').notNull().unique().primaryKey(),
		name: text('name'),
		slug: text('slug').notNull().unique(),
		url: text('url'),
		ownerId: uuid('admin_id').notNull(),
		location: text('location'),
		profileImageUrl: text('profile_image_url'),
		biography: text('biography'),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow(),
	},
	(table) => {
		return {
			slugIdx: uniqueIndex('artist_slug_idx').on(table.slug),
		}
	},
)

export const artistsRelations = relations(artists, ({ one, many }) => ({
	artistTags: many(schema.artistTags),
	trackArtists: many(schema.trackArtists),
	collectionArtists: many(schema.collectionArtists),
	artistAdmins: many(schema.artistAdmins),
}))
