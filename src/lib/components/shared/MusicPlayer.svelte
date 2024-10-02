<script lang="ts">
	import type {Track} from '$lib/types';
	import { onMount } from 'svelte';

	export let track: Track;

	let playing: boolean = false;
	let audioEl: HTMLAudioElement;
			

	function togglePlay(event: Event) {
		event.preventDefault();

		if (playing) {
			audioEl.pause();
			playing = false;
		} else {
			audioEl.play();
			playing = true;
		}
	}
</script>

<form class="music-player">
	<input type="range" disabled min="0" max={track.duration} value={track.duration / 2}>

	<button on:click={togglePlay}>{ playing ? "Pause" : "Play"}</button>
</form>

<audio bind:this={audioEl} src="https://ia802808.us.archive.org/26/items/ClairDeLunedebussy/2009-03-30-clairdelune.mp3"></audio>