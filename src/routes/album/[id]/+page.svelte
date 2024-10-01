<script lang="ts">
	import { MusicPlayer, AlbumCover, SongList } from '$lib/components/';

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
	<div class="grid grid-cols-1 md:grid-cols-2">
		<div class="order-2 md:order-1">
			<h1>{album.title}</h1>
			<h2>by
				{#each artists as artist}
					<a class="text-blue" href="/artist/{artist?.id}">{artist?.name}</a>
				{/each}
			</h2>
			<MusicPlayer song={songs[0]} />
			<SongList songs={songs} />
		</div>
		<div class="order-1 md:order-2">
			<AlbumCover album={album} />
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