import type { AnyPgColumn, PgTable } from 'drizzle-orm/pg-core';
import type { db } from '@muso/db/db';
import * as schema from '@muso/db/schema';

type QueryTableName = keyof typeof db.query;

type BaseRelation = {
	loaderKey: string;
	onType: string;
	fieldName: string;
	targetTypeKey: string;
	targetTableName: QueryTableName;
	with?: Record<string, true>;
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
	targetPk: AnyPgColumn;
	foreignKey: AnyPgColumn;
	foreignKeyField: string;
};

export type RelationConfig = JunctionRelation | ForeignKeyRelation;

// one-relations to eager-load per target table so that fields like
// TracksSelectItem.primaryArtist resolve correctly when a track/collection
// is reached through one of these loaders instead of drizzle-graphql's own
// generated query resolvers (see randomFields.ts for the same requirement).
const tracksWith = { primaryArtist: true, collection: true } as const;
const collectionsWith = { primaryArtist: true } as const;

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
		targetTableName: 'artists',
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
		targetTableName: 'collections',
		with: collectionsWith,
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
		targetTableName: 'artists',
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
		targetTableName: 'tracks',
		with: tracksWith,
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
		targetTableName: 'tags',
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
		targetTableName: 'tags',
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
		targetTableName: 'tags',
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
		targetTableName: 'tracks',
		with: tracksWith,
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
		targetTableName: 'collections',
		with: collectionsWith,
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
		targetTableName: 'artists',
	},
	{
		kind: 'foreignKey',
		loaderKey: 'tracksByCollectionId',
		onType: 'CollectionsSelectItem',
		fieldName: 'tracks',
		targetTypeKey: 'TracksSelectItem',
		targetTable: schema.tracks,
		targetPk: schema.tracks.id,
		targetTableName: 'tracks',
		foreignKey: schema.tracks.collectionId,
		foreignKeyField: 'collectionId',
		with: tracksWith,
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
		targetPk: schema.artists.id,
		targetTableName: 'artists',
	},
];
