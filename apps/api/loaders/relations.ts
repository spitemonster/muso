import type { AnyPgColumn, PgTable } from 'drizzle-orm/pg-core';
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
} from '@muso/db/schema';

type BaseRelation = {
	loaderKey: string;
	onType: string;
	fieldName: string;
	targetTypeKey: string;
};

export type JunctionRelation = BaseRelation & {
	kind: 'junction';
	junctionTable: PgTable;
	sourceFk: AnyPgColumn;
	targetFk: AnyPgColumn;
	targetTable: PgTable;
	targetPk: AnyPgColumn;
};

export type ForeignKeyRelation = BaseRelation & {
	kind: 'foreignKey';
	targetTable: PgTable;
	foreignKey: AnyPgColumn;
};

export type RelationConfig = JunctionRelation | ForeignKeyRelation;

export const relations: RelationConfig[] = [
	{
		kind: 'junction',
		loaderKey: 'artistsByCollectionId',
		onType: 'CollectionsSelectItem',
		fieldName: 'artists',
		targetTypeKey: 'ArtistsSelectItem',
		junctionTable: collectionArtists,
		sourceFk: collectionArtists.collectionId,
		targetFk: collectionArtists.artistId,
		targetTable: artists,
		targetPk: artists.id,
	},
	{
		kind: 'junction',
		loaderKey: 'collectionsByArtistId',
		onType: 'ArtistsSelectItem',
		fieldName: 'collections',
		targetTypeKey: 'CollectionsSelectItem',
		junctionTable: collectionArtists,
		sourceFk: collectionArtists.artistId,
		targetFk: collectionArtists.collectionId,
		targetTable: collections,
		targetPk: collections.id,
	},
	{
		kind: 'junction',
		loaderKey: 'artistsByTrackId',
		onType: 'TracksSelectItem',
		fieldName: 'artists',
		targetTypeKey: 'ArtistsSelectItem',
		junctionTable: trackArtists,
		sourceFk: trackArtists.trackId,
		targetFk: trackArtists.artistId,
		targetTable: artists,
		targetPk: artists.id,
	},
	{
		kind: 'junction',
		loaderKey: 'tracksByArtistId',
		onType: 'ArtistsSelectItem',
		fieldName: 'tracks',
		targetTypeKey: 'TracksSelectItem',
		junctionTable: trackArtists,
		sourceFk: trackArtists.artistId,
		targetFk: trackArtists.trackId,
		targetTable: tracks,
		targetPk: tracks.id,
	},
	{
		kind: 'junction',
		loaderKey: 'tagsByTrackId',
		onType: 'TracksSelectItem',
		fieldName: 'tags',
		targetTypeKey: 'TagsSelectItem',
		junctionTable: trackTags,
		sourceFk: trackTags.trackId,
		targetFk: trackTags.tagId,
		targetTable: tags,
		targetPk: tags.id,
	},
	{
		kind: 'junction',
		loaderKey: 'tagsByCollectionId',
		onType: 'CollectionsSelectItem',
		fieldName: 'tags',
		targetTypeKey: 'TagsSelectItem',
		junctionTable: collectionTags,
		sourceFk: collectionTags.collectionId,
		targetFk: collectionTags.tagId,
		targetTable: tags,
		targetPk: tags.id,
	},
	{
		kind: 'junction',
		loaderKey: 'tagsByArtistId',
		onType: 'ArtistsSelectItem',
		fieldName: 'tags',
		targetTypeKey: 'TagsSelectItem',
		junctionTable: artistTags,
		sourceFk: artistTags.artistId,
		targetFk: artistTags.tagId,
		targetTable: tags,
		targetPk: tags.id,
	},
	{
		kind: 'junction',
		loaderKey: 'tracksByTagId',
		onType: 'TagsSelectItem',
		fieldName: 'tracks',
		targetTypeKey: 'TracksSelectItem',
		junctionTable: trackTags,
		sourceFk: trackTags.tagId,
		targetFk: trackTags.trackId,
		targetTable: tracks,
		targetPk: tracks.id,
	},
	{
		kind: 'junction',
		loaderKey: 'collectionsByTagId',
		onType: 'TagsSelectItem',
		fieldName: 'collections',
		targetTypeKey: 'CollectionsSelectItem',
		junctionTable: collectionTags,
		sourceFk: collectionTags.tagId,
		targetFk: collectionTags.collectionId,
		targetTable: collections,
		targetPk: collections.id,
	},
	{
		kind: 'junction',
		loaderKey: 'artistsByTagId',
		onType: 'TagsSelectItem',
		fieldName: 'artists',
		targetTypeKey: 'ArtistsSelectItem',
		junctionTable: artistTags,
		sourceFk: artistTags.tagId,
		targetFk: artistTags.artistId,
		targetTable: artists,
		targetPk: artists.id,
	},
	{
		kind: 'foreignKey',
		loaderKey: 'tracksByCollectionId',
		onType: 'CollectionsSelectItem',
		fieldName: 'tracks',
		targetTypeKey: 'TracksSelectItem',
		targetTable: tracks,
		foreignKey: tracks.collectionId,
	},
];
