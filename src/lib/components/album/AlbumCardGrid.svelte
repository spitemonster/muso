<script lang="ts">
	import type { Album } from '$lib/types';
	import { AlbumCard } from "$lib/components"

	export let albums: Album[];
	export let className: string = "";
</script>

{#if albums.length > 0}

<div class={`album-card-grid ${className}`}>
	<slot></slot>

	<ul class="grid gap-base grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
		{#each albums as album}
			<li>
				<AlbumCard album={album} />
			</li>
		{/each}
	</ul>
</div>

{/if}