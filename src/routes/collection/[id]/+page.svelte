<script lang="ts">
	import { MusicPlayer, CollectionCover, TrackList, TagGrid } from '$lib/components/';

	export let data;

	const { collection } = data;

	if (!collection) {
		throw Error(`Problem displaying collection page. No collection.`)
	}

	const { artists, tracks, tags } = collection;

	if (!artists || !tracks) {
		throw Error(`Problem displaying collection page for ${collection.id}. Artists: ${collection.artists}. Tracks: ${collection.tracks}`)
	}
</script>

<section class="container">
	<div class="grid grid-cols-1 md:grid-cols-2">
		<div class="order-2 md:order-1">
			<h1>{collection.title}</h1>
			<h2>by
				{#each artists as artist}
					<a class="text-blue" href="/artist/{artist?.id}">{artist?.name}</a>
				{/each}
			</h2>
			<MusicPlayer track={tracks[0]} />
			<TrackList tracks={tracks} />
			{#if collection.tags != null && collection.tags.length > 0}
				<TagGrid tags={collection.tags} className="mt-lg" />
			{/if}
		</div>
		<div class="order-1 md:order-2">
			<CollectionCover collection={collection} />
		</div>
	</div>
</section>

<style>
	h2 a:not(:only-child):not(:last-child)::after {
		content: ",";
		display: inline-block;
		position: relative;
		font: inherit;
		margin-right: .5ch;
		color: var(--color-white);
	}
</style>