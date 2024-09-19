<script lang="ts">
	import type { Album } from '$lib/types';
	import AlbumCard from "./AlbumCard.svelte"

	export let albums: Album[];
</script>

<div class="album-cards">
	<ul>
		{#each albums as album}
			<li>
				<AlbumCard album={album} />
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.album-cards {
		ul {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 1rem;
			list-style: none;
		}
	}
</style>