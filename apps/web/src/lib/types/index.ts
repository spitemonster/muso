// Domain types now live in @muso/ui so they can be shared with admin.
// Re-exported here so existing `$lib/types` imports keep working.
export type {
	RecordBase,
	Release,
	Track,
	Collection,
	Entity,
	Artist,
	Tag,
	ColumnCount,
} from '@muso/ui';
