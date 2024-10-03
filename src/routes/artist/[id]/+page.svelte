<script lang="ts">
	import { TagGrid, CollectionCardGrid } from '$lib/components';
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
	{#if artist.collections && artist.collections.length > 0}
		<CollectionCardGrid collections={artist.collections} className="mt-lg">
			<h2 class="mb-base">Collections by { artist.name }</h2>
		</CollectionCardGrid>
	{/if}

	{#if artist.tags && artist.tags.length > 0}
		<TagGrid tags={artist.tags} className="mt-lg"></TagGrid>
	{/if}
</div>
