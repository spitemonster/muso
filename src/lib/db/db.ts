import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import {
    DB_DATABASE,
    DB_HOST,
    DB_USER,
    DB_PORT,
    AWS_ACCESS_KEY,
    AWS_SECRET_KEY,
} from '$env/static/private'
import * as schema from '$lib/db/schema/'
import aws from 'aws-sdk'

aws.config.update({
    region: 'us-west-2',
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
})

export const s3 = new aws.S3()

export const client = new pg.Client({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    database: DB_DATABASE,
})

export const db = drizzle(client, { schema })
