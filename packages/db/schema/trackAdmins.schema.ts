import { relations } from 'drizzle-orm';
import { timestamp, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

import * as schema from '.';

export const trackAdmins = pgTable(
	'track_admins',
	{
		trackId: uuid('track_id')
			.notNull()
			.references(() => schema.tracks.id),
		userId: uuid('user_id')
			.notNull()
			.references(() => schema.users.id),
		createdAt: timestamp('created_at').defaultNow(),
	},
	(table) => [
		primaryKey({ columns: [table.trackId, table.userId] })
	],
);

export const trackAdminsRelations = relations(trackAdmins, ({ one }) => ({
	user: one(schema.users, {
		fields: [trackAdmins.userId],
		references: [schema.users.id],
	}),
	track: one(schema.tracks, {
		fields: [trackAdmins.trackId],
		references: [schema.tracks.id],
	}),
}));

