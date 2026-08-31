import { graphql } from '$lib/gql';

export const ArtistBySlugCollectionsWithTracksQuery = graphql(`
	query ArtistBySlugCollectionsWithTracks($slug: String!, $collectionLimit: Int) {
		artists(where: { slug: { eq: $slug }}) {
			collections(limit: $collectionLimit) {
				id
				title
				slug
				coverUrl
				description
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
				tracks {
					id
					title
					slug
					duration
					trackUrl
					artists {
						id
						name
						slug
					}
					primaryArtist {
						id
						name
						slug
					}
				}
			}
		}
	}
`);