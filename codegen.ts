import type { CodegenConfig } from '@graphql-codegen/cli';

const schema = 'http://localhost:8888/graphql';

const config: CodegenConfig = {
	schema,
	generates: {
		'apps/web/src/lib/gql/': {
			documents: ['apps/web/src/**/*.ts'],
			preset: 'client',
		},
		'apps/admin/src/lib/gql/': {
			documents: ['apps/admin/src/**/*.ts'],
			preset: 'client',
		},
	},
};

export default config;
