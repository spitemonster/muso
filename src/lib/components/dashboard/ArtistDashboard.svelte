<script lang="ts">
	import ArtistTags from './../forms/ArtistTags.svelte';
	import type { Artist, Album } from '$lib/types'
	export let artist: Artist
	import trackLength from '$lib/utils/trackLength'

</script>
<section id="artist-dashboard">
	<h3>{artist.name}</h3>
	<ArtistTags artist={artist}></ArtistTags>
	{#if artist.albums && artist.albums.length > 0}
		{#each artist.albums as album }
			<figure>
				<img src={`https://picsum.photos/seed/${ Math.random() * 500 }/400`} height="400" width="400" alt="album art">
				<figcaption>
					{album.title}
					<ol>
						{#each album.tracks as track}
						<li>{track.title} - {track.duration}</li>
						{/each}
					</ol>
					<a href={`/dashboard/album/${album.id}`}>Manage Album</a>
				</figcaption>
			</figure>	
		{/each}
	{/if}
 </section>