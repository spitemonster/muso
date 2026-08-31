import { graphql } from '$lib/gql';

export const ArtistCardFragment = graphql(`
	fragment ArtistCard_Artist on ArtistsSelectItem {
		id
		name
	}
`);
