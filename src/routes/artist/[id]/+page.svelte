<script lang="ts">
	export let data;

	const { artist } = data;

	if (!artist) {
		throw Error();
	}
</script>

<div class="container">
	<h1>{artist.name}</h1>
	
	{#if artist.albums && artist.albums.length > 0}
	<h2>Albums</h2>
		<ul>
			{#each artist.albums as album}
				<li><a href="/album/{album.id}">{album.title}</a></li>
			{/each}
		</ul>
	{/if}

	{#if artist.tags && artist.tags.length > 0}
	<h2>Tags</h2>
		<ul>
			{#each artist.tags as tag}
				<li><a href="/tag/{tag.id}">{tag.name}</a></li>
			{/each}
		</ul>
	{/if}
</div>
