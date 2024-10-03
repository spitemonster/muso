<script lang="ts">
	import ArtistTags from './../forms/ArtistTags.svelte';
	import type { Artist, Collection } from '$lib/types'
	export let artist: Artist
	import trackLength from '$lib/utils/trackLength'

</script>
<section id="artist-dashboard">
	<h3>{artist.name}</h3>
	<ArtistTags artist={artist}></ArtistTags>
	{#if artist.collections && artist.collections.length > 0}
		{#each artist.collections as collection }
			<figure>
				<img src={`https://picsum.photos/seed/${ Math.random() * 500 }/400`} height="400" width="400" alt="collection art">
				<figcaption>
					{collection.title}
					<ol>
						{#each collection.tracks as track}
						<li>{track.title} - {track.duration}</li>
						{/each}
					</ol>
					<a href={`/dashboard/collection/${collection.id}`}>Manage Collection</a>
				</figcaption>
			</figure>	
		{/each}
	{/if}
 </section>