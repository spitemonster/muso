import type { PageServerLoad } from './$types';
import { gqlRequest } from '$lib/server/gqlRequest';

export const load: PageServerLoad = async ({ locals }) => {
	const query = `
		{
			randomTags(count: 24) {
				name
				slug
			}
			randomArtists(count: 9) {
				name
				slug
				profileImageUrl
			}
			randomCollections(count: 16) {
				title
				slug
				coverUrl
				tracks {
					title
				}
				primaryArtist {
					id
					slug
				}
				artists {
					name
					slug
				}
			}
			randomTracks(count: 24) {
				id
				title
				slug
				trackUrl
				primaryArtist {
					name
					slug
					profileImageUrl
				}
			}
		}
	`;

	const res = await gqlRequest(query, {});

	const {
		randomTags: tags,
		randomArtists: artists,
		randomCollections: collections,
		randomTracks: tracks
	} = res;

	return {
		tags, artists, collections, tracks
	};
};
