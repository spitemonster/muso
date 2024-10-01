<script lang="ts">
export let data;
import AlbumCards from '$lib/components/album-card/AlbumCards.svelte';
import { TagComponent } from '$lib/components/index.js';

const { artists, albums, tags } = data;

if (!artists) {
	throw Error();
}

</script>

<section class="container">
	<h1>Looking for new jams?</h1>
	<h2 class="mb-lg">You've come to the right place.</h2>

	
	{#if tags != null}
		<h3 class="mb-base">Check out some tags</h3>
		<ul class="flex flex-wrap gap-base">
			{#each tags as tag}
				<li><TagComponent tag={tag} /></li>
			{/each}
		</ul>
	{/if}

	{#if artists && artists.length > 0}
		<h3 class="mt-lg mb-base">Some artists to get you started:</h3>
		<ul>
			{#each artists as artist}
				<li><a href="/artist/{artist.id}">{artist.name}</a></li>
			{/each}
		</ul>
	{/if}
	
	{#if albums && albums.length > 0}
		<h3 class="mt-lg mb-base">Some albums to pique your interest:</h3>
		<AlbumCards albums={albums} />
	{/if}
</section>