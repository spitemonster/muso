import { db } from '../db';
import * as schema from '../schema';
import { client } from '../db';
import { getTableName } from 'drizzle-orm';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { generateUserData } from './users.seed';
import { generateArtistData } from './artists.seed';
import { generateTagData, generateArtistTagData, generateCollectionTagData, generateTrackTagData } from './tags.seed';
import { generateCollectionData } from './collections.seed';
import { generateTrackData } from './tracks.seed';

const userCount = 500;
const artistCount = 500;
const tagCount = 500;

async function batchInsert<T extends Record<string, unknown>>(
	table: Parameters<typeof db.insert>[0],
	rows: T[],
	batchSize = 500
) {
	for (let i = 0; i < rows.length; i += batchSize) {
		await db.insert(table).values(rows.slice(i, i + batchSize));
	}
}

const main = async () => {
	try {
		const userData: (typeof schema.users.$inferInsert)[] = (await generateUserData(
			userCount,
		)) as (typeof schema.users.$inferInsert)[];

		console.log("========== CREATED USER DATA ==========");

		const { artistData, artistAdminData } = (await generateArtistData(
			artistCount,
			userData
		));

		console.log('========== CREATED ARTIST DATA ==========');

		const { collectionData, collectionArtistData, collectionAdminData } = await generateCollectionData(artistData);

		console.log('========== CREATED COLLECTION DATA ==========');

		const { trackData, trackArtistData, trackAdminData } = await generateTrackData(
			collectionData,
			artistData,
			collectionArtistData,
		);

		console.log('========== CREATED TRACK DATA ==========');

		const tagData = await generateTagData(tagCount);
		const artistTagData = await generateArtistTagData(artistData, tagData);
		const collectionTagData = await generateCollectionTagData(collectionData, tagData);
		const trackTagData = await generateTrackTagData(trackData, tagData);

		console.log('========== CREATED TAG DATA ==========');

		console.log('building insert map...');

		const insertMap = new Map<PgTableWithColumns<any>, Record<string, unknown>[]>([
			[schema.users, userData],
			[schema.artists, artistData],
			[schema.artistAdmins, artistAdminData],
			[schema.collections, collectionData],
			[schema.collectionArtists, collectionArtistData],
			[schema.collectionAdmins, collectionAdminData],
			[schema.tracks, trackData],
			[schema.trackArtists, trackArtistData],
			[schema.trackAdmins, trackAdminData],
			[schema.tags, tagData],
			[schema.artistTags, artistTagData],
			[schema.collectionTags, collectionTagData],
			[schema.trackTags, trackTagData],
		]);

		console.log('beginning db insert...');

		for (const [table, data] of insertMap) {
			console.log(`     inserting ${getTableName(table)} data...`);
			const start = performance.now();
			await batchInsert(table, data);
			const end = performance.now();

			const duration = end - start;
			console.log(`		...finished. time: ${duration.toFixed(4)} ms`);
		}

		console.log('db insert completed.');

		console.log('========== FINISHED ==========');
	} catch (err) {
		console.error(err);
		return;
	}

	client.end();
};

main();
