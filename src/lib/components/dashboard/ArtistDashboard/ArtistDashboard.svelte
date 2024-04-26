<script lang="ts">
	import type { Artist, Album } from '$lib/types'
	export let artists: Artist[]
	console.log(artists);
</script>
<section id="artist-dashboard" class="dashboard">
	<h2>Artist Dashboard</h2>
	{#each artists as artist}
		<h2>{artist.name}</h2>

		{#each artist.albums as album}
			<div>
				<h3>{album.title}</h3>
			</div>
		{/each}

	{/each}
</section>