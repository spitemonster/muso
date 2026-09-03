import { relations } from 'drizzle-orm';
import { text, timestamp, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

import * as schema from '.';

export const artistAdmins = pgTable(
	'artist_admins',
	{
		artistId: uuid('artist_id')
			.notNull()
			.references(() => schema.artists.id),
		userId: uuid('user_id')
			.notNull()
			.references(() => schema.users.id),
		createdAt: timestamp('created_at').defaultNow(),
	},
	(table) => [
		primaryKey({ columns: [table.artistId, table.userId] })
	],
);

export const artistAdminsRelations = relations(artistAdmins, ({ one }) => ({
	user: one(schema.users, {
		fields: [artistAdmins.userId],
		references: [schema.users.id],
	}),
	artist: one(schema.artists, {
		fields: [artistAdmins.artistId],
		references: [schema.artists.id],
	}),
}));

