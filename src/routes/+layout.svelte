<script lang="ts">
	import '$lib/styles/global.css';
	import '@fontsource/ibm-plex-mono';
	import '@fontsource/ibm-plex-sans';
	import { loginSession } from '$lib/stores';

	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;

	const { user } = data;

	console.log(user)

	$loginSession = user


	import PrimaryNavigation from '$lib/components/PrimaryNavigation/PrimaryNavigation.svelte';
	// import ControlBar from '$lib/components/control-bar/ControlBar.svelte';
</script>

<header>
	<PrimaryNavigation user={$loginSession}></PrimaryNavigation>
</header>

<main>
	<slot></slot>
</main>

<footer>
	<!-- <ControlBar /> -->
	<section class="container">
		©2024 Muso
	</section>
</footer>