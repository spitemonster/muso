import { API_URL } from '$env/static/private';
import type { LoginUserResponse } from '$lib/types';

export async function loginUser(email: string, password: string): Promise<LoginUserResponse> {
	const res = await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});

	return res.json();
}
