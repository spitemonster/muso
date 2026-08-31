<script lang="ts">
	import type { Track } from '$lib/types'
	import TracklistItem from '../TracklistItem/TracklistItem.svelte'

	interface Props {
		tracks: Track[]
	}

	const { tracks }: Props = $props()
</script>

{#if tracks}
	<div class="tracklist">
		<ol class="flex flex-col">
			{#each tracks as track, index}
				<li>
					<TracklistItem {track} trackNum={index + 1} />
				</li>
			{/each}
		</ol>
	</div>
{/if}
