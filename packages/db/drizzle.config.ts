import type { Config } from 'drizzle-kit'

export default {
    dialect: 'postgresql',
    schema: './schema',
    out: './drizzle',
    verbose: true,
    strict: true,
    dbCredentials: {
        host: process.env.POSTGRES_HOST as string,
        port: Number(process.env.POSTGRES_PORT),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB as string,
        ssl: false,
    },
} satisfies Config
