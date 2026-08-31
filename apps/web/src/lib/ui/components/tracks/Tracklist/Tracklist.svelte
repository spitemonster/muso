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
		<ol class="list-decimal flex flex-col ps-6">
			{#each tracks as track}
				<li class="pbe-5 mbe-5 border-b-2 border-accent">
					<TracklistItem {track} />
				</li>
			{/each}
		</ol>
	</div>
{/if}
