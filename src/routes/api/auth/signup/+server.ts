import { getUser, createUser } from '$lib/server/services/user'
import { fail, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function generateID(length: number = 8): string {
	const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomPosition = Math.floor(Math.random() * charset.length);
        randomString += charset.charAt(randomPosition);
    }
    return randomString;
}

export const POST: RequestHandler = async ({ request }) => {
	const fd = await request.formData();
	const email = fd.get('email') as string;
	const password = fd.get('password') as string;
	const name = fd.get('name') as string;
	const isArtist = fd.get('isArtist') == 'on';

	try {
		const user = await createUser(generateID(), name, email, password, isArtist)
		return new Response(String(JSON.stringify(user)));
	} catch (error) {
		if (error instanceof Error) return new Response(error.message)
  		return new Response(String(error))
	}
}

export const GET: RequestHandler = async ({ request }) => {
	const fd = Object.fromEntries(await request.formData());
	
	if (!fd.email && !fd.id) {
		return fail(400, {
			error: "Route requires user email or ID"
		})
	}

	const user = await getUser({ email })
};