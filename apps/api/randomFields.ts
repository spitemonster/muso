export type RandomFieldConfig = {
	fieldName: string;
	tableName: 'tracks' | 'artists' | 'collections' | 'tags';
	targetTypeKey: string;
	with?: Record<string, true>;
};

export const randomFields: RandomFieldConfig[] = [
	{ fieldName: 'randomTracks', tableName: 'tracks', targetTypeKey: 'TracksSelectItem', with: { primaryArtist: true, collection: true } },
	{ fieldName: 'randomArtists', tableName: 'artists', targetTypeKey: 'ArtistsSelectItem' },
	{ fieldName: 'randomCollections', tableName: 'collections', targetTypeKey: 'CollectionsSelectItem', with: { primaryArtist: true } },
	{ fieldName: 'randomTags', tableName: 'tags', targetTypeKey: 'TagsSelectItem' },
];
