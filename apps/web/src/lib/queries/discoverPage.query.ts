import { graphql } from '$lib/gql';

export const DiscoverPageQuery = graphql(`
		query DiscoverPage(
			$tagCount: Int = 24,
			$artistCount: Int = 9,
			$collectionCount: Int = 16,
			$trackCount: Int = 24
		) {
			randomTags(count: $tagCount) {
				name
				slug
			}
			randomArtists(count: $artistCount) {
				name
				slug
				profileImageUrl
			}
			randomCollections(count: $collectionCount) {
				title
				slug
				coverUrl
				tracks {
					title
				}
				primaryArtist {
					id
					slug
				}
				artists {
					name
					slug
				}
			}
			randomTracks(count: $trackCount) {
				id
				title
				slug
				trackUrl
				primaryArtist {
					name
					slug
					profileImageUrl
				}
			}
		}
	`);