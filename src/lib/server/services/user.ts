import bcrypt from 'bcrypt'
import { User } from '$lib/server/models/user'

export async function createUser(id: string, name: string, email: string, password: string, isArtist: boolean) {

	const hashedPassword = await bcrypt.hash(password, 10)

	try {
		const user = await User.create({
			id, 
			name,
			email,
			password: hashedPassword,
			isArtist
		})
		
		return user.toJSON();
	} catch (error) {
		if (error instanceof Error) return error.message
		return new Response(String(error))
	}
}

type UserQuery = {
	email?: string;
	id?: string;
}

export async function getUser(query: UserQuery) {
	if (query.email) {
		const u = await User.findOne({ where: { email: query.email } });

		if (u === null) {
			return {}
		}

		const j = u.toJSON();

		return j;
	}
}