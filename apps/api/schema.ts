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

function randomField(table: PgTable, targetType: GraphQLObjectType) {
	return {
		type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(targetType))),
		args: {
			count: { type: GraphQLInt },
		},
		resolve: (_source: unknown, args: { count?: number; }) => {
			const count = Math.max(0, Math.min(args.count ?? DEFAULT_RANDOM_COUNT, MAX_RANDOM_COUNT));
			return db.select().from(table).orderBy(sql`random()`).limit(count);
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
	(currentSchema, { fieldName, table, targetTypeKey }) =>
		appendObjectFields(currentSchema, 'Query', {
			[fieldName]: randomField(table, entityTypes[targetTypeKey]),
		}),
	schemaWithRelations,
);
