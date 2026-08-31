import { relations } from 'drizzle-orm';
import { text, timestamp, pgTable, integer, index, uuid } from 'drizzle-orm/pg-core';

import * as schema from '.';

export const tracks = pgTable(
	'tracks',
	{
		id: uuid('id').notNull().unique().primaryKey(),
		title: text('title').notNull(),
		slug: text('slug').notNull(),
		duration: integer('duration'),
		collectionId: uuid('collection_id')
			.notNull()
			.references(() => schema.collections.id),
		ownerId: uuid('owner_id').notNull(),
		primaryArtistId: uuid('primary_artist_id').notNull().references(() => schema.artists.id),
		trackUrl: text('track_url').notNull(),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow(),
	},
	(table) => {
		return {
			slugIdx: index('track_slug_idx').on(table.slug),
		};
	},
);

export const tracksRelations = relations(tracks, ({ one, many }) => ({
	collection: one(schema.collections, {
		relationName: 'collection',
		fields: [tracks.collectionId],
		references: [schema.collections.id],
	}),
	primaryArtist: one(schema.artists, {
		relationName: 'primaryArtist',
		fields: [tracks.primaryArtistId],
		references: [schema.artists.id]
	}),
	trackArtists: many(schema.trackArtists),
	trackTags: many(schema.trackTags),
	trackAdmins: many(schema.trackAdmins),
}));
