import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

import * as schema from '.';

export const collectionTags = pgTable(
	'collection_tags',
	{
		collectionId: uuid('collection_id')
			.notNull()
			.references(() => schema.collections.id),
		tagId: uuid('tag_id')
			.notNull()
			.references(() => schema.tags.id),
	},
	(table) => [
		primaryKey({ columns: [table.collectionId, table.tagId] })
	]
);

export const collectionTagsRelations = relations(collectionTags, ({ one }) => ({
	collection: one(schema.collections, {
		fields: [collectionTags.collectionId],
		references: [schema.collections.id],
	}),
	tag: one(schema.tags, {
		fields: [collectionTags.tagId],
		references: [schema.tags.id],
	}),
}));
