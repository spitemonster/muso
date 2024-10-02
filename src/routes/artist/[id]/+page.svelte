<script lang="ts">
	import AlbumGrid from '$lib/components/album-card/AlbumGrid.svelte';
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
	
	{#if artist.albums && artist.albums.length > 0}
		<h2>Albums by { artist.name }</h2>
		<AlbumGrid albums={artist.albums} />
	{/if}

	{#if artist.tags && artist.tags.length > 0}
		<TagGrid tags={artist.tags}>
			<h2>{ artist.name}'s tags</h2>
		</TagGrid>
	{/if}
</div>
