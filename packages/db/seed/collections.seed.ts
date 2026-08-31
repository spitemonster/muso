import { faker } from '@faker-js/faker';
import { slugify } from "../utils/slugify.util";

import * as schema from '../schema';

const collectionTitle = () => {
	const words = faker.word.words(Math.round(Math.random() * 4) + 1);

	return words.toLowerCase()
		.split(' ')
		.map(word =>
			word.charAt(0).toUpperCase() + word.slice(1)
		)
		.join(' ');
};

export async function generateCollectionData(
	artistData: readonly (typeof schema.artists.$inferInsert)[],
	perArtistRange: { min: number; max: number; } = { min: 1, max: 5 },
): Promise<{
	collectionData: (typeof schema.collections.$inferInsert)[];
	collectionArtistData: (typeof schema.collectionArtists.$inferInsert)[];
	collectionAdminData: (typeof schema.collectionAdmins.$inferInsert)[];
}> {
	const collectionData: (typeof schema.collections.$inferInsert)[] = [];
	const collectionArtistData: (typeof schema.collectionArtists.$inferInsert)[] = [];
	const collectionAdminData: (typeof schema.collectionAdmins.$inferInsert)[] = [];

	artistData.forEach((artist) => {
		const count = faker.number.int(perArtistRange);

		for (let i = 0; i < count; i++) {
			const id = crypto.randomUUID();
			const title = collectionTitle();
			const slug = slugify(title);
			const type = faker.helpers.arrayElement([
				'album',
				'ep',
				'single',
				'compilation',
			] as const);

			const collection = {
				id,
				title,
				slug,
				type,
				primaryArtistId: artist.id,
				coverUrl: `https://picsum.photos/600.webp?${Math.floor(Math.random() * 99)}`,
				description: faker.lorem.paragraph(),
				ownerId: artist.ownerId,
			};

			collectionData.push(collection);

			collectionArtistData.push({
				collectionId: collection.id,
				artistId: artist.id,
			});

			collectionAdminData.push({
				collectionId: collection.id,
				userId: collection.ownerId
			});
		}
	});

	return { collectionData, collectionArtistData, collectionAdminData };
}
