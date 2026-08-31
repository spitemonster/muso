import type { PageServerLoad } from './$types';
import { gqlRequest } from '$lib/server/gqlRequest';
import { DiscoverPageQuery } from '$lib/queries';

export const load: PageServerLoad = async ({ locals }) => {
	const res = await gqlRequest(DiscoverPageQuery, {});

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
