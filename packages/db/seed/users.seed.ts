import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const TEST_LISTENER_EMAIL = 'test.listener@muso.test';
export const TEST_ADMIN_EMAIL = 'test.admin@muso.test';
export const TEST_USER_PASSWORD = 'password123';

export async function generateUserData(userCount: number) {
	const testPasswordHash = await bcrypt.hash(TEST_USER_PASSWORD, 10);

	const generatedUserData = [
		{
			id: crypto.randomUUID(),
			name: 'Test Listener',
			email: TEST_LISTENER_EMAIL,
			password: testPasswordHash,
			type: 'user',
		},
		{
			id: crypto.randomUUID(),
			name: 'Test Admin',
			email: TEST_ADMIN_EMAIL,
			password: testPasswordHash,
			type: 'user',
		},
	];

	for (let i = 0; i < userCount; i++) {
		const id = crypto.randomUUID();

		generatedUserData.push({
			id,
			name: `${faker.person.firstName()} ${faker.person.lastName()}`,
			email: faker.internet.email(),
			password: faker.string.sample(60),
			type: i < 5 ? 'user' : 'admin',
		});
	}

	return generatedUserData;
}
