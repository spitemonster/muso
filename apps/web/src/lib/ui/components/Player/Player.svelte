<script lang="ts">
	import { player, player as playerState } from '$lib/state/player.svelte'
	import { secToMin } from '$lib/helpers/secToMin'
	import { IconPlay, IconPause, IconNext } from '@muso/ui'
	import { tv } from 'tailwind-variants'

	let audioPlayer: HTMLAudioElement
	let loadedTrackId: string | undefined

	$effect(() => {
		if (playerState.isPlaying) {
			audioPlayer?.play()
		} else {
			audioPlayer?.pause()
		}
	})

	$effect(() => {
		const track = playerState.currentTrack
		if (!track || !audioPlayer) return

		if (track.id === loadedTrackId) return // only reload on an actual track change
		loadedTrackId = track.id

		audioPlayer.load()
		if (playerState.isPlaying) audioPlayer.play()
	})

	function onDurationChange() {
		playerState.duration = audioPlayer.duration
	}

	function onTimeUpdate() {
		playerState.currentTime = audioPlayer.currentTime
	}

	function play() {
		if (playerState.isPlaying) {
			playerState.pause()
		} else {
			playerState.play()
		}
	}

	const playerClass = tv({
		base: 'fixed bottom-12 right-12 bg-neutral p-3 w-96 drop-shadow-sm transition-all',
		variants: {
			active: {
				true: 'right-12',
				false: '-right-full',
			},
		},
	})
</script>

<div
	class={playerClass({ active: !!playerState.currentTrack })}
	role="region"
	aria-label="Player"
	inert={!playerState.currentTrack}
>
	<div class="sr-only" aria-live="polite" aria-atomic="true">
		{#if playerState.currentTrack}
			Now playing: {playerState.currentTrack.title}
			{#if playerState.currentTrack.artists && playerState.currentTrack.artists.length > 1}
				by {playerState.currentTrack.artists.map((artist) => artist.name).join(', ')}
			{:else if playerState.currentTrack.primaryArtist}
				by {playerState.currentTrack.primaryArtist.name}
			{/if}
		{/if}
	</div>
	<div class="my-3 text-center">
		{#if !playerState.currentTrack}
			<p>-</p>
		{:else}
			<p class="mb-3">{playerState.currentTrack.title}</p>
			{#if playerState.currentTrack?.artists && playerState.currentTrack?.artists.length > 1}
				<p class="mb-5">
					by
					{#each playerState.currentTrack?.artists as artist, index}
						<a class="text-accent" href={`/artists/${artist.slug}`}>
							{artist.name}
						</a>
						{#if index === playerState.currentTrack?.artists.length - 1}
							,
						{/if}
					{/each}
				</p>
			{:else if playerState.currentTrack.primaryArtist}
				<p class="mb-5">
					by
					<a
						class="text-accent"
						href={`/artists/${playerState.currentTrack.primaryArtist.slug}`}
						>{playerState.currentTrack.primaryArtist.name}</a
					>
				</p>
			{/if}
		{/if}
	</div>
	<div class="grid grid-cols-7 place-content-center-safe">
		<div class="col-span-3">
			<!-- spacer, more buttons to come -->
		</div>
		<button class="cursor-pointer col-span-1 flex items-center justify-center" onclick={play}>
			{#if playerState.isPlaying}
				<span class="sr-only">Pause</span>
				<IconPause />
			{:else}
				<span class="sr-only">Play</span>
				<IconPlay />
			{/if}
		</button>
		<button class="cursor-pointer col-span-1 flex items-center justify-center">
			<span class="sr-only">Skip to next track in queue.</span>
			<IconNext />
		</button>
		<div class="col-span-2">
			<div class="whitespace-nowrap overflow-hidden text-ellipsis">
				<span>Next Up: </span>
				<span>
					{#if !playerState.queue || playerState.queue.length === 0}
						-
					{:else}
						{playerState.queue[0].title}
					{/if}
				</span>
			</div>
		</div>
	</div>
	<div class="w-full flex items-center gap-3">
		<input
			class="w-full"
			type="range"
			min="0"
			max={playerState.duration}
			value={playerState.currentTime}
			aria-label="Seek"
			aria-valuetext={`${secToMin(playerState.currentTime)} of ${secToMin(playerState.duration)}`}
		/>
		<div class="flex items-center text-sm">
			<span>
				{secToMin(player.currentTime ?? 0)}
			</span>
			<span>/</span>
			<span>
				{secToMin(player.duration ?? 0)}
			</span>
		</div>
	</div>

	<p></p>

	<div class="w-full">
		<audio
			bind:this={audioPlayer}
			src={playerState.currentTrack?.trackUrl}
			ondurationchange={onDurationChange}
			ontimeupdate={onTimeUpdate}
		></audio>
	</div>
</div>
