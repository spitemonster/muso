import {
	collectionArtists,
	trackArtists,
	trackTags,
	collectionTags,
	artistTags,
	tracks,
	collections,
	artists,
	tags,
} from '@muso/db/schema'

import { createJunctionLoader } from './createJunctionLoader'

export function createLoaders() {
	return {
		// collections <-> artists (via collectionArtists)
		// (tracks -> collection is a plain FK now, not a junction - drizzle-graphql
		// generates `Track.collection` / `Collection.tracks` natively, no loader needed)
		artistsByCollectionId: createJunctionLoader({
			junctionTable: collectionArtists,
			sourceFk: collectionArtists.collectionId,
			targetFk: collectionArtists.artistId,
			targetTable: artists,
			targetPk: artists.id,
		}),
		collectionsByArtistId: createJunctionLoader({
			junctionTable: collectionArtists,
			sourceFk: collectionArtists.artistId,
			targetFk: collectionArtists.collectionId,
			targetTable: collections,
			targetPk: collections.id,
		}),

		// tracks <-> artists (via trackArtists)
		artistsByTrackId: createJunctionLoader({
			junctionTable: trackArtists,
			sourceFk: trackArtists.trackId,
			targetFk: trackArtists.artistId,
			targetTable: artists,
			targetPk: artists.id,
		}),
		tracksByArtistId: createJunctionLoader({
			junctionTable: trackArtists,
			sourceFk: trackArtists.artistId,
			targetFk: trackArtists.trackId,
			targetTable: tracks,
			targetPk: tracks.id,
		}),

		// tags on tracks / collections / artists
		tagsByTrackId: createJunctionLoader({
			junctionTable: trackTags,
			sourceFk: trackTags.trackId,
			targetFk: trackTags.tagId,
			targetTable: tags,
			targetPk: tags.id,
		}),
		tagsByCollectionId: createJunctionLoader({
			junctionTable: collectionTags,
			sourceFk: collectionTags.collectionId,
			targetFk: collectionTags.tagId,
			targetTable: tags,
			targetPk: tags.id,
		}),
		tagsByArtistId: createJunctionLoader({
			junctionTable: artistTags,
			sourceFk: artistTags.artistId,
			targetFk: artistTags.tagId,
			targetTable: tags,
			targetPk: tags.id,
		}),
	}
}

export type Loaders = ReturnType<typeof createLoaders>
