<script lang="ts">
	import type { Track } from '$lib/types'
	import { tv } from 'tailwind-variants'
	import { player as playerState } from '$lib/state/player.svelte'
	import { IconPause, IconPlay } from '@muso/ui'

	interface Props {
		track: Track
		size?: 'sm' | 'md' | 'lg' | 'xl'
	}

	const { track, size = 'sm' }: Props = $props()

	const isCurrent = $derived(playerState.currentTrack?.id === track.id)
	const isCurrentPlaying = $derived(playerState.isPlaying && isCurrent)

	function playTrack() {
		if (isCurrentPlaying) {
			playerState.pause()
			return
		}

		if (isCurrent) {
			playerState.play()
			return
		}

		playerState.playNow(track)
	}

	const playButtonClass = tv({
		base: 'play-button relative cursor-pointer block flex content-center justify-center items-center',
		variants: {
			size: {
				xl: 'h-16 w-16',
				lg: 'h-12 w-12',
				md: 'h-8 w-8',
				sm: 'h-4 w-4',
			},
		},
	})
</script>

<button onclick={playTrack} class={playButtonClass({ size })}>
	{#if isCurrentPlaying}
		<span class="sr-only">Pause</span>
		<IconPause class="absolute h-full w-full" />
	{:else}
		<span class="sr-only">Play</span>
		<IconPlay class="absolute h-full w-full" />
	{/if}
</button>
