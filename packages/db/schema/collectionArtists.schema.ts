import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

import * as schema from '.';

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
	(table) => [
		primaryKey({ columns: [table.collectionId, table.artistId] })
	]
);

export const collectionArtistsRelations = relations(collectionArtists, ({ one }) => ({
	collection: one(schema.collections, {
		fields: [collectionArtists.collectionId],
		references: [schema.collections.id],
	}),
	artist: one(schema.artists, {
		fields: [collectionArtists.artistId],
		references: [schema.artists.id],
	}),
}));

