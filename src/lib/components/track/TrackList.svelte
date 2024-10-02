<script lang="ts">
	import type {Track} from '$lib/types';	
	import trackLength from '$lib/utils/trackLength.js';

	export let tracks: Track[];
</script>

<ol>
	{#each tracks as track}
	<li>
		<a href={`/track/${track.id}`}>{track.title}</a> - {trackLength(track.duration)}
	</li>
	{/each}
</ol>