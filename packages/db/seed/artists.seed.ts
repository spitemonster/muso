import { faker } from '@faker-js/faker';
import * as schema from '../schema';

import { TEST_ADMIN_EMAIL } from './users.seed';

const assignedArtistNames = new Set<string>();

const createArtistName = () => {
	let name: string;

	do {
		name = faker.word.words(Math.round(Math.random() * 2) + 1);
	} while (assignedArtistNames.has(name));

	assignedArtistNames.add(name);

	return name;
};

export async function generateArtistData(
	artistCount: number,
	users: (typeof schema.users.$inferInsert)[],
) {
	const artistData: (typeof schema.artists.$inferInsert)[] = [];
	const artistAdminData: (typeof schema.artistAdmins.$inferInsert)[] = [];

	for (let i = 0; i < artistCount; i++) {
		const id = crypto.randomUUID();
		const name = createArtistName();
		const slug = name.replaceAll(' ', '-');
		let user: (typeof schema.users.$inferInsert) = faker.helpers.arrayElement(users);

		// bolt the first five artists on to the test admin
		if (i < 5) {
			user = users.find(u => u.email === TEST_ADMIN_EMAIL) as (typeof schema.users.$inferInsert);
		}

		const artist = {
			id,
			name,
			slug,
			url: faker.internet.url(),
			ownerId: user.id,
			biography: faker.word.words({
				count: {
					min: 10,
					max: 30,
				},
			}),
			profileImageUrl: `https://picsum.photos/200.webp?${Math.floor(Math.random() * 99)}`,
			location: `${faker.location.city()}, ${faker.location.country()}`,
		};

		artistData.push(artist);

		const artistAdmin: typeof schema.artistAdmins.$inferInsert = {} as typeof schema.artistAdmins.$inferInsert;

		artistAdmin.artistId = artist.id;
		artistAdmin.userId = user.id;

		artistAdminData.push(artistAdmin);
	}

	return { artistData, artistAdminData };
}
