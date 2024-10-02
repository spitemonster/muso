<script lang="ts">
	import { MusicPlayer as SongPlayer } from '$lib/components';
	export let data;

	const { song } = data;

	if (!song) {
		throw Error();
	}

	const { artists, album } = song

	if (!artists || artists.length < 1) {
		throw Error();
	}

	if (!album) {
		throw Error();
	}
</script>

<div class="container">
	<h1>{song.title}</h1>
	<h2>by
		{#each artists as artist}
			<a href={`/artist/${artist.id}`}>{artist.name}</a>
		{/each}
	</h2>
	<h3>from <a href={`/album/${album.id}`}>{album.title}</a></h3>
	<SongPlayer song={song} />
</div>
