<script>
	import PrimaryNavigation from '$lib/components/PrimaryNavigation/PrimaryNavigation.svelte';
	import '$lib/styles/global.scss';
	import '@fontsource/ibm-plex-mono';

</script>

<PrimaryNavigation />

<main>
	<slot></slot>
</main>
