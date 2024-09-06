<script lang="ts">
	export let data;

	const { tag, artists } = data;

	if (!tag) {
		throw Error();
	}
</script>

<div class="container">
	<h1>{tag.name}</h1>
	{#if artists != null}
	<h2>Artists Tagged with <i>{tag.name}</i></h2>
	<ul>
		{#each artists as artist }
			<li><a href="/artist/{artist.id}">{artist.name}</a></li>
		{/each}
	</ul>
	{/if}
</div>
