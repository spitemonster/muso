import { error } from '@sveltejs/kit';
import { getUser } from '$lib/server/services/user';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = () => {
	return new Response(String("POSTED"));
}

export const GET: RequestHandler = async ({ request }) => {
	const fd = Object.fromEntries(await request.formData());
	
	if (!fd.email && !fd.id) {
		error(400, "Route requires user email or ID");
	}

	const user = await getUser({ email: fd.email as string });

	return new Response(String(JSON.stringify(user)));
};