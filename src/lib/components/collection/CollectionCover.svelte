<script lang="ts">
	import type { Collection } from "$lib/types";
	
	export let collection: Collection;
</script>

<figure class="collection-card relative block w-full h-auto aspect-square">
	<img class="absolute top-auto left-auto block w-full h-full" src={collection.coverUrl} alt="Collection cover" height="400" width="400" loading="lazy">
	<figcaption class="absolute z-10 bottom-base left-base">
		<strong>{collection.title}</strong>
	</figcaption>
</figure>
