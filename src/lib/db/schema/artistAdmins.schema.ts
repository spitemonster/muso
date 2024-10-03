import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const artistAdmins = pgTable(
    'artist_admins',
    {
        id: text('id').notNull().unique(),
        artistId: text('artist_id')
            .notNull()
            .references(() => schema.artists.id),
        userId: text('user_id')
            .notNull()
            .references(() => schema.users.id),
        createdAt: timestamp('created_at').defaultNow(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.artistId, t.userId] }),
    })
)

export const artistAdminsRelations = relations(artistAdmins, ({ one }) => ({
    user: one(schema.users, {
        relationName: 'user',
        fields: [artistAdmins.userId],
        references: [schema.users.id],
    }),
    artist: one(schema.artists, {
        relationName: 'artist',
        fields: [artistAdmins.artistId],
        references: [schema.artists.id],
    }),
}))
