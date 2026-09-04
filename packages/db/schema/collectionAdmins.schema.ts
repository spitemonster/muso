import { relations } from 'drizzle-orm';
import { timestamp, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

import * as schema from '.';

export const collectionAdmins = pgTable(
	'collection_admins',
	{
		collectionId: uuid('collection_id')
			.notNull()
			.references(() => schema.collections.id),
		userId: uuid('user_id')
			.notNull()
			.references(() => schema.users.id),
		createdAt: timestamp('created_at').defaultNow(),
	},
	(table) => [
		primaryKey({ columns: [table.collectionId, table.userId] })
	]
);

export const collectionAdminsRelations = relations(collectionAdmins, ({ one }) => ({
	user: one(schema.users, {
		fields: [collectionAdmins.userId],
		references: [schema.users.id],
	}),
	collection: one(schema.collections, {
		fields: [collectionAdmins.collectionId],
		references: [schema.collections.id],
	}),
}));
