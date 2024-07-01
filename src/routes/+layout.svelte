<script lang="ts">
	import '../app.pcss';
	import PrimaryNavigation from '$lib/components/PrimaryNavigation/PrimaryNavigation.svelte';
	import '$lib/styles/global.css';
	import '@fontsource/ibm-plex-mono';
	import '@fontsource/ibm-plex-sans';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header>
	<PrimaryNavigation user={data?.user}></PrimaryNavigation>
</header>

<main>
	<slot></slot>
</main>

<footer>
	<section class="container">
		©2024 Muso
	</section>
</footer>