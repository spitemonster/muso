import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

import { AdminDashboardQuery } from './dashboard.query';
import { gqlRequest } from '$lib/server/gqlRequest';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = locals;

	if (!user) {
		redirect(302, '/login');
	}

	const res = await gqlRequest(AdminDashboardQuery, { id: user.id });

	return {
		user
	};
};
