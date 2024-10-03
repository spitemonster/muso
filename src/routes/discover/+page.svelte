<script lang="ts">
	import { TagGrid, CollectionCardGrid, ArtistCardGrid } from '$lib/components';

	export let data
// const { artists, collections, tags } = data;

// if (!artists) {
// 	throw Error();
// }

</script>

<section class="container">
	<h1>Looking for new jams?</h1>
	<h2 class="mb-lg">You've come to the right place.</h2>

	
	{#await data.tags}
		<p>Loading tags</p>
	{:then tags } 
		{#if tags}
			<TagGrid className="mt-lg" tags={tags}>
				<h3 class="mb-base">Check out some tags:</h3>
			</TagGrid>
		{/if}
	{/await}

	{#await data.artists}
		<p>Loading artists</p>
	{:then artists} 
		<ArtistCardGrid className="mt-lg" artists={artists}>
			<h3 class="mb-base">Some artists to get you started:</h3>
		</ArtistCardGrid>
	{/await}
	
	{#await data.collections}
		<p>loading collections</p>
	{:then collections}
		<CollectionCardGrid className="mt-lg" collections={collections}>
			<h3 class="mb-base">Some collections to pique your interest:</h3>
		</CollectionCardGrid>
	{/await}
</section>