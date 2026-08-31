<script lang="ts">
	import type { Track } from '$lib/types'
	import { player as playerState } from '$lib/state/player.svelte'
	import { tv } from 'tailwind-variants'
	import { IconPause, IconPlay } from '@muso/ui'

	interface Props {
		track: Track
		class?: string
	}

	const { track, class: className }: Props = $props()

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

	const trackCardClasses = tv({
		base: 'track-card p-3 h-full rounded-md leading-tight',
		variants: {
			active: {
				true: 'bg-accent text-background',
				false: 'bg-neutral text-foreground',
			},
		},
	})
</script>

<div class={trackCardClasses({ class: className, active: isCurrent })}>
	<div class="grid grid-cols-[48px_minmax(0,1fr)_min-content] gap-3 items-center">
		<img
			src={track.primaryArtist?.profileImageUrl}
			alt={track.primaryArtist?.name}
			class="w-12 h-12 object-cover rounded-full"
			width="48px"
			height="48px"
		/>
		<div>
			<p class="font-bold mb-3 w-full overflow-hidden text-ellipsis whitespace-nowrap block">
				{track.title}
			</p>
			<p>{track.primaryArtist?.name}</p>
		</div>
		<button
			onclick={playTrack}
			class="cursor-pointer w-12 h-12 flex content-center justify-center items-center"
		>
			{#if isCurrentPlaying}
				<span class="sr-only">Pause</span>
				<IconPause />
			{:else}
				<span class="sr-only">Play</span>
				<IconPlay />
			{/if}
		</button>
	</div>
</div>
