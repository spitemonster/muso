<script lang="ts">
	export let data;

	const { album, artist } = data;

	if (!album) {
		throw Error();
	}
</script>

<section class="container">
	<h1>{album.title}</h1>
	<h2>by <a href="/artist/{artist?.id}">{artist?.name}</a></h2>
	<ol>
		{#each album.songs as song}
			<li>
				{song.title}
			</li>
		{/each}
	</ol>
</section>