import DataLoader from 'dataloader'
import { inArray } from 'drizzle-orm'
import type { AnyPgColumn, PgTable } from 'drizzle-orm/pg-core'
import { db } from '@muso/db/db'

type JunctionLoaderConfig = {
	junctionTable: PgTable
	sourceFk: AnyPgColumn
	targetFk: AnyPgColumn
	targetPk: AnyPgColumn
	targetTableName: keyof typeof db.query
	with?: Record<string, true>
}

export function createJunctionLoader({
	junctionTable,
	sourceFk,
	targetFk,
	targetPk,
	targetTableName,
	with: withRelations,
}: JunctionLoaderConfig) {
	return new DataLoader<string, Record<string, unknown>[]>(async (sourceIds) => {
		const pairs = await db
			.select({ sourceId: sourceFk, targetId: targetFk })
			.from(junctionTable)
			.where(inArray(sourceFk, sourceIds as string[]))

		const targetIds = [...new Set(pairs.map((pair) => pair.targetId as string))]

		const queryBase = db.query[targetTableName] as unknown as {
			findMany: (config: { where?: unknown; with?: Record<string, true> }) => Promise<Record<string, unknown>[]>
		}

		const targetRows = targetIds.length
			? await queryBase.findMany({ where: inArray(targetPk, targetIds), with: withRelations })
			: []

		const targetById = new Map(targetRows.map((row) => [row.id as string, row]))

		const grouped = new Map<string, Record<string, unknown>[]>()
		for (const { sourceId, targetId } of pairs as { sourceId: string; targetId: string }[]) {
			const target = targetById.get(targetId)
			if (!target) continue

			const list = grouped.get(sourceId) ?? []
			list.push(target)
			grouped.set(sourceId, list)
		}

		return sourceIds.map((id) => grouped.get(id) ?? [])
	})
}
