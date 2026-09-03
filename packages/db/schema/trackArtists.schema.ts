import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

import * as schema from '.';

export const trackArtists = pgTable(
	'track_artists',
	{
		artistId: uuid('artist_id')
			.notNull()
			.references(() => schema.artists.id),
		trackId: uuid('track_id')
			.notNull()
			.references(() => schema.tracks.id),
	},
	(table) => [
		primaryKey({ columns: [table.artistId, table.trackId] })
	]
);

export const trackArtistsRelations = relations(trackArtists, ({ one }) => ({
	track: one(schema.tracks, {
		fields: [trackArtists.trackId],
		references: [schema.tracks.id],
	}),
	artist: one(schema.artists, {
		fields: [trackArtists.artistId],
		references: [schema.artists.id],
	}),
}));
