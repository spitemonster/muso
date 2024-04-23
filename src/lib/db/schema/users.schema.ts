import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { artists } from './artists.schema'
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
    id: text('id'),
    name: text('name'),
    email: text('email'),
    password: text('password'),
    type: text('type'),
    artistId: text('id'),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
})

export const usersRelations = relations(users, ({ many }) => ({
    artists: many(artists),
}))
