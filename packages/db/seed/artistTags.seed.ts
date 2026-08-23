import { faker } from '@faker-js/faker'

import * as schema from '../schema'

export async function generateArtistTagData(
	artistTagCount: number,
	artistData: readonly (typeof schema.artists.$inferInsert)[],
	tagData: readonly (typeof schema.tags.$inferInsert)[],
) {
	const generatedArtistTagData = []

	for (let i = 0; i < artistTagCount; i++) {
		const id = crypto.randomUUID()
		const ad = faker.helpers.arrayElement(artistData)
		const tag = faker.helpers.arrayElement(tagData)

		generatedArtistTagData.push({
			id,
			artistId: ad.id,
			tagId: tag.id,
		})
	}

	return generatedArtistTagData
}
