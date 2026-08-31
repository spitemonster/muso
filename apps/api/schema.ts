import {
	GraphQLError,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	type GraphQLObjectType,
	type GraphQLSchema,
} from 'graphql';
import { appendObjectFields } from '@graphql-tools/utils';
import { buildSchema } from 'drizzle-graphql';
import { sql } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';
import { db } from '@muso/db/db';

import type { Loaders } from './loaders';
import { relations } from './loaders/relations';
import { randomFields } from './randomFields';

const DEFAULT_RANDOM_COUNT = 10;
const MAX_RANDOM_COUNT = 50;

const { schema: generatedSchema, entities } = buildSchema(db, { mutations: false });

function junctionField(fieldName: string, targetType: GraphQLObjectType, loaderKey: string) {
	return {
		type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(targetType))),
		args: {
			limit: { type: GraphQLInt },
			offset: { type: GraphQLInt },
		},
		resolve: async (
			source: { id?: string; },
			args: { limit?: number; offset?: number; },
			context: { loaders: Loaders; },
		) => {
			if (source.id === undefined) {
				throw new GraphQLError(
					`\`${fieldName}\` requires \`id\` to be selected on its parent`,
				);
			}

			const results = await context.loaders[loaderKey].load(source.id);
			const offset = args.offset ?? 0;

			return args.limit === undefined ? results.slice(offset) : results.slice(offset, offset + args.limit);
		},
	};
}

function randomField(tableName: keyof typeof db.query, targetType: GraphQLObjectType, withRelations?: Record<string, true>) {
	return {
		type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(targetType))),
		args: {
			count: { type: GraphQLInt },
		},
		resolve: (_source: unknown, args: { count?: number; }) => {
			const count = Math.max(0, Math.min(args.count ?? DEFAULT_RANDOM_COUNT, MAX_RANDOM_COUNT));
			const queryBase = db.query[tableName] as unknown as {
				findMany: (config: { orderBy?: unknown; limit?: number; with?: Record<string, true>; }) => Promise<unknown[]>;
			};
			return queryBase.findMany({
				orderBy: sql`random()`,
				limit: count,
				with: withRelations,
			});
		},
	};
}


const entityTypes = entities.types as Record<string, GraphQLObjectType>;

const schemaWithRelations: GraphQLSchema = relations.reduce(
	(currentSchema, { onType, fieldName, targetTypeKey, loaderKey }) =>
		appendObjectFields(currentSchema, onType, {
			[fieldName]: junctionField(fieldName, entityTypes[targetTypeKey], loaderKey),
		}),
	generatedSchema,
);

export const schema: GraphQLSchema = randomFields.reduce(
	(currentSchema, { fieldName, tableName, targetTypeKey, with: withRelations }) =>
		appendObjectFields(currentSchema, 'Query', {
			[fieldName]: randomField(tableName, entityTypes[targetTypeKey], withRelations),
		}),
	schemaWithRelations,
);