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