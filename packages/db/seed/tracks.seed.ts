import { faker } from '@faker-js/faker'

import * as schema from '../schema'

export async function generateTrackData(
	artists: (typeof schema.artists.$inferInsert)[],
	collections: (typeof schema.collections.$inferInsert)[],
	collectionArtists: (typeof schema.collectionArtists.$inferInsert)[],
): Promise<{
	trackData: (typeof schema.tracks.$inferInsert)[]
	trackArtistData: (typeof schema.trackArtists.$inferInsert)[]
}> {
	const trackData: (typeof schema.tracks.$inferInsert)[] = []
	const trackArtistData: (typeof schema.trackArtists.$inferInsert)[] = []

	collections.forEach((collection) => {
		const collectionArtistIds = collectionArtists
			.filter((collectionArtist) => collectionArtist.collectionId === collection.id)
			.map((collectionArtist) => collectionArtist.artistId)

		const ownerId = collection.ownerId
		const trackCount = faker.number.int({ min: 3, max: 15 })

		for (let t = 0; t < trackCount; t++) {
			const trackId = crypto.randomUUID()
			const title = faker.word.words(Math.round(Math.random() * 4) + 1)
			const slug = title.replaceAll(' ', '-')

			trackData.push({
				id: trackId,
				title,
				slug,
				collectionId: collection.id,
				ownerId,
			})

			// tracks default to the collection's credited artist(s)...
			collectionArtistIds.forEach((artistId) => {
				trackArtistData.push({ trackId, artistId })
			})

			// ...occasionally with an additional featured artist not otherwise on the collection
			if (faker.datatype.boolean({ probability: 0.15 })) {
				const featuredArtistPool = artists.filter(
					(artist) => !collectionArtistIds.includes(artist.id),
				)
				const featuredArtist = faker.helpers.arrayElement(featuredArtistPool)

				trackArtistData.push({ trackId, artistId: featuredArtist.id })
			}
		}
	})

	return { trackData, trackArtistData }
}
