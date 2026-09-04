import { relations } from 'drizzle-orm';
import { text, timestamp, pgTable, index, uuid } from 'drizzle-orm/pg-core';

import * as schema from '.';

import { userTypeEnum } from './enums';

export const users = pgTable(
	'users',
	{
		id: uuid('id').notNull().unique().primaryKey(),
		name: text('name'),
		email: text('email'),
		password: text('password'),
		type: userTypeEnum('type').notNull(),
		artistId: uuid('artist_id'),
		createdAt: timestamp('created_at').defaultNow(),
		updatedAt: timestamp('updated_at').defaultNow(),
	},
	(table) => [
		index('email_idx').on(table.email)
	]
);

export const usersRelations = relations(users, ({ many }) => ({
	artistAdmins: many(schema.artistAdmins),
	trackAdmins: many(schema.trackAdmins),
	collectionAdmins: many(schema.collectionAdmins),
}));

