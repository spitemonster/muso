import {
	GraphQLError,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	type GraphQLSchema,
} from 'graphql'
import { appendObjectFields } from '@graphql-tools/utils'
import { buildSchema } from 'drizzle-graphql'
import { db } from '@muso/db/db'

import type { Loaders } from './loaders'

const { schema: generatedSchema, entities } = buildSchema(db, { mutations: false })

function junctionField(fieldName: string, targetType: GraphQLObjectType, loaderKey: keyof Loaders) {
	return {
		type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(targetType))),
		resolve: (source: { id?: string }, _args: unknown, context: { loaders: Loaders }) => {
			if (source.id === undefined) {
				throw new GraphQLError(
					`\`${fieldName}\` requires \`id\` to be selected on its parent`,
				)
			}
			return context.loaders[loaderKey].load(source.id)
		},
	}
}

// one entry per flattened relation direction: [type to graft onto, field name, related type, loader to use]
const junctionRelations: [string, string, GraphQLObjectType, keyof Loaders][] = [
	['CollectionsSelectItem', 'tracks', entities.types.TracksSelectItem, 'tracksByCollectionId'],
	['CollectionsSelectItem', 'tags', entities.types.TagsSelectItem, 'tagsByCollectionId'],
	[
		'TracksSelectItem',
		'collections',
		entities.types.CollectionsSelectItem,
		'collectionsByTrackId',
	],
	['TracksSelectItem', 'artists', entities.types.ArtistsSelectItem, 'artistsByTrackId'],
	['TracksSelectItem', 'tags', entities.types.TagsSelectItem, 'tagsByTrackId'],
	['ArtistsSelectItem', 'tracks', entities.types.TracksSelectItem, 'tracksByArtistId'],
	['ArtistsSelectItem', 'tags', entities.types.TagsSelectItem, 'tagsByArtistId'],
]

export const schema: GraphQLSchema = junctionRelations.reduce(
	(currentSchema, [typeName, fieldName, targetType, loaderKey]) =>
		appendObjectFields(currentSchema, typeName, {
			[fieldName]: junctionField(fieldName, targetType, loaderKey),
		}),
	generatedSchema,
)
