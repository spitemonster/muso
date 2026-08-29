import { Hono } from 'hono';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '@muso/db/db';
import { users } from '@muso/db/schema';

export const auth = new Hono();

auth.post('/login', async (c) => {
	const { email, password } = await c.req.json();

	if (!email || !password) {
		return c.json({ error: true, message: 'Email and password are required.' }, 400);
	}

	const [user] = await db.select().from(users).where(eq(users.email, email));

	if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
		return c.json({ error: true, message: 'Invalid email or password.' }, 401);
	}

	const payload = { id: user.id, name: user.name, email: user.email, type: user.type };
	const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY!, { expiresIn: '1d' });

	return c.json({ error: false, message: 'Logged in.', user: payload, token });
});
