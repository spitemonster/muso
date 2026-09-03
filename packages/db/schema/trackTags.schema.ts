import { relations } from 'drizzle-orm';
import { text, timestamp, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

import * as schema from '.';

export const trackTags = pgTable(
	'track_tags',
	{
		trackId: uuid('track_id')
			.notNull()
			.references(() => schema.tracks.id),
		tagId: uuid('tag_id')
			.notNull()
			.references(() => schema.tags.id),
	},
	(table) => [
		primaryKey({ columns: [table.trackId, table.tagId] })
	],
);

export const trackTagsRelations = relations(trackTags, ({ one }) => ({
	track: one(schema.tracks, {
		fields: [trackTags.trackId],
		references: [schema.tracks.id],
	}),
	tag: one(schema.tags, {
		fields: [trackTags.tagId],
		references: [schema.tags.id],
	}),
}));
