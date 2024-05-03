<script lang="ts">
	import type { Song } from "$lib/types";

	export let data;
	const { song } = data;

</script>

<section class="container">
	

{#if song }
	<h2>{song.title}</h2>
	<p><a href={`/dashboard/album/${song.albumId}`}>Back to Album</a></p>
	<p>{song.duration}</p>
{:else}
	<h2>No song found</h2>
{/if}
</section>