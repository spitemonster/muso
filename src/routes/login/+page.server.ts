import { redirect, type Actions } from "@sveltejs/kit";
import { loginUser } from "$lib/server/services/user";

export const actions: Actions = {
	default: async (event) => {
		const fd = Object.fromEntries(await event.request.formData());

		if (!fd.email || !fd.password) {
			return { status: 400, errors: { message: "Email, password, and name required." }};
		}

		try {
			const { email, password } = fd as { email: string; password: string; }

			const { err, token } = await loginUser(email, password);

			if (err) {
				throw new Error(err);
			}



			event.cookies.set('AuthorizationToken', `Bearer ${token}`, {
				httpOnly: true,
				path: '/',
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 // 1 day
			});
			
		} catch (err) {
			console.error(err);
			return { status: 400, errors: { message: `${err}` }};
		}

		throw redirect(302, '/');
	}
}