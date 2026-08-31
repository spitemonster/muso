import type { AnyPgColumn, PgTable } from 'drizzle-orm/pg-core';
import * as schema from '@muso/db/schema';

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
		junctionTable: schema.collectionArtists,
		sourceFk: schema.collectionArtists.collectionId,
		targetFk: schema.collectionArtists.artistId,
		targetTable: schema.artists,
		targetPk: schema.artists.id,
	},
	{
		kind: 'junction',
		loaderKey: 'collectionsByArtistId',
		onType: 'ArtistsSelectItem',
		fieldName: 'collections',
		targetTypeKey: 'CollectionsSelectItem',
		junctionTable: schema.collectionArtists,
		sourceFk: schema.collectionArtists.artistId,
		targetFk: schema.collectionArtists.collectionId,
		targetTable: schema.collections,
		targetPk: schema.collections.id,
	},
	{
		kind: 'junction',
		loaderKey: 'artistsByTrackId',
		onType: 'TracksSelectItem',
		fieldName: 'artists',
		targetTypeKey: 'ArtistsSelectItem',
		junctionTable: schema.trackArtists,
		sourceFk: schema.trackArtists.trackId,
		targetFk: schema.trackArtists.artistId,
		targetTable: schema.artists,
		targetPk: schema.artists.id,
	},
	{
		kind: 'junction',
		loaderKey: 'tracksByArtistId',
		onType: 'ArtistsSelectItem',
		fieldName: 'tracks',
		targetTypeKey: 'TracksSelectItem',
		junctionTable: schema.trackArtists,
		sourceFk: schema.trackArtists.artistId,
		targetFk: schema.trackArtists.trackId,
		targetTable: schema.tracks,
		targetPk: schema.tracks.id,
	},
	{
		kind: 'junction',
		loaderKey: 'tagsByTrackId',
		onType: 'TracksSelectItem',
		fieldName: 'tags',
		targetTypeKey: 'TagsSelectItem',
		junctionTable: schema.trackTags,
		sourceFk: schema.trackTags.trackId,
		targetFk: schema.trackTags.tagId,
		targetTable: schema.tags,
		targetPk: schema.tags.id,
	},
	{
		kind: 'junction',
		loaderKey: 'tagsByCollectionId',
		onType: 'CollectionsSelectItem',
		fieldName: 'tags',
		targetTypeKey: 'TagsSelectItem',
		junctionTable: schema.collectionTags,
		sourceFk: schema.collectionTags.collectionId,
		targetFk: schema.collectionTags.tagId,
		targetTable: schema.tags,
		targetPk: schema.tags.id,
	},
	{
		kind: 'junction',
		loaderKey: 'tagsByArtistId',
		onType: 'ArtistsSelectItem',
		fieldName: 'tags',
		targetTypeKey: 'TagsSelectItem',
		junctionTable: schema.artistTags,
		sourceFk: schema.artistTags.artistId,
		targetFk: schema.artistTags.tagId,
		targetTable: schema.tags,
		targetPk: schema.tags.id,
	},
	{
		kind: 'junction',
		loaderKey: 'tracksByTagId',
		onType: 'TagsSelectItem',
		fieldName: 'tracks',
		targetTypeKey: 'TracksSelectItem',
		junctionTable: schema.trackTags,
		sourceFk: schema.trackTags.tagId,
		targetFk: schema.trackTags.trackId,
		targetTable: schema.tracks,
		targetPk: schema.tracks.id,
	},
	{
		kind: 'junction',
		loaderKey: 'collectionsByTagId',
		onType: 'TagsSelectItem',
		fieldName: 'collections',
		targetTypeKey: 'CollectionsSelectItem',
		junctionTable: schema.collectionTags,
		sourceFk: schema.collectionTags.tagId,
		targetFk: schema.collectionTags.collectionId,
		targetTable: schema.collections,
		targetPk: schema.collections.id,
	},
	{
		kind: 'junction',
		loaderKey: 'artistsByTagId',
		onType: 'TagsSelectItem',
		fieldName: 'artists',
		targetTypeKey: 'ArtistsSelectItem',
		junctionTable: schema.artistTags,
		sourceFk: schema.artistTags.tagId,
		targetFk: schema.artistTags.artistId,
		targetTable: schema.artists,
		targetPk: schema.artists.id,
	},
	{
		kind: 'foreignKey',
		loaderKey: 'tracksByCollectionId',
		onType: 'CollectionsSelectItem',
		fieldName: 'tracks',
		targetTypeKey: 'TracksSelectItem',
		targetTable: schema.tracks,
		foreignKey: schema.tracks.collectionId,
	},
	{
		kind: 'junction',
		loaderKey: 'artistsByUser',
		onType: 'UsersSelectItem',
		fieldName: 'artists',
		targetTypeKey: 'ArtistsSelectItem',
		junctionTable: schema.artistAdmins,
		sourceFk: schema.artistAdmins.userId,
		targetFk: schema.artistAdmins.artistId,
		targetTable: schema.artists,
		targetPk: schema.artists.id
	}
];
