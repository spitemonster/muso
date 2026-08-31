import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

import { gqlRequest } from '$lib/server/gqlRequest';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = locals;

	if (!user) {
		redirect(302, '/login');
	}

	const query = `
		query GetUserData($id: String!) {
			users(where: { id: { eq: $id } }) {
				id
				name
			}
		}
	`;

	const res = await gqlRequest(query, { id: user.id });

	return {
		user
	};
};
