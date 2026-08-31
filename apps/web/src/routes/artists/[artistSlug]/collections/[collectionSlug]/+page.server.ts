import { gqlRequest } from '$lib/server/gqlRequest.js';
import type { Artist } from '$lib/types';
import { ArtistBySlugCollectionsWithTracksQuery } from '$lib/queries/artistBySlugCollectionsWithTracks.query.js';

export async function load({ params }) {
	const { artistSlug, collectionSlug } = params;

	const result = await gqlRequest(ArtistBySlugCollectionsWithTracksQuery, { slug: artistSlug });
	const { artists }: { artists: Artist[]; } = result;
	const artist = artists[0];

	const collection = artist.collections?.find(col => col.slug === collectionSlug);

	return {
		collection
	};
}