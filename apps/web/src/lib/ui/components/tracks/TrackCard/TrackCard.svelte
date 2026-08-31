<script lang="ts">
	import type { Track } from '$lib/types'
	import { tv } from 'tailwind-variants'
	import { player as playerState } from '$lib/state/player.svelte'
	import PlayButton from '../../PlayButton/PlayButton.svelte'

	interface Props {
		track: Track
		class?: string
	}

	const { track, class: className }: Props = $props()

	const isCurrent = $derived(playerState.currentTrack?.id === track.id)

	const trackCardClasses = tv({
		variants: {
			active: {
				true: {
					default: 'bg-accent text-background',
					artistLink: 'text-background focus:text-foreground hover:text-foreground',
				},
				false: {
					default: 'bg-neutral text-foreground',
					artistLink: 'text-accent focus:text-foreground hover:text-foreground',
				},
			},
		},
		slots: {
			default: 'track-card p-3 h-full rounded-md leading-tight',
			artistLink: 'italic',
		},
	})

	const { default: defaultClass, artistLink } = $derived(trackCardClasses({ class: className }))
</script>

<div class={defaultClass({ active: isCurrent })}>
	<div class="grid grid-cols-[48px_minmax(0,1fr)_min-content] gap-3 items-center">
		{#if track.primaryArtist?.profileImageUrl}
			<img
				src={track.primaryArtist?.profileImageUrl}
				alt={track.primaryArtist?.name}
				class="w-12 h-12 object-cover rounded-full bg-slate-gray"
				width="48px"
				height="48px"
			/>
		{:else}
			<div
				class="w-12 h-12 rounded-full bg-slate-gray"
				role="img"
				aria-label={track.primaryArtist?.name}
			></div>
		{/if}
		<div>
			<p class="font-bold mb-2 w-full overflow-hidden text-ellipsis whitespace-nowrap block">
				{track.title}
			</p>
			<p>
				by <a
					class={artistLink({ active: isCurrent })}
					href={`/artists/${track.primaryArtist?.slug}`}>{track.primaryArtist?.name}</a
				>
			</p>
		</div>
		<PlayButton {track} />
	</div>
</div>
