<script lang="ts">
	import type { Track } from '$lib/types'
	import TrackCard from '../TrackCard/TrackCard.svelte'

	interface Props {
		tracks: Track[]
	}

	const { tracks }: Props = $props()
</script>

<div class="track-card-list">
	<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
		{#each tracks as track}
			<li>
				<TrackCard {track} />
			</li>
		{/each}
	</ul>
</div>
