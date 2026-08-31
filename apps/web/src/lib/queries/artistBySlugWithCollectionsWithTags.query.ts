import { graphql } from '$lib/gql';

export const ArtistBySlugWithCollectionsTagsQuery = graphql(`
	query ArtistBySlugWithCollectionsTags($slug: String!) {
		artists(where: { slug: { eq: $slug }}) {
			id
			name
			biography
			collections {
				id
				title
				slug
				primaryArtist {
					id
					name
					slug
				}
			}
			tags {
				name
				slug
			}
		}
	}
`);