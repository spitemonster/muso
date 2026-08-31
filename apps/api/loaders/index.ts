import { createJunctionLoader } from './createJunctionLoader'
import { createForeignKeyLoader } from './createForeignKeyLoader'
import { relations } from './relations'

export function createLoaders() {
	const loaders = {} as Record<
		string,
		ReturnType<typeof createJunctionLoader> | ReturnType<typeof createForeignKeyLoader>
	>

	for (const relation of relations) {
		loaders[relation.loaderKey] =
			relation.kind === 'junction' ? createJunctionLoader(relation) : createForeignKeyLoader(relation)
	}

	return loaders
}

export type Loaders = ReturnType<typeof createLoaders>
