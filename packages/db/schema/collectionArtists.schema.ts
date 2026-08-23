import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const collectionArtists = pgTable(
	'collection_artists',
	{
		collectionId: uuid('collection_id')
			.notNull()
			.references(() => schema.collections.id),
		artistId: uuid('artist_id')
			.notNull()
			.references(() => schema.artists.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.collectionId, t.artistId] }),
	}),
)

export const collectionArtistsRelations = relations(collectionArtists, ({ one }) => ({
	collection: one(schema.collections, {
		relationName: 'collection',
		fields: [collectionArtists.collectionId],
		references: [schema.collections.id],
	}),
	artist: one(schema.artists, {
		relationName: 'artist',
		fields: [collectionArtists.artistId],
		references: [schema.artists.id],
	}),
}))
