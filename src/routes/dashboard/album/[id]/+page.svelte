<script lang="ts">
	import type { Collection } from "$lib/types";

	export let data;
	const { collection } = data;

</script>

<section class="container">
	

{#if collection }
	<h2>Collection</h2>

	<a href={`/dashboard/artist/${collection?.artistId}`}>Back to Artist</a>
	<figure>
		<img src="/placeholder.co/" alt="">
		<figcaption>
			<h3>{collection.title}</h3>
	<ol>
		{#each collection.tracks as track}
			<li>{track.title} - {track.duration} - <a href={`/dashboard/track/${track.id}`}>Manage Track</a></li>
		{/each}
	</ol>
		</figcaption>
	</figure>
{:else}
	<h2>No collection found</h2>
{/if}
</section>