import bcrypt from 'bcrypt'
import { User } from '$lib/server/models/user'
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '$env/static/private';

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

		const j = await user.toJSON();

		return { user: j }
	} catch (err) {
		let msg: string;
		if (err instanceof Error) {
			msg = err.message
		} else {
			msg = String(err)
		}

		console.error(err);

		return { err: msg };
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
			return { id: null }
		}

		const j = u.toJSON();

		console.log("user: ", j)

		return j;
	}
}

export async function loginUser(email: string, password: string) {
	const user = await getUser({ email });

	if (!user.id || !(await bcrypt.compare(password, user.password))) {
		return { err: "The provided email and password do not correspond to an account in our records." }
	}

	console.log('user has successfully authenticated');

	const u = {
		id: user.id,
		email: user.email
	}

	const token = jwt.sign(u, JWT_PRIVATE_KEY, {
		expiresIn: '1d'
	});

	return { token }
}