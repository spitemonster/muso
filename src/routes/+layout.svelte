<script lang="ts">
	import PrimaryNavigation from '$lib/components/PrimaryNavigation/PrimaryNavigation.svelte';
	import ControlBar from '$lib/components/control-bar/ControlBar.svelte';
	import '$lib/styles/global.css';
	import '@fontsource/ibm-plex-mono';
	import '@fontsource/ibm-plex-sans';

	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	
	// beforeMount(() => {
	// 	let visMode: string = sessionStorage.getItem('vis-mode') ?? "";

	// 	if (visMode != "") {
	// 		document.body.classList.add(visMode);
	// 	} else {
	// 		document.body.classList.add('light');
	// 		sessionStorage.setItem('vis-mode', 'light');
	// 	}
	// });
</script>

<header>
	<PrimaryNavigation user={data?.user}></PrimaryNavigation>
</header>

<main>
	<slot></slot>
</main>

<footer>
	<ControlBar />
	<section class="container">
		©2024 Muso
	</section>
</footer>