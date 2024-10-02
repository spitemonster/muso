<script lang="ts">
	import type {Song} from '$lib/types';	
	import songLength from '$lib/utils/songLength.js';

	export let songs: Song[];
</script>

<ol>
	{#each songs as song}
	<li>
		<a href={`/song/${song.id}`}>{song.title}</a> - {songLength(song.duration)}
	</li>
	{/each}
</ol>