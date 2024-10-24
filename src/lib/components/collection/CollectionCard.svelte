<script lang="ts">
	import { CollectionCover } from '$lib/components';
	import type { Collection } from "$lib/types";

	export let collection: Collection;

	if (!collection) {
		throw new Error()
	}
</script>

<a class="contents" href={`/collection/${collection.slug}`}>
	<CollectionCover collection={collection} />
</a>