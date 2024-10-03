<script lang="ts">
	import { CollectionCover } from '$lib/components';
	import type { Collection } from "$lib/types";

	export let collection: Collection;
</script>

<a class="contents" href={`/collection/${collection.id}`}>
	<CollectionCover collection={collection} />
</a>