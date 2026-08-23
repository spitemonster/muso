import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'

import * as schema from '.'

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
	(t) => ({
		pk: primaryKey({ columns: [t.collectionId, t.userId] }),
	}),
)

export const collectionAdminsRelations = relations(collectionAdmins, ({ one }) => ({
	user: one(schema.users, {
		relationName: 'user',
		fields: [collectionAdmins.userId],
		references: [schema.users.id],
	}),
	collection: one(schema.collections, {
		relationName: 'collection',
		fields: [collectionAdmins.collectionId],
		references: [schema.collections.id],
	}),
}))
