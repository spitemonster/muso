<script lang="ts">
	import { TagGrid, AlbumCardGrid } from '$lib/components';
	export let data;

	const { artist } = data;

	if (!artist) {
		throw Error();
	}
</script>

<div class="container">
	<figure class="flex gap-base items-center">
		{#if artist.profileImageUrl }
			<img class="h-5xl rounded-full" src={artist.profileImageUrl} alt={artist.name}>
		{/if}
		<figcaption>
			<h1>{artist.name}</h1>
			{#if artist.biography}
				<div class="max-w-2xl">
					<p>{artist.biography}</p>
				</div>
			{/if}
		</figcaption>
	</figure>
	{#if artist.albums && artist.albums.length > 0}
		<AlbumCardGrid albums={artist.albums} className="mt-lg">
			<h2 class="mb-base">Albums by { artist.name }</h2>
		</AlbumCardGrid>
	{/if}

	{#if artist.tags && artist.tags.length > 0}
		<TagGrid tags={artist.tags} className="mt-lg"></TagGrid>
	{/if}
</div>
