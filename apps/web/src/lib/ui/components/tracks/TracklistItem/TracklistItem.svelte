<script lang="ts">
	import { secToMin } from '$lib/helpers/secToMin'
	import type { Track } from '$lib/types'
	import PlayButton from '../../PlayButton/PlayButton.svelte'
	import { player as playerState } from '$lib/state/player.svelte'
	import { tv } from 'tailwind-variants'

	interface Props {
		track: Track
		trackNum: number
	}

	const { track, trackNum }: Props = $props()

	const isCurrent = $derived(playerState.currentTrack?.id === track.id)

	const trackListItemClass = tv({
		base: 'grid grid-cols-[minmax(0,1fr)_min-content] place-items-center p-5 border-b-2 border-accent gap-3',
		variants: {
			active: {
				true: 'bg-accent text-background',
			},
		},
	})
</script>

{#if track}
	<div class={trackListItemClass({ active: isCurrent })}>
		<div class="w-full flex gap-2">
			<span>{trackNum}</span>
			<span> - </span>
			<span class="font-bold inline-block m-0 overflow-hidden whitespace-nowrap text-ellipsis"
				>{track.title}</span
			>
			<span> - </span>
			<span>{secToMin(track.duration ?? 0)}</span>
		</div>
		<PlayButton {track} size="md"></PlayButton>
	</div>
{/if}
