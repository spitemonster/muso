<script lang="ts">
export let data;
import { TagGrid, AlbumCardGrid, ArtistCardGrid } from '$lib/components';

const { artists, albums, tags } = data;

if (!artists) {
	throw Error();
}

</script>

<section class="container">
	<h1>Looking for new jams?</h1>
	<h2 class="mb-lg">You've come to the right place.</h2>

	
	{#if tags != null}
		<TagGrid tags={tags}>
			<h3 class="mb-base">Check out some tags</h3>
		</TagGrid>
	{/if}

	{#if artists && artists.length > 0}
		<ArtistCardGrid artists={artists}>
			<h3 class="mt-lg mb-base">Some artists to get you started:</h3>
		</ArtistCardGrid>
	{/if}
	
	{#if albums && albums.length > 0}
		<AlbumCardGrid albums={albums}>
			<h3 class="mt-lg mb-base">Some albums to pique your interest:</h3>
		</AlbumCardGrid>
	{/if}
</section>