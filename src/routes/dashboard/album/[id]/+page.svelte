<script lang="ts">
	import type { Album } from "$lib/types";

	export let data;
	const { album } = data;

</script>

<section class="container">
	

{#if album }
	<h2>Album</h2>

	<a href={`/dashboard/artist/${album?.artistId}`}>Back to Artist</a>
	<figure>
		<img src="/placeholder.co/" alt="">
		<figcaption>
			<h3>{album.title}</h3>
	<ol>
		{#each album.songs as song}
			<li>{song.title} - {song.duration} - <a href={`/dashboard/song/${song.id}`}>Manage Song</a></li>
		{/each}
	</ol>
		</figcaption>
	</figure>
{:else}
	<h2>No album found</h2>
{/if}
</section>