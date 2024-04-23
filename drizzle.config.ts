import type { Config } from 'drizzle-kit'
import dotenv from 'dotenv'

dotenv.config()

export default {
    driver: 'pg',
    schema: './src/lib/db/schema/*',
    out: './src/lib/db/drizzle',
    verbose: true,
    strict: true,
    dbCredentials: {
        host: process.env.DB_HOST as string,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE as string,
    },
} satisfies Config
