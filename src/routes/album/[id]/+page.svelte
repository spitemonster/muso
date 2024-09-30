<script lang="ts">
	import songLength from '$lib/utils/songLength.js';

	export let data;

	const { album } = data;

	if (!album) {
		throw Error(`Problem displaying album page. No album.`)
	}

	const { artists, songs } = album;

	if (!artists || !songs) {
		throw Error(`Problem displaying album page for ${album.id}. Artists: ${album.artists}. Songs: ${album.songs}`)
	}
</script>

<section class="container">
	<h1>{album.title}</h1>
	<h2>by
		{#each artists as artist}
			<a class="text-blue" href="/artist/{artist?.id}">{artist?.name}</a>
		{/each}
	</h2>
	<ol>
		{#each songs as song}
			<li>
				<a href={`/song/${song.id}`}>{song.title}</a> - {songLength(song.duration)}
			</li>
		{/each}
	</ol>
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