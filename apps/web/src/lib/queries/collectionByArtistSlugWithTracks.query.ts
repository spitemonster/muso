import { graphql } from '$lib/gql';

export const CollectionByArtistSlugQuery = graphql(`
	query ArtistBySlugCollections($slug: String!, $collectionLimit: Int) {
		artists(where: { slug: { eq: $slug }}) {
			collections(limit: $collectionLimit) {
				id
				title
				slug
				coverUrl
				description
				tracks {
					id
					title
					slug
					duration
				}
			}
		}
	}
`);