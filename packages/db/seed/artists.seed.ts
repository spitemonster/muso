import { faker } from '@faker-js/faker'

export async function generateArtistData(artistCount: number, userIds: readonly string[]) {
	const generatedArtistData = []
	const assignedArtistNames = new Set<string>()

	for (let i = 0; i < artistCount; i++) {
		const id = crypto.randomUUID()
		let name: string

		do {
			name = faker.word.words(Math.round(Math.random() * 2) + 1)
		} while (assignedArtistNames.has(name))

		assignedArtistNames.add(name)
		const slug = name.replaceAll(' ', '-')

		generatedArtistData.push({
			id,
			name,
			slug,
			url: faker.internet.url(),
			ownerId: faker.helpers.arrayElement(userIds),
			biography: faker.word.words({
				count: {
					min: 10,
					max: 30,
				},
			}),
			profileImageUrl: `https://picsum.photos/200.webp?${Math.floor(Math.random() * 99)}`,
			location: `${faker.location.city()}, ${faker.location.country()}`,
		})
	}

	return generatedArtistData
}
