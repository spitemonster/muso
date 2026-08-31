<script lang="ts">
	import { secToMin } from '$lib/helpers/secToMin'
	import type { Track } from '$lib/types'
	import PlayButton from '../../PlayButton/PlayButton.svelte'

	interface Props {
		track: Track
	}

	const { track }: Props = $props()
</script>

{#if track}
	<div class="grid grid-cols-[1fr_min-content] place-items-center">
		<div class="w-full whitespace-nowrap">
			<span class="font-bold overflow-hidden text-ellipsis">{track.title}</span>
			<span> - </span>
			<span>{secToMin(track.duration ?? 0)}</span>
		</div>
		<PlayButton {track} size="md"></PlayButton>
	</div>
{/if}
