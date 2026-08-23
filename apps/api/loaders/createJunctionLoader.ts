import DataLoader from 'dataloader'
import { eq, inArray } from 'drizzle-orm'
import type { AnyPgColumn, PgTable } from 'drizzle-orm/pg-core'
import { db } from '@muso/db/db'

type JunctionLoaderConfig = {
	junctionTable: PgTable
	sourceFk: AnyPgColumn
	targetFk: AnyPgColumn
	targetTable: PgTable
	targetPk: AnyPgColumn
}

export function createJunctionLoader({
	junctionTable,
	sourceFk,
	targetFk,
	targetTable,
	targetPk,
}: JunctionLoaderConfig) {
	return new DataLoader<string, Record<string, unknown>[]>(async (sourceIds) => {
		const rows = await db
			.select({ sourceId: sourceFk, target: targetTable })
			.from(junctionTable)
			.innerJoin(targetTable, eq(targetFk, targetPk))
			.where(inArray(sourceFk, sourceIds as string[]))

		const grouped = new Map<string, Record<string, unknown>[]>()
		for (const row of rows as { sourceId: string; target: Record<string, unknown> }[]) {
			const list = grouped.get(row.sourceId) ?? []
			list.push(row.target)
			grouped.set(row.sourceId, list)
		}

		return sourceIds.map((id) => grouped.get(id) ?? [])
	})
}
