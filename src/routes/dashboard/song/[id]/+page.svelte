<script lang="ts">
	import type { Track } from "$lib/types";

	export let data;
	const { track } = data;

</script>

<section class="container">
	

{#if track }
	<h2>{track.title}</h2>
	<p><a href={`/dashboard/collection/${track.collectionId}`}>Back to Collection</a></p>
	<p>{track.duration}</p>
{:else}
	<h2>No track found</h2>
{/if}
</section>