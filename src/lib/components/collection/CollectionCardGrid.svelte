<script lang="ts">
	import type { Collection } from '$lib/types';
	import { CollectionCard } from "$lib/components"

	export let collections: Collection[];
	export let className: string = "";
</script>

{#if collections.length > 0}

<div class={`collection-card-grid ${className}`}>
	<slot></slot>

	<ul class="grid gap-base grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
		{#each collections as collection}
			<li>
				<CollectionCard collection={collection} />
			</li>
		{/each}
	</ul>
</div>

{/if}