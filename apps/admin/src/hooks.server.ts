import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import type { User } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
	const auth_token = event.cookies.get('auth_token');

	if (!auth_token) {
		event.locals.user = undefined;
		return resolve(event);
	}

	try {
		event.locals.user = jwt.verify(auth_token, JWT_PRIVATE_KEY) as User;
	} catch (err) {
		event.locals.user = undefined;
	}

	return resolve(event);
};
