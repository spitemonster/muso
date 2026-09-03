import { relations } from 'drizzle-orm';
import { text, timestamp, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

import * as schema from '.';

export const artistTags = pgTable(
	'artist_tags',
	{
		artistId: uuid('artist_id')
			.notNull()
			.references(() => schema.artists.id),
		tagId: uuid('tag_id')
			.notNull()
			.references(() => schema.tags.id),
	},
	(table) => [
		primaryKey({ columns: [table.artistId, table.tagId] })
	]
);

export const artistTagsRelations = relations(artistTags, ({ one }) => ({
	artist: one(schema.artists, {
		fields: [artistTags.artistId],
		references: [schema.artists.id],
	}),
	tag: one(schema.tags, {
		fields: [artistTags.tagId],
		references: [schema.tags.id],
	}),
}));
