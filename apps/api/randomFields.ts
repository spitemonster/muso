import type { PgTable } from 'drizzle-orm/pg-core';
import { tracks, artists, collections, tags } from '@muso/db/schema';

export type RandomFieldConfig = {
	fieldName: string;
	table: PgTable;
	targetTypeKey: string;
};

export const randomFields: RandomFieldConfig[] = [
	{ fieldName: 'randomTracks', table: tracks, targetTypeKey: 'TracksSelectItem' },
	{ fieldName: 'randomArtists', table: artists, targetTypeKey: 'ArtistsSelectItem' },
	{ fieldName: 'randomCollections', table: collections, targetTypeKey: 'CollectionsSelectItem' },
	{ fieldName: 'randomTags', table: tags, targetTypeKey: 'TagsSelectItem' },
];
