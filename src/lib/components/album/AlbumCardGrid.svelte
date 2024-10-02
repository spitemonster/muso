<script lang="ts">
	import type { Album } from '$lib/types';
	import AlbumCard from "./AlbumCard.svelte"

	export let albums: Album[];
</script>

<slot></slot>

<ul class="grid gap-base grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
	{#each albums as album}
		<li>
			<AlbumCard album={album} />
		</li>
	{/each}
</ul>