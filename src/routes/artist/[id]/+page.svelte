<script lang="ts">
	export let data;

	const { artist, artistTags } = data;

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

	{#if artistTags && artistTags.length > 0}
	<h2>Tags</h2>
		<ul>
			{#each artistTags as tag}
				<li><a href="/tag/{tag.id}">{tag.name}</a></li>
			{/each}
		</ul>
	{/if}
</div>
