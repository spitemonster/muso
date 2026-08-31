import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'

import * as schema from '.'

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
	(t) => ({
		pk: primaryKey({ columns: [t.trackId, t.userId] }),
	}),
)

export const trackAdminsRelations = relations(trackAdmins, ({ one }) => ({
	user: one(schema.users, {
		relationName: 'user',
		fields: [trackAdmins.userId],
		references: [schema.users.id],
	}),
	track: one(schema.tracks, {
		relationName: 'track',
		fields: [trackAdmins.trackId],
		references: [schema.tracks.id],
	}),
}))
