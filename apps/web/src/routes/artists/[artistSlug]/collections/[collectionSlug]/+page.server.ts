import { gqlRequest } from '$lib/server/gqlRequest.js';
import type { Artist } from '$lib/types';

export async function load({ params }) {
	const { artistSlug, collectionSlug } = params;

	const query = `
		query getCollectionData($artistSlug: String!) {
			artists(where: { slug: { eq: $artistSlug }}) {
				collections {
					id
					title
					slug
					coverUrl
					description
					tracks {
						id
						title
						trackUrl
						duration
					}
				}
			}
		}
	`;

	const result = await gqlRequest(query, { artistSlug });
	const { artists }: { artists: Artist[]; } = result;
	const artist = artists[0];

	const collection = artist.collections?.find(col => col.slug === collectionSlug);

	return {
		collection
	};
}