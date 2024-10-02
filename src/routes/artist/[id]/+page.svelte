<script lang="ts">
	import AlbumCardGrid from '$lib/components/album/AlbumCardGrid.svelte';
	// import Tag from '$lib/components/Tag.svelte'
	import { TagGrid } from '$lib/components';
	export let data;

	const { artist } = data;

	if (!artist) {
		throw Error();
	}
</script>

<div class="container">
	<h1>{artist.name}</h1>
	<div class="max-w-2xl">
		<p>{artist.biography}</p>
	</div>
	{#if artist.albums && artist.albums.length > 0}
		<AlbumCardGrid albums={artist.albums}>
			<h2 class="mt-lg mb-base">Albums by { artist.name }</h2>
		</AlbumCardGrid>
	{/if}

	{#if artist.tags && artist.tags.length > 0}
		<TagGrid tags={artist.tags}>
			<h2 class="mt-lg mb-base">{ artist.name}'s tags</h2>
		</TagGrid>
	{/if}
</div>
