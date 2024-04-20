import type { Actions } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { getUser, createUser } from "$lib/server/services/user";
import { generateID } from "$lib/server/services/id";

// default signup action
export const actions: Actions = {
	default: async (event) => {
		const fd = Object.fromEntries(await event.request.formData());

		if (!fd.email || !fd.password || !fd.name) {
			return { status: 400, errors: { message: "Email, password, and name required." }};
		}

		const { email, password, name, isArtist } = fd as { email: string; password: string; name: string; isArtist: string; }
		const artist = isArtist == 'on';

		try {
			const { id } = await getUser({ email });

			// fail if user already exists
			if (id) {
				throw new Error("User with email already exists");
			}

			const { err } = await createUser(generateID(), name, email, password, artist)

			// fail if there were issues creating the user
			if (err) {
				throw new Error(`There was an issue creating your account: ${err}.`);
			}
		} catch (err) {
			if (err instanceof Error) {
				return { status: 500, errors: { message: `${err.message}` }};
			}

			return { status: 500, errors: { message: `${err}` }};
		}

		redirect(302, '/login')
	}
}