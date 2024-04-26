<script lang="ts">
	import PrimaryNavigation from '$lib/components/PrimaryNavigation/PrimaryNavigation.svelte';
	import '$lib/styles/global.scss';
	import '@fontsource/ibm-plex-mono';

	import type { PageData } from './$types'
	
	export let data: PageData;
	
</script>

<PrimaryNavigation user={data?.user} />

<main>
	<slot></slot>
</main>
