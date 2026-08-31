import DataLoader from 'dataloader'
import { inArray } from 'drizzle-orm'
import type { AnyPgColumn, PgTable } from 'drizzle-orm/pg-core'
import { db } from '@muso/db/db'

type ForeignKeyLoaderConfig = {
	targetTable: PgTable
	targetTableName: keyof typeof db.query
	foreignKey: AnyPgColumn
	// JS property name of `foreignKey` on the relational-query result rows,
	// e.g. 'collectionId' for schema.tracks.collectionId - needed to group
	// rows back by parent id since db.query results key by property name
	// rather than the AnyPgColumn object.
	foreignKeyField: string
	with?: Record<string, true>
}

// sibling of createJunctionLoader - same batched-by-parent-id shape, but for a
// plain one-to-many FK (e.g. tracks.collectionId) instead of a junction table,
// so no join is needed to reach the target rows.
export function createForeignKeyLoader({
	targetTableName,
	foreignKey,
	foreignKeyField,
	with: withRelations,
}: ForeignKeyLoaderConfig) {
	return new DataLoader<string, Record<string, unknown>[]>(async (parentIds) => {
		const queryBase = db.query[targetTableName] as unknown as {
			findMany: (config: { where?: unknown; with?: Record<string, true> }) => Promise<Record<string, unknown>[]>
		}

		const rows = await queryBase.findMany({
			where: inArray(foreignKey, parentIds as string[]),
			with: withRelations,
		})

		const grouped = new Map<string, Record<string, unknown>[]>()
		for (const row of rows) {
			const sourceId = row[foreignKeyField] as string
			const list = grouped.get(sourceId) ?? []
			list.push(row)
			grouped.set(sourceId, list)
		}

		return parentIds.map((id) => grouped.get(id) ?? [])
	})
}
