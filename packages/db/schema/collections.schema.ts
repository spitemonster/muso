import { relations } from 'drizzle-orm';
import { text, timestamp, pgTable, getTableConfig, index, uuid } from 'drizzle-orm/pg-core';

import * as schema from '.';

import { collectionTypeEnum, releaseStatusEnum } from './enums';

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
		status: releaseStatusEnum('status').notNull().default('draft'),
		releaseDate: timestamp('release_date'),
		primaryArtistId: uuid('primary_artist_id').notNull().references(() => schema.artists.id),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow(),
		publishedAt: timestamp('publishedAt')
	},
	(table) => [
		index('collection_slug_idx').on(table.slug)
	],
);

export const collectionsRelations = relations(collections, ({ one, many }) => ({
	primaryArtist: one(schema.artists, {
		fields: [collections.primaryArtistId],
		references: [schema.artists.id]
	}),
	tracks: many(schema.tracks),
	collectionArtists: many(schema.collectionArtists),
	collectionTags: many(schema.collectionTags),
	collectionAdmins: many(schema.collectionAdmins),
}));

export const collectionsTableInfo = getTableConfig(collections);
