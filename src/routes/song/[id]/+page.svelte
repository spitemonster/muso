<script lang="ts">
	export let data;

	const { song } = data;

	if (!song) {
		throw Error();
	}
</script>

<div class="container">
	<h1>{song.title}</h1>
	<a href={`/album/${song.albumId}`}>Back to Album</a>
</div>
