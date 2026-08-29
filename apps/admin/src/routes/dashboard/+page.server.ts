import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { User } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = locals;

	if (!user) {
		redirect(302, '/login');
	}

	return {
		user
	};
};
