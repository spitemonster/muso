<script lang="ts">
	import { MusicPlayer as TrackPlayer } from '$lib/components';
	export let data;

	const { track } = data;

	if (!track) {
		throw Error();
	}

	const { artists, album } = track

	if (!artists || artists.length < 1) {
		throw Error();
	}

	if (!album) {
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
	<h3>from <a href={`/album/${album.id}`}>{album.title}</a></h3>
	<TrackPlayer track={track} />
</div>
