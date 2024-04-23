import { text, timestamp, pgTable } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: text('id'),
    name: text('name'),
    email: text('email'),
    password: text('password'),
    type: text('type'),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
})
