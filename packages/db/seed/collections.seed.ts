import { faker } from '@faker-js/faker'

import * as schema from '../schema'

export async function generateCollectionData(
	collectionCount: number,
	artistData: readonly (typeof schema.artists.$inferInsert)[],
): Promise<{
	collectionData: (typeof schema.collections.$inferInsert)[]
	collectionArtistData: (typeof schema.collectionArtists.$inferInsert)[]
}> {
	const collectionData: (typeof schema.collections.$inferInsert)[] = []
	const collectionArtistData: (typeof schema.collectionArtists.$inferInsert)[] = []

	for (let i = 0; i < collectionCount; i++) {
		const id = crypto.randomUUID()
		const title = faker.word.words(Math.round(Math.random() * 2) + 1)
		const slug = title.replaceAll(' ', '-')
		const type = faker.helpers.arrayElement(['album', 'ep', 'single', 'compilation'] as const)

		// singles/eps are usually one artist; compilations are more likely to have several
		const artistCount = type === 'compilation' ? faker.number.int({ min: 1, max: 4 }) : 1
		const collectionArtistPool = faker.helpers.arrayElements(artistData, artistCount)

		collectionData.push({
			id,
			title,
			slug,
			type,
			ownerId: faker.helpers.arrayElement(collectionArtistPool).ownerId,
		})

		collectionArtistPool.forEach((artist) => {
			collectionArtistData.push({
				collectionId: id,
				artistId: artist.id,
			})
		})
	}

	return { collectionData, collectionArtistData }
}
