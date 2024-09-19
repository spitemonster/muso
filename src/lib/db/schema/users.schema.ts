import { relations } from 'drizzle-orm'
import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'

import * as schema from '.'

export const users = pgTable('users', {
    id: text('id').notNull().unique(),
    name: text('name'),
    email: text('email'),
    password: text('password'),
    type: text('type'),
    artistId: text('artist_id'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
})

export const usersRelations = relations(users, ({ many }) => ({
    artists: many(schema.artists),
}))
