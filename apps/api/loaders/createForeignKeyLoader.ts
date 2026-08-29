import DataLoader from 'dataloader'
import { inArray } from 'drizzle-orm'
import type { AnyPgColumn, PgTable } from 'drizzle-orm/pg-core'
import { db } from '@muso/db/db'

type ForeignKeyLoaderConfig = {
	targetTable: PgTable
	foreignKey: AnyPgColumn
}

// sibling of createJunctionLoader - same batched-by-parent-id shape, but for a
// plain one-to-many FK (e.g. tracks.collectionId) instead of a junction table,
// so no join is needed to reach the target rows.
export function createForeignKeyLoader({ targetTable, foreignKey }: ForeignKeyLoaderConfig) {
	return new DataLoader<string, Record<string, unknown>[]>(async (parentIds) => {
		const rows = await db
			.select({ sourceId: foreignKey, target: targetTable })
			.from(targetTable)
			.where(inArray(foreignKey, parentIds as string[]))

		const grouped = new Map<string, Record<string, unknown>[]>()
		for (const row of rows as { sourceId: string; target: Record<string, unknown> }[]) {
			const list = grouped.get(row.sourceId) ?? []
			list.push(row.target)
			grouped.set(row.sourceId, list)
		}

		return parentIds.map((id) => grouped.get(id) ?? [])
	})
}
