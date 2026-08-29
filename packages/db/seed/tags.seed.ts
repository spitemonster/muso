import { faker } from '@faker-js/faker';
import * as schema from '../schema';

const assignedTagNames = new Set<string>();

const createTagName = () => {
	let name: string;

	do {
		name = faker.word.words(Math.max(Math.round(Math.random() * 2), 1));
	} while (assignedTagNames.has(name));

	assignedTagNames.add(name);

	return name;
};

export async function generateTagData(tagCount: number): Promise<(typeof schema.tags.$inferInsert)[]> {
	const tagData: (typeof schema.tags.$inferInsert)[] = [];

	for (let i = 0; i < tagCount; i++) {
		const id = crypto.randomUUID();
		const name = createTagName();
		const slug = name.replaceAll(' ', '-');

		tagData.push({
			id,
			name,
			slug,
		});
	}

	return tagData;
}

export async function generateArtistTagData(
	artists: (typeof schema.artists.$inferInsert)[],
	tags: (typeof schema.tags.$inferInsert)[],
	tagRange: { min: number, max: number; } = { min: 1, max: 20 }
): Promise<(typeof schema.artistTags.$inferInsert)[]> {
	const artistTags: (typeof schema.artistTags.$inferInsert)[] = [];

	artists.forEach(artist => {
		const count = faker.number.int(tagRange);
		const assignedTags = new Set();

		for (let i = 0; i < count; i++) {
			let tag = faker.helpers.arrayElement(tags);

			while (assignedTags.has(tag)) {
				tag = faker.helpers.arrayElement(tags);
			}

			assignedTags.add(tag);

			const artistTag: (typeof schema.artistTags.$inferInsert) = {
				artistId: artist.id,
				tagId: tag.id
			};

			artistTags.push(artistTag);
		}
	});

	return artistTags;
}

export async function generateCollectionTagData(
	collections: (typeof schema.collections.$inferInsert)[],
	tags: (typeof schema.tags.$inferInsert)[],
	tagRange: { min: number, max: number; } = { min: 1, max: 20 }
): Promise<(typeof schema.collectionTags.$inferInsert)[]> {
	const collectionTags: (typeof schema.collectionTags.$inferInsert)[] = [];

	collections.forEach(collection => {
		const count = faker.number.int(tagRange);
		const assignedTags = new Set();

		for (let i = 0; i < count; i++) {
			let tag = faker.helpers.arrayElement(tags);

			while (assignedTags.has(tag)) {
				tag = faker.helpers.arrayElement(tags);
			}

			assignedTags.add(tag);

			const collectionTag: (typeof schema.collectionTags.$inferInsert) = {
				collectionId: collection.id,
				tagId: tag.id
			};

			collectionTags.push(collectionTag);
		}
	});

	return collectionTags;
}

export async function generateTrackTagData(
	tracks: (typeof schema.tracks.$inferInsert)[],
	tags: (typeof schema.tags.$inferInsert)[],
	tagRange: { min: number, max: number; } = { min: 1, max: 20 }
): Promise<(typeof schema.trackTags.$inferInsert)[]> {
	const trackTags: (typeof schema.trackTags.$inferInsert)[] = [];

	tracks.forEach(track => {
		const count = faker.number.int(tagRange);
		const assignedTags = new Set();

		for (let i = 0; i < count; i++) {
			let tag = faker.helpers.arrayElement(tags);

			while (assignedTags.has(tag)) {
				tag = faker.helpers.arrayElement(tags);
			}

			assignedTags.add(tag);

			const trackTag: (typeof schema.trackTags.$inferInsert) = {
				trackId: track.id,
				tagId: tag.id
			};

			trackTags.push(trackTag);
		}
	});

	return trackTags;
}