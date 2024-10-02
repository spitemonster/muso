<script lang="ts">

	export let data;

	const { tag } = data;

	if (!tag) {
		throw Error();
	}
</script>

<div class="container">
	<h1>Tag: <i>{tag.name}</i></h1>
	{#if tag.artists != null && tag.artists.length > 0}
		<h2>Artists Tagged with <i>{tag.name}</i></h2>
		<ul>
			{#each tag.artists as artist }
				<li><a href="/artist/{artist.id}">{artist.name}</a></li>
			{/each}
		</ul>
	{/if}
	
	{#if tag.albums != null && tag.albums.length > 0}
		<h2>Albums tagged with <i>{tag.name}</i></h2>
		<ul class="list-numeric">
			{#each tag.albums as album }
				<li class="block"><a href="/album/{album.id}">{album.title}</a></li>
			{/each}
		</ul>
	{/if}

	{#if tag.songs != null && tag.songs.length > 0}
		<h2>Songs tagged with <i>{tag.name}</i></h2>
		<ul class="list-numeric">
			{#each tag.songs as song }
				<li class="block">{song.title}</li>
			{/each}
		</ul>
	{/if}
</div>
