<script lang="ts">
	import { MusicPlayer as TrackPlayer } from '$lib/components';
	export let data;

	const { track } = data;

	if (!track) {
		throw Error();
	}

	const { artists, collection } = track

	if (!artists || artists.length < 1) {
		throw Error();
	}

	if (!collection) {
		throw Error();
	}
</script>

<div class="container">
	<h1>{track.title}</h1>
	<h2>by
		{#each artists as artist}
			<a href={`/artist/${artist.id}`}>{artist.name}</a>
		{/each}
	</h2>
	<h3>from <a href={`/collection/${collection.id}`}>{collection.title}</a></h3>
	<TrackPlayer track={track} />
</div>
