import { faker } from '@faker-js/faker';

import * as schema from '../schema';

const SINGLE_TRACK_CONFIG = { min: 1, max: 5 };
const EP_TRACK_CONFIG = { min: 1, max: 7 };
const ALBUM_TRACK_CONFIG = { min: 6, max: 15 };
const COMPILATION_TRACK_CONFIG = { min: 10, max: 30 };

// track count range differs slightly per collection type
const trackCount = (collection: typeof schema.collections.$inferInsert) => {
	switch (collection.type) {
		case 'single':
			return faker.number.int(SINGLE_TRACK_CONFIG);
		case 'ep':
			return faker.number.int(EP_TRACK_CONFIG);
		case 'album':
			return faker.number.int(ALBUM_TRACK_CONFIG);
		case 'compilation':
			return faker.number.int(COMPILATION_TRACK_CONFIG);
		default:
			return 9;
	}
};

export async function generateTrackData(
	collections: (typeof schema.collections.$inferInsert)[],
	artists: (typeof schema.artists.$inferInsert)[],
	collectionArtists: (typeof schema.collectionArtists.$inferInsert)[],
): Promise<{
	trackData: (typeof schema.tracks.$inferInsert)[];
	trackArtistData: (typeof schema.trackArtists.$inferInsert)[];
	trackAdminData: (typeof schema.trackAdmins.$inferInsert)[];
}> {
	const trackData: (typeof schema.tracks.$inferInsert)[] = [];
	const trackArtistData: (typeof schema.trackArtists.$inferInsert)[] = [];
	const trackAdminData: (typeof schema.trackAdmins.$inferInsert)[] = [];

	collections.forEach((collection) => {
		// get artist by way of collection artist artist id
		const collectionArtist: typeof schema.collectionArtists.$inferInsert =
			collectionArtists.find(
				(ca) => ca.collectionId === collection.id,
			) as typeof schema.collectionArtists.$inferInsert;

		const artist: typeof schema.artists.$inferInsert = artists.find(
			(a) => a.id === collectionArtist.artistId,
		) as typeof schema.artists.$inferInsert;

		for (let i = 0; i < trackCount(collection); i++) {
			const trackId = crypto.randomUUID();
			const title = faker.word.words(Math.round(Math.random() * 4) + 1);
			const slug = title.replaceAll(' ', '-');

			const track = {
				id: trackId,
				title,
				slug,
				collectionId: collection.id,
				ownerId: artist.ownerId,
			};

			trackData.push(track);

			const trackArtist: typeof schema.trackArtists.$inferInsert = {
				artistId: '',
				trackId: '',
			};

			trackArtist.trackId = track.id;
			trackArtist.artistId = artist.id;
			trackArtistData.push(trackArtist);

			trackAdminData.push({
				trackId: track.id,
				userId: artist.ownerId
			});
		}
	});

	return { trackData, trackArtistData, trackAdminData };
}
