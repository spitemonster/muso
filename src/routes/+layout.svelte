<script lang="ts">
	import '$lib/styles/global.css';
	import '@fontsource/ibm-plex-mono';
	import '@fontsource/ibm-plex-sans';

	import type { PageData } from './$types';
	export let data: PageData;

	import PrimaryNavigation from '$lib/components/PrimaryNavigation/PrimaryNavigation.svelte';
	import ControlBar from '$lib/components/control-bar/ControlBar.svelte';
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