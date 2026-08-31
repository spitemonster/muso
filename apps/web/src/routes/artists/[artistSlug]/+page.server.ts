import { gqlRequest } from '$lib/server/gqlRequest.js';
import type { Artist } from '$lib/types';
import { ArtistBySlugWithCollectionsTagsQuery } from '$lib/queries';

export async function load({ params }) {
	const { artistSlug } = params;

	const result = await gqlRequest(ArtistBySlugWithCollectionsTagsQuery, { slug: artistSlug });
	const { artists }: { artists: Artist[]; } = result;
	const artist = artists[0];

	return {
		artist
	};
}