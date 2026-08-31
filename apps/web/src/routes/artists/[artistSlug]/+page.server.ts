import { gqlRequest } from '$lib/server/gqlRequest.js';
import type { Artist } from '$lib/types';

export async function load({ params }) {
	const { artistSlug } = params;

	const query = `
		query getArtistData($slug: String!) {
			artists(where: { slug: { eq: $slug }}) {
				id
				name
				collections {
					id
					title
					slug
				}
				tags {
					name
					slug
				}
			}
		}
	`;

	const result = await gqlRequest(query, { slug: artistSlug });
	const { artists }: { artists: Artist[]; } = result;
	const artist = artists[0];

	return {
		artist
	};
}