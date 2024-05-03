<script lang="ts">
	import '../app.pcss';
	import PrimaryNavigation from '$lib/components/PrimaryNavigation/PrimaryNavigation.svelte';
	import '$lib/styles/global.css';
	import '@fontsource/ibm-plex-mono';

	import type { PageData } from './$types';

	export let data: PageData;
</script>
<PrimaryNavigation user={data?.user}></PrimaryNavigation>

<main>
	<slot></slot>
</main>
