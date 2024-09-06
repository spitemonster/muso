import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import { DB_DATABASE, DB_HOST, DB_USER, DB_PORT } from '$env/static/private'
import * as schema from '$lib/db/schema'

export const client = new pg.Client({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    database: DB_DATABASE,
})

export const db = drizzle(client, { schema })

client.connect()
