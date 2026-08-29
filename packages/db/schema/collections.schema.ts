import { relations } from 'drizzle-orm';
import { text, timestamp, pgTable, getTableConfig, index, uuid, pgEnum } from 'drizzle-orm/pg-core';

import * as schema from '.';

export const collectionTypeEnum = pgEnum('collection_type', ['album', 'ep', 'single', 'compilation']);

export const collections = pgTable(
	'collections',
	{
		id: uuid('id').notNull().unique().primaryKey(),
		type: collectionTypeEnum('type').notNull(),
		title: text('title').notNull(),
		slug: text('slug').notNull(),
		coverUrl: text('cover_url'),
		ownerId: uuid('owner_id').notNull(),
		description: text('description'),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow(),
	},
	(table) => {
		return {
			slugIdx: index('collection_slug_idx').on(table.slug),
		};
	},
);

export const collectionsRelations = relations(collections, ({ many }) => ({
	tracks: many(schema.tracks),
	collectionArtists: many(schema.collectionArtists),
	collectionTags: many(schema.collectionTags),
	collectionAdmins: many(schema.collectionAdmins),
}));

export const collectionsTableInfo = getTableConfig(collections);
