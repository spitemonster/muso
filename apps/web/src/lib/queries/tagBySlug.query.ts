import { graphql } from '$lib/gql';

export const TagBySlugQuery = graphql(`
	query TagBySlug($slug: String!, $artistLimit: Int = 9, $collectionLimit: Int = 9, $trackLimit: Int = 9) {
		tags(where: { slug: { eq: $slug }}) {
			id
			slug
			name
			artists(limit: $artistLimit) {
				id
				slug
				name
				profileImageUrl
			}
			collections(limit: $collectionLimit) {
				id
				slug
				title
				coverUrl
				primaryArtist {
					id
					name
					slug
				}
				artists {
					id
					name
					slug
				}
			}
			tracks(limit: $trackLimit) {
				id
				slug
				title
				duration
				trackUrl
				primaryArtist {
					id
					name
					slug
				}
				artists {
					id
					slug
					name
				}
			}
		}
	}
`);