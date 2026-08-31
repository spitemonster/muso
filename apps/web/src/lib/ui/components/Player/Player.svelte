<script lang="ts">
	import { player, player as playerState } from '$lib/state/player.svelte'
	import { secToMin } from '$lib/helpers/secToMin'
	import { IconPlay, IconPause, IconNext } from '@muso/ui'

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
</script>

<div class="fixed bottom-12 right-12 bg-neutral p-3 w-96">
	<div class="my-3 text-center">
		<p>{playerState.currentTrack?.title ?? '-'}</p>
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
