import type { PageServerLoad } from './$types';
import { gqlRequest } from '$lib/server/gqlRequest';
import { TagBySlugQuery } from '$lib/queries';


export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const res = await gqlRequest(TagBySlugQuery, { slug });

	const {
		tags
	} = res;

	const tag = tags[0];

	const { artists, collections, tracks } = tag;

	return {
		tag,
		artists,
		collections,
		tracks
	};
};
