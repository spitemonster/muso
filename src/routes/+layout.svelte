<script lang="ts">
	import { Header, Footer } from '$lib/components'
	import '$lib/styles/global.css';
	import '@fontsource/ibm-plex-mono';
	import '@fontsource/ibm-plex-sans';
	import { loginSession } from '$lib/stores';
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;

	const { user } = data;

	$loginSession = user
</script>

<Header />

<main>
	<slot></slot>
</main>

<Footer />