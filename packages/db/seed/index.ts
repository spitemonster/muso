import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import * as schema from '../schema'

import { generateUserData, TEST_ADMIN_EMAIL } from './users.seed'
import { generateArtistData } from './artists.seed'
import { generateTagData } from './tags.seed'
import { generateCollectionData } from './collections.seed'
import { generateTrackData } from './tracks.seed'

const userCount = 130
const artistCount = 200
const tagCount = 200

const main = async () => {
	try {
		const userData: (typeof schema.users.$inferInsert)[] = (await generateUserData(
			userCount,
		)) as (typeof schema.users.$inferInsert)[]
		const userIds: string[] = userData.map((u) => u.id)

		const artistData = (await generateArtistData(
			artistCount,
			userIds,
		)) as (typeof schema.artists.$inferInsert)[]

		const { collectionData, collectionArtistData } = await generateCollectionData(600, artistData)

		const { trackData, trackArtistData } = await generateTrackData(
			artistData,
			collectionData,
			collectionArtistData,
		)

		const tagData = (await generateTagData(tagCount)) as (typeof schema.tags.$inferInsert)[]

		// artist/collection/track tags and admins aren't generated yet -
		// TODO: wire these up once tag assignment / admin ownership rules are settled

		const client = new pg.Client({
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			user: process.env.POSTGRES_USER,
			database: process.env.POSTGRES_DB,
			password: process.env.POSTGRES_PASSWORD,
		})

		client.connect()

		const db = drizzle(client, { schema })

		await db.insert(schema.users).values(userData)
		await db.insert(schema.artists).values(artistData)
		await db.insert(schema.collections).values(collectionData)
		await db.insert(schema.collectionArtists).values(collectionArtistData)
		await db.insert(schema.tracks).values(trackData)
		await db.insert(schema.trackArtists).values(trackArtistData)
		await db.insert(schema.tags).values(tagData)

		client.end()
	} catch (err) {
		console.error(err)
	}
}

main()
