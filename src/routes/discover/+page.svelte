<script lang="ts">

export let data;

import type { Tag } from '$lib/types'

const { artists, albums, tags } = data;

if (!artists) {
	throw Error();
}
</script>

<section class="container">
	<h1>Looking for new jams?</h1>
	<h2>You've come to the right place.</h2>

	
	{#if tags != null}
	<h3>Check out some tags</h3>
	<ul>
		{#each tags as tag}
			<li><a href="/tag/{tag.id}">{tag.name}</a></li>
		{/each}
	</ul>
	{/if}

	<h3>Some artists to get you started:</h3>
	<ul>
		{#each artists as artist}
			<li><a href="/artist/{artist.id}">{artist.name}</a></li>
		{/each}
	</ul>
	

	<h3>Some albums to pique your interest:</h3>
	<ul>
		{#each albums as album}
			<li><a href="/album/{album.id}">{album.title}</a></li>
		{/each}
	</ul>
</section>