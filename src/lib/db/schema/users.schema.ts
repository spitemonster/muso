import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable, index } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const users = pgTable(
    'users',
    {
        id: text('id').notNull().unique().primaryKey(),
        name: text('name'),
        email: text('email'),
        password: text('password'),
        type: text('type'),
        artistId: text('artist_id'),
        createdAt: timestamp('created_at').defaultNow(),
        updatedAt: timestamp('updated_at'),
    },
    (table) => {
        return {
            emailIdx: index('email_idx').on(table.email),
        }
    }
)

export const usersRelations = relations(users, ({ many }) => ({
    artistAdmins: many(schema.artistAdmins),
}))
