<script lang="ts">
	import { CollectionCardGrid, ArtistCardGrid } from '$lib/components';

	export let data;

	const { tag } = data;

	if (!tag) {
		throw Error();
	}
</script>

<div class="container">
	<h1>Tag: <i>{tag.name}</i></h1>
	{#await data.artists}
		Loading artists...
	{:then artists} 
		<ArtistCardGrid artists={artists}>
			<h2>Artists Tagged with <i>{tag.name}</i></h2>	
		</ArtistCardGrid>
	{:catch}
		Error loading artists......
	{/await}
	
	{#await data.collections }
		Loading collections.....
	{:then collections} 
		<CollectionCardGrid collections={collections}>
			<h2>Collections tagged with <i>{tag.name}</i></h2>
		</CollectionCardGrid>
	{:catch}
		Error loading collections......
	{/await}
</div>
